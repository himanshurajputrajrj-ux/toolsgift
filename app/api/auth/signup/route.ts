import { randomToken, hashPassword } from "@/app/lib/auth/crypto";
import { fail, isSameOrigin, ok, readJsonBody, readUserAgent } from "@/app/lib/auth/api";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import { createUser, userExists } from "@/app/lib/auth/store";
import { createSessionCookie, toPublicUser } from "@/app/lib/auth/session";
import { validateEmail, validateName, validatePassword } from "@/app/lib/auth/validate";
import type { UserRecord } from "@/app/lib/auth/types";

type SignupBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const body = await readJsonBody<SignupBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  if (!consumeRateLimit(rateLimitKey(request, "signup"), 10, 60 * 60 * 1000)) {
    return fail("rate_limited");
  }

  const name = validateName(body.name);
  if (!name.ok) {
    return fail(name.error, { field: "name" });
  }

  const email = validateEmail(body.email);
  if (!email.ok) {
    return fail(email.error, { field: "email" });
  }

  const password = validatePassword(body.password);
  if (!password.ok) {
    return fail(password.error, { field: "password" });
  }

  if (await userExists(email.value)) {
    return fail("email_taken", { field: "email" });
  }

  const now = new Date().toISOString();

  const user: UserRecord = {
    id: randomToken(12),
    name: name.value,
    email: email.value,
    passwordHash: await hashPassword(password.value),
    emailVerified: false,
    role: "user",
    plan: {
      id: "free",
      status: "active",
      provider: null,
      customerId: null,
      priceId: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    },
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
    loginCount: 1,
  };

  try {
    await createUser(user);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return fail("email_taken", { field: "email" });
    }
    console.error("[auth] signup failed:", error);
    return fail("server_error");
  }

  await createSessionCookie(user, { userAgent: readUserAgent(request) });

  return ok({ user: toPublicUser(user) });
}
