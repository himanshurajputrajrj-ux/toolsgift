import { fail, isSameOrigin, ok, readJsonBody, readUserAgent } from "@/app/lib/auth/api";
import { hashPassword, verifyPassword } from "@/app/lib/auth/crypto";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import {
  createSessionCookie,
  destroyAllUserSessions,
  readSession,
} from "@/app/lib/auth/session";
import { updateUser } from "@/app/lib/auth/store";
import { validatePassword } from "@/app/lib/auth/validate";

type ChangePasswordBody = {
  currentPassword?: unknown;
  newPassword?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const current = await readSession();

  if (!current) {
    return fail("not_authenticated");
  }

  const body = await readJsonBody<ChangePasswordBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  if (
    !consumeRateLimit(
      rateLimitKey(request, "change-password"),
      10,
      15 * 60 * 1000
    )
  ) {
    return fail("rate_limited");
  }

  const newPassword = validatePassword(body.newPassword);
  if (!newPassword.ok) {
    return fail(newPassword.error, { field: "password" });
  }

  const currentPassword =
    typeof body.currentPassword === "string" ? body.currentPassword : "";

  if (current.user.passwordHash) {
    const valid = await verifyPassword(
      currentPassword,
      current.user.passwordHash
    );

    if (!valid) {
      return fail("wrong_password", { field: "password" });
    }
  } else if (currentPassword) {
    // Google-only account: there is no password to match against.
    return fail("wrong_password", { field: "password" });
  }

  const user = current.user;
  user.passwordHash = await hashPassword(newPassword.value);
  user.updatedAt = new Date().toISOString();
  await updateUser(user);

  // Rotate sessions: revoke everything, then sign this device back in.
  await destroyAllUserSessions(user.id);
  await createSessionCookie(user, { userAgent: readUserAgent(request) });

  return ok({});
}
