import { fail, isSameOrigin, ok, readJsonBody, readUserAgent } from "@/app/lib/auth/api";
import { hashPassword, verifyPassword } from "@/app/lib/auth/crypto";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import { createSessionCookie, toPublicUser } from "@/app/lib/auth/session";
import { getUserByEmail, updateUser } from "@/app/lib/auth/store";
import { validateEmail, validatePassword } from "@/app/lib/auth/validate";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

let dummyHash: Promise<string> | null = null;

/**
 * Verifying against a throwaway hash when the account does not exist keeps
 * the response time of "unknown email" and "wrong password" comparable.
 */
function getDummyHash(): Promise<string> {
  if (!dummyHash) {
    dummyHash = hashPassword(`no-user-${Math.random()}`);
  }
  return dummyHash;
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const body = await readJsonBody<LoginBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  const email = validateEmail(body.email);
  if (!email.ok) {
    return fail("invalid_credentials", { field: "email" });
  }

  if (
    !consumeRateLimit(rateLimitKey(request, "login-ip"), 30, 5 * 60 * 1000) ||
    !consumeRateLimit(
      rateLimitKey(request, "login-email", email.value),
      10,
      5 * 60 * 1000
    )
  ) {
    return fail("rate_limited");
  }

  const password = validatePassword(body.password);
  if (!password.ok) {
    return fail("invalid_credentials", { field: "password" });
  }

  const user = await getUserByEmail(email.value);
  const passwordValid = await verifyPassword(
    password.value,
    user?.passwordHash ?? (await getDummyHash())
  );

  if (!user || !passwordValid) {
    return fail("invalid_credentials");
  }

  const now = new Date().toISOString();
  user.lastLoginAt = now;
  user.loginCount += 1;
  user.updatedAt = now;
  await updateUser(user);

  await createSessionCookie(user, { userAgent: readUserAgent(request) });

  return ok({ user: toPublicUser(user) });
}
