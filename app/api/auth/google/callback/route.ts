import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { resolveGoogleAccount } from "@/app/lib/auth/google-account";
import {
  OAUTH_STATE_COOKIE_NAME,
  decodeOAuthStateCookie,
  exchangeCodeForTokens,
  getGoogleOAuthConfig,
  timingSafeStringEqual,
  verifyGoogleIdToken,
  type OAuthFromPage,
} from "@/app/lib/auth/google-oauth";
import { readUserAgent } from "@/app/lib/auth/api";
import { consumeRateLimit, rateLimitKey } from "@/app/lib/auth/rate-limit";
import { createSessionCookie, readSession } from "@/app/lib/auth/session";
import { deleteSession } from "@/app/lib/auth/store";

type FallbackTarget = { from: OAuthFromPage };

function toAuthPage(
  origin: string,
  target: FallbackTarget,
  code: string
): NextResponse {
  const url = new URL(target.from, origin);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url, { status: 303 });
}

/**
 * OAuth 2.0 / OpenID Connect callback.
 *
 * Order matters: the single-use state cookie is always consumed first (even
 * on error redirects) so a stale or replayed callback can never reuse it.
 * Identity is taken only from a nonce-bound, RS256-verified Google ID token.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const origin = url.origin;

  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(OAUTH_STATE_COOKIE_NAME)?.value;
  const flow = decodeOAuthStateCookie(rawCookie);

  cookieStore.delete(OAUTH_STATE_COOKIE_NAME);

  const target: FallbackTarget = { from: flow?.from ?? "/login" };

  const config = getGoogleOAuthConfig();

  if (!config) {
    return toAuthPage(origin, target, "google_not_configured");
  }

  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    const cancelled =
      oauthError === "access_denied" || oauthError === "interaction_required";
    return toAuthPage(
      origin,
      target,
      cancelled ? "google_cancelled" : "google_failed"
    );
  }

  if (!flow) {
    return toAuthPage(origin, target, "google_failed");
  }

  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (
    !state ||
    !code ||
    !timingSafeStringEqual(state, flow.state)
  ) {
    return toAuthPage(origin, target, "google_failed");
  }

  if (
    !consumeRateLimit(
      rateLimitKey(request, "google-auth-callback"),
      30,
      5 * 60 * 1000
    )
  ) {
    return toAuthPage(origin, target, "google_failed");
  }

  let idToken: string;

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      verifier: flow.verifier,
      origin,
      config,
    });
    idToken = tokens.idToken;
  } catch (error) {
    console.error("[auth] google token exchange failed:", error);
    return toAuthPage(origin, target, "google_failed");
  }

  let claims;

  try {
    claims = await verifyGoogleIdToken(idToken, {
      clientId: config.clientId,
      nonce: flow.nonce,
    });
  } catch (error) {
    console.error("[auth] google id token verification failed:", error);
    return toAuthPage(origin, target, "google_failed");
  }

  // The current session decides whether an unlinked Google identity may be
  // attached to an existing password account: only the signed-in owner of the
  // address can approve the link.
  const current = await readSession({ allowCookieWrite: false });

  const outcome = await resolveGoogleAccount(claims, {
    authenticatedUserId: current?.user.id ?? null,
  });

  if (!outcome.ok) {
    return toAuthPage(origin, target, outcome.code);
  }

  if (current && current.user.id === outcome.user.id) {
    // Same account (link flow or re-authentication): keep the existing
    // session untouched instead of rotating it.
    return NextResponse.redirect(new URL(flow.returnTo, origin), {
      status: 303,
    });
  }

  if (current) {
    // Switching to a different account on this device: end the old session so
    // no orphaned record is left behind when the cookie is replaced.
    await deleteSession(current.session.userId, current.session.id);
  }

  await createSessionCookie(outcome.user, {
    userAgent: readUserAgent(request),
  });

  return NextResponse.redirect(new URL(flow.returnTo, origin), {
    status: 303,
  });
}
