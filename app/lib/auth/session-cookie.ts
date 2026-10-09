import { hmacSign, hmacVerify } from "./crypto";

/**
 * Cookie payload: `<sessionId>.<expiresAtMs>.<hmac>`.
 * The signature is verified with a timing-safe comparison and the expiry is
 * embedded so Proxy can reject stale sessions without touching storage.
 */
export function encodeSessionCookie(
  sessionId: string,
  expiresAtMs: number
): string {
  const payload = `${sessionId}.${expiresAtMs}`;
  return `${payload}.${hmacSign(payload)}`;
}

export function decodeSessionCookie(
  value: string | undefined | null
): { sessionId: string; expiresAtMs: number } | null {
  if (!value) {
    return null;
  }

  const parts = value.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [sessionId, expiresAt, signature] = parts;
  const expiresAtMs = Number(expiresAt);

  if (!sessionId || !Number.isFinite(expiresAtMs)) {
    return null;
  }

  if (!hmacVerify(`${sessionId}.${expiresAt}`, signature)) {
    return null;
  }

  if (expiresAtMs <= Date.now()) {
    return null;
  }

  return { sessionId, expiresAtMs };
}
