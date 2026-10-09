import { fail, isSameOrigin, ok, readJsonBody } from "@/app/lib/auth/api";
import { hashPassword } from "@/app/lib/auth/crypto";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import {
  deleteReset,
  deleteUserSessions,
  getReset,
  getUserById,
  updateUser,
} from "@/app/lib/auth/store";
import { validatePassword } from "@/app/lib/auth/validate";

type ResetBody = {
  token?: unknown;
  password?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const body = await readJsonBody<ResetBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  if (
    !consumeRateLimit(rateLimitKey(request, "reset-ip"), 10, 60 * 60 * 1000)
  ) {
    return fail("rate_limited");
  }

  const password = validatePassword(body.password);
  if (!password.ok) {
    return fail(password.error, { field: "password" });
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";

  if (!token || token.length > 200) {
    return fail("invalid_token");
  }

  const record = await getReset(token);

  if (!record || record.expiresAt <= new Date().toISOString()) {
    return fail("invalid_token");
  }

  const user = await getUserById(record.userId);

  if (!user) {
    await deleteReset(token);
    return fail("invalid_token");
  }

  user.passwordHash = await hashPassword(password.value);
  user.updatedAt = new Date().toISOString();
  await updateUser(user);

  await deleteReset(token);
  // A password change invalidates every existing session.
  await deleteUserSessions(user.id);

  return ok({ reset: true });
}
