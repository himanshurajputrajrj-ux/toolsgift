import { PASSWORD_MIN_LENGTH } from "./config";
import type { AuthErrorCode } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationOutcome =
  | { ok: true; value: string }
  | { ok: false; error: AuthErrorCode };

export function validateName(value: unknown): ValidationOutcome {
  const name = typeof value === "string" ? value.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "name_required" };
  }

  return { ok: true, value: name };
}

export function validateEmail(value: unknown): ValidationOutcome {
  const email =
    typeof value === "string" ? value.trim().toLowerCase() : "";

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  return { ok: true, value: email };
}

export function validatePassword(value: unknown): ValidationOutcome {
  const password = typeof value === "string" ? value : "";

  if (password.length < PASSWORD_MIN_LENGTH) {
    return { ok: false, error: "weak_password" };
  }

  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { ok: false, error: "weak_password" };
  }

  if (password.length > 200) {
    return { ok: false, error: "weak_password" };
  }

  return { ok: true, value: password };
}
