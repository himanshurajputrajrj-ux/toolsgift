import { cookies } from "next/headers";

import {
  AUTH_COOKIE_NAME,
  SESSION_TTL_MS,
} from "./config";
import { randomToken, sha256Hex } from "./crypto";
import {
  decodeSessionCookie,
  encodeSessionCookie,
} from "./session-cookie";
import {
  deleteSession,
  deleteUserSessions,
  getSessionById,
  getUserById,
  saveSession,
  touchSession,
} from "./store";
import type { PublicUser, SessionRecord, UserRecord } from "./types";

const SESSION_COOKIE_TTL_SECONDS = SESSION_TTL_MS / 1000;

function isSecureCookie(): boolean {
  return process.env.NODE_ENV === "production";
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    hasPassword: Boolean(user.passwordHash),
    googleLinked: Boolean(user.googleSub),
    role: user.role,
    plan: user.plan,
    createdAt: user.createdAt,
  };
}

export async function createSessionCookie(
  user: UserRecord,
  meta: { userAgent: string | null }
): Promise<void> {
  const token = randomToken(24);
  const sessionId = sha256Hex(token);
  const now = Date.now();
  const expiresAtMs = now + SESSION_TTL_MS;

  const session: SessionRecord = {
    id: sessionId,
    userId: user.id,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(expiresAtMs).toISOString(),
    lastSeenAt: new Date(now).toISOString(),
    userAgent: meta.userAgent,
  };

  await saveSession(session);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, encodeSessionCookie(sessionId, expiresAtMs), {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Full server-side session verification: signed cookie -> session record ->
 * user record, with a sliding expiry refresh.
 *
 * Cookie mutation is only legal inside a Route Handler or Server Action, so
 * callers rendering Server Components pass `allowCookieWrite: false` and the
 * refresh simply happens on the next API round-trip instead.
 */
export async function readSession(options?: {
  allowCookieWrite?: boolean;
}): Promise<{
  user: UserRecord;
  session: SessionRecord;
} | null> {
  const allowCookieWrite = options?.allowCookieWrite ?? true;
  const cookieStore = await cookies();
  const decoded = decodeSessionCookie(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!decoded) {
    return null;
  }

  let session = await getSessionById(decoded.sessionId);

  if (!session || session.expiresAt <= new Date().toISOString()) {
    if (session) {
      await deleteSession(session.userId, session.id);
    }
    if (allowCookieWrite) {
      await clearSessionCookie();
    }
    return null;
  }

  const user = await getUserById(session.userId);

  if (!user) {
    await deleteSession(session.userId, session.id);
    if (allowCookieWrite) {
      await clearSessionCookie();
    }
    return null;
  }

  const remaining = Date.parse(session.expiresAt) - Date.now();

  if (allowCookieWrite && remaining < SESSION_TTL_MS / 2) {
    const expiresAtMs = Date.now() + SESSION_TTL_MS;

    session = {
      ...session,
      expiresAt: new Date(expiresAtMs).toISOString(),
      lastSeenAt: new Date().toISOString(),
    };

    await touchSession(session);

    const cookieStoreRefresh = await cookies();
    cookieStoreRefresh.set(
      AUTH_COOKIE_NAME,
      encodeSessionCookie(session.id, expiresAtMs),
      {
        httpOnly: true,
        secure: isSecureCookie(),
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_COOKIE_TTL_SECONDS,
      }
    );
  }

  return { user, session };
}

export async function destroyCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const decoded = decodeSessionCookie(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (decoded) {
    const session = await getSessionById(decoded.sessionId);
    if (session) {
      await deleteSession(session.userId, session.id);
    }
  }

  await clearSessionCookie();
}

export async function destroyAllUserSessions(userId: string): Promise<void> {
  await deleteUserSessions(userId);
  await clearSessionCookie();
}
