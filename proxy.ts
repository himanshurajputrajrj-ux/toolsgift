import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/app/lib/auth/config";
import { decodeSessionCookie } from "@/app/lib/auth/session-cookie";
import { getSessionById } from "@/app/lib/auth/store";

const PROTECTED_PATHS = ["/profile"];
const SIGNED_IN_ONLY_PATHS = ["/login", "/signup"];

function matches(pathname: string, paths: string[]): boolean {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

/**
 * A valid signature only proves the cookie was issued by us. The session can
 * still have been revoked (logout everywhere, password change, expiry), so
 * protected pages must confirm the record exists before rendering — the page
 * shell streams before the Data Access Layer can redirect, which would turn a
 * redirect into a soft, client-side one.
 *
 * Storage failures fall back to the optimistic cookie check instead of
 * locking everyone out; the Data Access Layer still enforces the real rule.
 */
async function sessionStillValid(
  cookieValue: string | undefined
): Promise<boolean> {
  const decoded = decodeSessionCookie(cookieValue);

  if (!decoded) {
    return false;
  }

  try {
    const session = await getSessionById(decoded.sessionId);
    return Boolean(session && session.expiresAt > new Date().toISOString());
  } catch (error) {
    console.error("[auth] proxy session lookup failed:", error);
    return true;
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isProtected = matches(pathname, PROTECTED_PATHS);
  const isSignedInOnly = matches(pathname, SIGNED_IN_ONLY_PATHS);

  if (!isProtected && !isSignedInOnly) {
    return NextResponse.next();
  }

  if (isProtected && !cookieValue) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  const valid = cookieValue ? await sessionStillValid(cookieValue) : false;

  if (isProtected && !valid) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", `${pathname}${search}`);
    const response = NextResponse.redirect(url);
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  if (isSignedInOnly && valid) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/login", "/signup"],
};
