import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import {
  OAUTH_STATE_COOKIE_NAME,
  buildAuthorizeUrl,
  createOAuthFlow,
  encodeOAuthStateCookie,
  getGoogleOAuthConfig,
  safeAuthPage,
  safeRedirectPath,
  type OAuthFromPage,
} from "@/app/lib/auth/google-oauth";

function toAuthPage(
  origin: string,
  from: OAuthFromPage,
  code: string
): NextResponse {
  const url = new URL(from, origin);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url, { status: 303 });
}

/**
 * Entry point for "Continue with Google". Builds the OpenID Connect
 * authorization request (state + nonce + PKCE, `prompt=select_account` so
 * Google shows its normal account chooser) and hands the flow secrets to an
 * httpOnly, HMAC-signed cookie that only the callback can read.
 *
 * The user always authenticates on accounts.google.com — this app never sees
 * or handles a Google password.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const origin = url.origin;
  const from = safeAuthPage(url.searchParams.get("from") ?? undefined);
  const returnTo = safeRedirectPath(url.searchParams.get("returnTo") ?? "");

  if (
    !consumeRateLimit(rateLimitKey(request, "google-auth-start"), 30, 5 * 60 * 1000)
  ) {
    return toAuthPage(origin, from, "google_failed");
  }

  const config = getGoogleOAuthConfig();

  if (!config) {
    console.error(
      "[auth] Google sign-in requested but GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET are not set"
    );
    return toAuthPage(origin, from, "google_not_configured");
  }

  const flow = createOAuthFlow({ returnTo, from });

  const response = NextResponse.redirect(
    buildAuthorizeUrl({ origin, clientId: config.clientId, flow }),
    { status: 303 }
  );

  const cookieStore = await cookies();
  cookieStore.set(OAUTH_STATE_COOKIE_NAME, encodeOAuthStateCookie(flow), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return response;
}
