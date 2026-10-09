export type AuthPlanId = "free" | "pro" | "premium";

/**
 * Future-ready billing shape. Everything is stored server-side on the user
 * record so premium subscriptions and payments can be wired in later without
 * migrating existing accounts.
 */
export type AuthPlan = {
  id: AuthPlanId;
  status: "active" | "trialing" | "past_due" | "canceled";
  provider: "stripe" | "paypal" | null;
  customerId: string | null;
  priceId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  /** scrypt hash; `null` for accounts that only ever signed in with Google */
  passwordHash: string | null;
  /** Google OIDC `sub` claim once the account has been linked; `null` otherwise */
  googleSub?: string | null;
  emailVerified: boolean;
  role: "user" | "admin";
  plan: AuthPlan;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  loginCount: number;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  hasPassword: boolean;
  googleLinked: boolean;
  role: "user" | "admin";
  plan: AuthPlan;
  createdAt: string;
};

export type SessionRecord = {
  /** sha256 of the opaque session token held in the cookie */
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  lastSeenAt: string;
  userAgent: string | null;
};

export type PasswordResetRecord = {
  /** sha256 of the opaque reset token sent by email */
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

export type AuthErrorCode =
  | "invalid_credentials"
  | "email_taken"
  | "invalid_email"
  | "weak_password"
  | "password_mismatch"
  | "name_required"
  | "rate_limited"
  | "invalid_token"
  | "wrong_password"
  | "not_authenticated"
  | "invalid_request"
  | "server_error";

export type AuthField = "name" | "email" | "password";

export type AuthError = {
  code: AuthErrorCode;
  field?: AuthField;
};

export type AuthFailure = {
  ok: false;
  error: AuthError;
};

export type AuthSuccess<T = Record<string, never>> = { ok: true } & T;

export type AuthResponse<T = Record<string, never>> =
  | AuthSuccess<T>
  | AuthFailure;
