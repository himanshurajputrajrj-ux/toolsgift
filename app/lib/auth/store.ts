import { del, get, put } from "@vercel/blob";

import { authPaths } from "./config";
import { sha256Hex } from "./crypto";
import type {
  PasswordResetRecord,
  SessionRecord,
  UserRecord,
} from "./types";

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, {
      access: "private",
      useCache: false,
    });

    if (!result?.stream) {
      return null;
    }

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
}

async function remove(pathname: string): Promise<void> {
  try {
    await del(pathname);
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
  }
}

function isNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const name = (error as { name?: string }).name;
  const statusCode = (error as { statusCode?: number }).statusCode;

  return name === "BlobNotFoundError" || statusCode === 404;
}

/* =========================================================
   USERS
========================================================= */

export async function getUserById(id: string): Promise<UserRecord | null> {
  return readJson<UserRecord>(authPaths.userById(id));
}

export async function getUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const pointer = await readJson<{ id: string }>(
    authPaths.userEmail(sha256Hex(normalizeEmail(email)))
  );

  if (!pointer?.id) {
    return null;
  }

  return getUserById(pointer.id);
}

export async function userExists(email: string): Promise<boolean> {
  const pointer = await readJson<{ id: string }>(
    authPaths.userEmail(sha256Hex(normalizeEmail(email)))
  );

  return Boolean(pointer?.id);
}

export async function createUser(user: UserRecord): Promise<void> {
  const emailPointerPath = authPaths.userEmail(sha256Hex(user.email));
  const existing = await readJson<{ id: string }>(emailPointerPath);

  if (existing?.id && existing.id !== user.id) {
    throw new Error("EMAIL_TAKEN");
  }

  if (user.googleSub) {
    const googlePointerPath = authPaths.userByGoogleSub(
      sha256Hex(user.googleSub)
    );
    const linked = await readJson<{ id: string }>(googlePointerPath);

    if (linked?.id && linked.id !== user.id) {
      throw new Error("GOOGLE_SUB_TAKEN");
    }

    await writeJson(googlePointerPath, { id: user.id });
  }

  await writeJson(authPaths.userById(user.id), user);
  await writeJson(emailPointerPath, { id: user.id });
}

export async function updateUser(user: UserRecord): Promise<void> {
  await writeJson(authPaths.userById(user.id), user);
}

export async function getUserByGoogleSub(
  sub: string
): Promise<UserRecord | null> {
  const pointer = await readJson<{ id: string }>(
    authPaths.userByGoogleSub(sha256Hex(sub))
  );

  if (!pointer?.id) {
    return null;
  }

  return getUserById(pointer.id);
}

/**
 * Attaches a verified Google `sub` to an existing account. Refuses if the
 * sub is already claimed by a different user so two accounts can never
 * share one Google identity.
 */
export async function linkGoogleSub(
  userId: string,
  sub: string
): Promise<void> {
  const googlePointerPath = authPaths.userByGoogleSub(sha256Hex(sub));
  const linked = await readJson<{ id: string }>(googlePointerPath);

  if (linked?.id && linked.id !== userId) {
    throw new Error("GOOGLE_SUB_TAKEN");
  }

  await writeJson(googlePointerPath, { id: userId });
}

/**
 * Re-points the email index when a Google account's primary email changed.
 * Never steals an address owned by a different user; returns false in that
 * case so the caller can keep the previous email on record.
 */
export async function updateUserEmail(
  user: UserRecord,
  newEmail: string
): Promise<boolean> {
  const normalized = normalizeEmail(newEmail);

  if (normalized === user.email) {
    return true;
  }

  const owner = await readJson<{ id: string }>(
    authPaths.userEmail(sha256Hex(normalized))
  );

  if (owner?.id && owner.id !== user.id) {
    return false;
  }

  const previousEmail = user.email;
  user.email = normalized;

  await writeJson(authPaths.userById(user.id), user);
  await writeJson(authPaths.userEmail(sha256Hex(normalized)), {
    id: user.id,
  });

  const previousPointerPath = authPaths.userEmail(
    sha256Hex(normalizeEmail(previousEmail))
  );
  const previousPointer = await readJson<{ id: string }>(previousPointerPath);

  if (previousPointer?.id === user.id) {
    await remove(previousPointerPath);
  }

  return true;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/* =========================================================
   SESSIONS
========================================================= */

export async function getSession(
  token: string
): Promise<SessionRecord | null> {
  return readJson<SessionRecord>(authPaths.sessionByToken(sha256Hex(token)));
}

export async function getSessionById(
  sessionId: string
): Promise<SessionRecord | null> {
  return readJson<SessionRecord>(authPaths.sessionByToken(sessionId));
}

export async function saveSession(session: SessionRecord): Promise<void> {
  await writeJson(authPaths.sessionByToken(session.id), session);

  const index = await readJson<{ tokens: string[] }>(
    authPaths.sessionsByUser(session.userId)
  );
  const tokens = new Set(index?.tokens ?? []);
  tokens.add(session.id);

  await writeJson(authPaths.sessionsByUser(session.userId), {
    tokens: [...tokens],
  });
}

export async function touchSession(session: SessionRecord): Promise<void> {
  await writeJson(authPaths.sessionByToken(session.id), session);
}

/**
 * Removes a session by its hashed id (`SessionRecord.id`).
 */
export async function deleteSession(
  userId: string,
  sessionId: string
): Promise<void> {
  await remove(authPaths.sessionByToken(sessionId));

  const index = await readJson<{ tokens: string[] }>(
    authPaths.sessionsByUser(userId)
  );

  if (!index) {
    return;
  }

  const tokens = index.tokens.filter((entry) => entry !== sessionId);

  if (tokens.length === 0) {
    await remove(authPaths.sessionsByUser(userId));
    return;
  }

  await writeJson(authPaths.sessionsByUser(userId), { tokens });
}

export async function deleteUserSessions(userId: string): Promise<string[]> {
  const index = await readJson<{ tokens: string[] }>(
    authPaths.sessionsByUser(userId)
  );

  if (!index || index.tokens.length === 0) {
    return [];
  }

  await Promise.all(
    index.tokens.map((token) => remove(authPaths.sessionByToken(token)))
  );
  await remove(authPaths.sessionsByUser(userId));

  return index.tokens;
}

/* =========================================================
   PASSWORD RESETS
========================================================= */

export async function saveReset(record: PasswordResetRecord): Promise<void> {
  await writeJson(authPaths.resetByToken(record.id), record);
}

export async function getReset(
  token: string
): Promise<PasswordResetRecord | null> {
  return readJson<PasswordResetRecord>(authPaths.resetByToken(sha256Hex(token)));
}

export async function deleteReset(token: string): Promise<void> {
  await remove(authPaths.resetByToken(sha256Hex(token)));
}
