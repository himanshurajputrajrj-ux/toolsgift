import {
  createHash,
  createPublicKey,
  randomBytes,
  timingSafeEqual,
  verify as verifySignature,
} from "node:crypto";

import { hmacSign, hmacVerify } from "./crypto";

export const OAUTH_STATE_COOKIE_NAME = "tg_oauth";

/** How long an in-flight OAuth attempt stays valid. */
export const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_JWKS_URI = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISSUERS = new Set([
  "https://accounts.google.com",
  "accounts.google.com",
]);
const CLOCK_SKEW_MS = 60 * 1000;
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;

export type GoogleOAuthConfig = {
  clientId: string;
  clientSecret: string;
};

/**
 * Page the flow started from. Errors are always redirected back to it so the
 * message is rendered by the same form the user came from — `/profile` is the
 * authenticated "link Google account" entry point.
 */
export type OAuthFromPage = "/login" | "/signup" | "/profile";

export type OAuthFlow = {
  state: string;
  nonce: string;
  verifier: string;
  returnTo: string;
  from: OAuthFromPage;
  exp: number;
};

export type GoogleIdClaims = {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
};

/**
 * Credentials live only in server environment variables. Missing values fail
 * closed — the routes redirect back to sign-in with a localized error instead
 * of ever sending a broken authorization request to Google.
 */
export function getGoogleOAuthConfig(): GoogleOAuthConfig | null {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
}

export function isGoogleOAuthConfigured(): boolean {
  return getGoogleOAuthConfig() !== null;
}

/* =========================================================
   STATE / PKCE / NONCE (signed, single-use, httpOnly cookie)
======================================================= */

function randomStateValue(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function createOAuthFlow(options: {
  returnTo: string;
  from: OAuthFromPage;
}): OAuthFlow {
  return {
    state: randomStateValue(),
    nonce: randomStateValue(24),
    verifier: randomStateValue(48),
    returnTo: options.returnTo,
    from: options.from,
    exp: Date.now() + OAUTH_STATE_TTL_MS,
  };
}

export function encodeOAuthStateCookie(flow: OAuthFlow): string {
  const json = JSON.stringify(flow);
  return `${Buffer.from(json, "utf8").toString("base64url")}.${hmacSign(json)}`;
}

export function decodeOAuthStateCookie(value: string | undefined | null): OAuthFlow | null {
  if (!value) {
    return null;
  }

  const separator = value.indexOf(".");

  if (separator <= 0) {
    return null;
  }

  const encodedPayload = value.slice(0, separator);
  const signature = value.slice(separator + 1);

  let json: string;

  try {
    json = Buffer.from(encodedPayload, "base64url").toString("utf8");
  } catch {
    return null;
  }

  if (!hmacVerify(json, signature)) {
    return null;
  }

  try {
    const flow = JSON.parse(json) as OAuthFlow;

    if (
      typeof flow.state !== "string" ||
      typeof flow.nonce !== "string" ||
      typeof flow.verifier !== "string" ||
      typeof flow.returnTo !== "string" ||
      !isOAuthFromPage(flow.from) ||
      typeof flow.exp !== "number" ||
      flow.exp <= Date.now()
    ) {
      return null;
    }

    return flow;
  } catch {
    return null;
  }
}

export function safeRedirectPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/profile";
  }

  return value;
}

export function safeAuthPage(value: string | undefined): OAuthFromPage {
  if (value === "/signup" || value === "/profile") {
    return value;
  }

  return "/login";
}

function isOAuthFromPage(value: unknown): value is OAuthFromPage {
  return value === "/login" || value === "/signup" || value === "/profile";
}

export function timingSafeStringEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

/* =========================================================
   AUTHORIZE + TOKEN EXCHANGE
======================================================= */

export function buildAuthorizeUrl(options: {
  origin: string;
  clientId: string;
  flow: OAuthFlow;
}): string {
  const { origin, clientId, flow } = options;
  const challenge = createHash("sha256")
    .update(flow.verifier)
    .digest("base64url");

  const url = new URL(GOOGLE_AUTH_ENDPOINT);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set(
    "redirect_uri",
    `${origin}/api/auth/google/callback`
  );
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", flow.state);
  url.searchParams.set("nonce", flow.nonce);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("prompt", "select_account");

  return url.toString();
}

export async function exchangeCodeForTokens(options: {
  code: string;
  verifier: string;
  origin: string;
  config: GoogleOAuthConfig;
}): Promise<{ accessToken: string; idToken: string }> {
  const body = new URLSearchParams({
    code: options.code,
    client_id: options.config.clientId,
    client_secret: options.config.clientSecret,
    redirect_uri: `${options.origin}/api/auth/google/callback`,
    grant_type: "authorization_code",
    code_verifier: options.verifier,
  });

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as {
    access_token?: string;
    id_token?: string;
    error?: string;
  } | null;

  if (!response.ok || !payload?.id_token || !payload.access_token) {
    throw new Error(`GOOGLE_TOKEN_EXCHANGE_FAILED${payload?.error ? `:${payload.error}` : ""}`);
  }

  return { accessToken: payload.access_token, idToken: payload.id_token };
}

/* =========================================================
   ID TOKEN VERIFICATION (RS256 against Google's JWKS)
======================================================= */

type JsonWebKey = {
  kty: string;
  kid: string;
  use?: string;
  alg?: string;
  n?: string;
  e?: string;
};

const jwksCache: { keys: JsonWebKey[] | null; expiresAt: number } = {
  keys: null,
  expiresAt: 0,
};

async function getGoogleJwks(): Promise<JsonWebKey[]> {
  if (jwksCache.keys && jwksCache.expiresAt > Date.now()) {
    return jwksCache.keys;
  }

  const response = await fetch(GOOGLE_JWKS_URI, {
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("GOOGLE_JWKS_UNAVAILABLE");
  }

  const payload = (await response.json().catch(() => null)) as {
    keys?: JsonWebKey[];
  } | null;

  if (!payload?.keys || payload.keys.length === 0) {
    throw new Error("GOOGLE_JWKS_EMPTY");
  }

  const cacheHeader = response.headers.get("cache-control") ?? "";
  const maxAgeMatch = /max-age=(\d+)/i.exec(cacheHeader);
  const maxAgeSeconds = maxAgeMatch ? Number(maxAgeMatch[1]) : 3600;
  const ttl = Math.min(
    Math.max(maxAgeSeconds * 1000, 60_000),
    JWKS_CACHE_TTL_MS
  );

  jwksCache.keys = payload.keys;
  jwksCache.expiresAt = Date.now() + ttl;

  return payload.keys;
}

type IdTokenHeader = { alg?: string; kid?: string };
type IdTokenPayload = {
  iss?: unknown;
  aud?: unknown;
  exp?: unknown;
  sub?: unknown;
  email?: unknown;
  email_verified?: unknown;
  nonce?: unknown;
  name?: unknown;
};

function decodeJwtPart(part: string): unknown {
  return JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
}

/**
 * Full OpenID Connect ID token validation: RS256 signature against Google's
 * rotated JWKS, issuer, audience, expiry, and the nonce bound to this flow.
 * The access token is never needed for identity — only the verified ID token
 * is trusted.
 */
export async function verifyGoogleIdToken(
  idToken: string,
  expected: { clientId: string; nonce: string }
): Promise<GoogleIdClaims> {
  const parts = idToken.split(".");

  if (parts.length !== 3) {
    throw new Error("GOOGLE_ID_TOKEN_MALFORMED");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  const header = decodeJwtPart(encodedHeader) as IdTokenHeader;
  const payload = decodeJwtPart(encodedPayload) as IdTokenPayload;

  if (header.alg !== "RS256" || typeof header.kid !== "string") {
    throw new Error("GOOGLE_ID_TOKEN_BAD_ALG");
  }

  const jwks = await getGoogleJwks();
  const jwk = jwks.find((key) => key.kid === header.kid && key.kty === "RSA");

  if (!jwk || !jwk.n || !jwk.e) {
    throw new Error("GOOGLE_JWK_NOT_FOUND");
  }

  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const signature = Buffer.from(encodedSignature, "base64url");
  const signedData = Buffer.from(`${encodedHeader}.${encodedPayload}`, "utf8");

  if (!verifySignature("sha256", signedData, publicKey, signature)) {
    throw new Error("GOOGLE_ID_TOKEN_BAD_SIGNATURE");
  }

  const issuer = typeof payload.iss === "string" ? payload.iss : "";
  const audience = payload.aud;
  const audienceMatches =
    audience === expected.clientId ||
    (Array.isArray(audience) && audience.includes(expected.clientId));

  if (!GOOGLE_ISSUERS.has(issuer) || !audienceMatches) {
    throw new Error("GOOGLE_ID_TOKEN_BAD_ISS_OR_AUD");
  }

  const expiresAtMs =
    typeof payload.exp === "number" ? payload.exp * 1000 : 0;

  if (expiresAtMs <= Date.now() - CLOCK_SKEW_MS) {
    throw new Error("GOOGLE_ID_TOKEN_EXPIRED");
  }

  if (
    typeof payload.nonce !== "string" ||
    !timingSafeStringEqual(payload.nonce, expected.nonce)
  ) {
    throw new Error("GOOGLE_ID_TOKEN_BAD_NONCE");
  }

  if (typeof payload.sub !== "string" || payload.sub.length === 0) {
    throw new Error("GOOGLE_ID_TOKEN_BAD_SUB");
  }

  if (typeof payload.email !== "string" || payload.email.length === 0) {
    throw new Error("GOOGLE_ID_TOKEN_NO_EMAIL");
  }

  return {
    sub: payload.sub,
    email: payload.email.trim().toLowerCase(),
    emailVerified: payload.email_verified === true,
    name: typeof payload.name === "string" ? payload.name.trim() : null,
  };
}
