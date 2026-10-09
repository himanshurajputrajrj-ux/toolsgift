import { fail, isSameOrigin, ok, readJsonBody } from "@/app/lib/auth/api";
import { RESET_TOKEN_TTL_MS } from "@/app/lib/auth/config";
import { randomToken, sha256Hex } from "@/app/lib/auth/crypto";
import { sendPasswordResetEmail } from "@/app/lib/auth/email";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import { getUserByEmail, saveReset } from "@/app/lib/auth/store";
import { validateEmail } from "@/app/lib/auth/validate";
import type { PasswordResetRecord } from "@/app/lib/auth/types";

type ForgotBody = {
  email?: unknown;
};

function readAppOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const host = request.headers.get("x-forwarded-host") ?? new URL(request.url).host;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const body = await readJsonBody<ForgotBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  if (
    !consumeRateLimit(rateLimitKey(request, "forgot-ip"), 5, 60 * 60 * 1000)
  ) {
    return fail("rate_limited");
  }

  const email = validateEmail(body.email);
  if (!email.ok) {
    return fail(email.error, { field: "email" });
  }

  const user = await getUserByEmail(email.value);

  // Always answer generically so account existence cannot be probed.
  if (user) {
    const token = randomToken(32);
    const now = Date.now();

    const record: PasswordResetRecord = {
      id: sha256Hex(token),
      userId: user.id,
      createdAt: new Date(now).toISOString(),
      expiresAt: new Date(now + RESET_TOKEN_TTL_MS).toISOString(),
    };

    await saveReset(record);

    const resetUrl = `${readAppOrigin(request)}/reset-password?token=${token}`;

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });
  }

  return ok({ sent: true });
}
