"use client";

import type { Translations } from "@/app/i18n/translations";

export type AuthActionResult<T = Record<string, never>> =
  | ({ ok: true } & T)
  | { ok: false; code: string; field?: string };

const NETWORK_ERROR = "network_error";

export async function submitJson<T extends object = Record<string, never>>(
  path: string,
  body: unknown,
  method: "POST" | "PATCH" = "POST"
): Promise<AuthActionResult<T>> {
  try {
    const response = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });

    const data = (await response.json().catch(() => null)) as
      | ({ ok?: boolean; error?: { code?: string; field?: string } } & T)
      | null;

    if (data && data.ok === true) {
      return { ok: true, ...data } as { ok: true } & T;
    }

    return {
      ok: false,
      code: data?.error?.code ?? "server_error",
      field: data?.error?.field,
    };
  } catch {
    return { ok: false, code: NETWORK_ERROR };
  }
}

/**
 * Maps an API error code to the localized message shown to the user.
 * Unknown codes fall back to a generic error string.
 */
export function authErrorMessage(
  t: Translations,
  code: string | undefined
): string {
  switch (code) {
    case "invalid_email":
      return t.auth.errInvalidEmail;
    case "name_required":
      return t.auth.errName;
    case "weak_password":
      return t.auth.errWeakPassword;
    case "password_mismatch":
      return t.auth.errPasswordMismatch;
    case "email_taken":
      return t.auth.errEmailTaken;
    case "invalid_credentials":
      return t.auth.errInvalidCredentials;
    case "wrong_password":
      return t.auth.errWrongPassword;
    case "rate_limited":
      return t.auth.errRateLimited;
    case "invalid_token":
      return t.auth.errInvalidToken;
    case "not_authenticated":
      return t.auth.errNotAuthenticated;
    case "google_cancelled":
      return t.auth.errGoogleCancelled;
    case "google_failed":
      return t.auth.errGoogleFailed;
    case "google_email_taken":
      return t.auth.errGoogleEmailTaken;
    case "google_not_configured":
      return t.auth.errGoogleNotConfigured;
    case "network_error":
      return t.auth.errNetwork;
    default:
      return t.auth.errServer;
  }
}
