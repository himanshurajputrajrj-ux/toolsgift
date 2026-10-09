import { NextResponse } from "next/server";

import type { AuthError, AuthErrorCode, AuthFailure, AuthField } from "./types";

const STATUS_BY_CODE: Record<AuthErrorCode, number> = {
  invalid_credentials: 401,
  email_taken: 409,
  invalid_email: 400,
  weak_password: 400,
  password_mismatch: 400,
  name_required: 400,
  rate_limited: 429,
  invalid_token: 400,
  wrong_password: 403,
  not_authenticated: 401,
  invalid_request: 400,
  server_error: 500,
};

export function ok<T extends object>(
  data: T,
  init?: ResponseInit
): NextResponse {
  return NextResponse.json({ ok: true, ...data }, { status: 200, ...init });
}

export function fail(
  code: AuthErrorCode,
  options: { field?: AuthField; status?: number } = {}
): NextResponse<AuthFailure> {
  const error: AuthError = options.field ? { code, field: options.field } : { code };

  return NextResponse.json(
    { ok: false, error },
    { status: options.status ?? STATUS_BY_CODE[code] }
  );
}

export async function readJsonBody<T>(request: Request): Promise<T | null> {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return null;
    }

    const body: unknown = await request.json();
    return body && typeof body === "object" ? (body as T) : null;
  } catch {
    return null;
  }
}

/**
 * Origin check for state-changing requests. Browsers always send `Origin`
 * on cross-site POSTs, so a mismatch means the request was forged.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function readUserAgent(request: Request): string | null {
  const userAgent = request.headers.get("user-agent");
  return userAgent ? userAgent.slice(0, 200) : null;
}
