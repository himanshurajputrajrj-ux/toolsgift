export const AUTH_COOKIE_NAME = "tg_session";

export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_BLOB_ROOT = "auth/v1";

/**
 * Namespaced Vercel Blob keys. Every value is a private JSON object, so no
 * account data is ever reachable through a public URL.
 */
export const authPaths = {
  userById: (id: string) => `${AUTH_BLOB_ROOT}/users/by-id/${id}.json`,
  userEmail: (emailHash: string) =>
    `${AUTH_BLOB_ROOT}/users/by-email/${emailHash}.json`,
  userByGoogleSub: (subHash: string) =>
    `${AUTH_BLOB_ROOT}/users/by-google/${subHash}.json`,
  sessionByToken: (tokenHash: string) =>
    `${AUTH_BLOB_ROOT}/sessions/by-token/${tokenHash}.json`,
  sessionsByUser: (userId: string) =>
    `${AUTH_BLOB_ROOT}/sessions/by-user/${userId}.json`,
  resetByToken: (tokenHash: string) =>
    `${AUTH_BLOB_ROOT}/resets/by-token/${tokenHash}.json`,
};

/**
 * The session secret. Read lazily so importing this module never throws
 * during build time. Missing/short secrets fail closed at runtime.
 */
export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.trim().length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Generate one with: openssl rand -base64 48"
    );
  }

  return secret.trim();
}

export function isAuthConfigured(): boolean {
  try {
    getAuthSecret();
    return true;
  } catch {
    return false;
  }
}
