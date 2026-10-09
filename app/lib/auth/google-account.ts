import { randomToken } from "./crypto";
import type { GoogleIdClaims } from "./google-oauth";
import {
  createUser,
  getUserByGoogleSub,
  getUserByEmail,
  linkGoogleSub,
  normalizeEmail,
  updateUser,
  updateUserEmail,
} from "./store";
import type { UserRecord } from "./types";

export type GoogleAccountOutcome =
  | { ok: true; user: UserRecord; created: boolean }
  | { ok: false; code: "google_email_taken" | "google_failed" };

function defaultPlan(): UserRecord["plan"] {
  return {
    id: "free",
    status: "active",
    provider: null,
    customerId: null,
    priceId: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
  };
}

function touchLogin(user: UserRecord): void {
  const now = new Date().toISOString();
  user.lastLoginAt = now;
  user.loginCount += 1;
  user.updatedAt = now;
}

/**
 * Maps a verified Google identity onto the existing ToolsGift account system.
 *
 * Resolution order:
 *  1. Account already linked to this Google `sub` -> sign in.
 *  2. Existing account with the same email:
 *     - already linked to this `sub` -> sign in (race recovery).
 *     - linked to a *different* Google account -> refuse; the address is
 *       already bound to another Google identity.
 *     - not linked -> only attach the Google identity when the visitor is
 *       already signed in to that very account (the authenticated "link
 *       Google account" path) *and* Google verified the address. Otherwise
 *       refuse so a Google sign-in can never silently take over a password
 *       account. The user is told to sign in with their password first.
 *  3. No account -> create one with the same free-plan foundation as
 *     email/password signups.
 *
 * Two different account records are never merged: linking only ever attaches
 * a provider to an existing record, or creates a brand-new record.
 */
export async function resolveGoogleAccount(
  claims: GoogleIdClaims,
  options: { authenticatedUserId?: string | null } = {}
): Promise<GoogleAccountOutcome> {
  const authenticatedUserId = options.authenticatedUserId ?? null;

  try {
    const linked = await getUserByGoogleSub(claims.sub);

    if (linked) {
      await syncGoogleProfile(linked, claims, { allowLink: true });
      touchLogin(linked);
      await updateUser(linked);
      return { ok: true, user: linked, created: false };
    }

    const email = normalizeEmail(claims.email);
    const existing = await getUserByEmail(email);

    if (existing) {
      return linkExistingAccount(existing, claims, authenticatedUserId);
    }

    const now = new Date().toISOString();
    const user: UserRecord = {
      id: randomToken(12),
      name: claims.name && claims.name.length >= 2 ? claims.name.slice(0, 80) : email.split("@")[0],
      email,
      passwordHash: null,
      googleSub: claims.sub,
      emailVerified: claims.emailVerified,
      role: "user",
      plan: defaultPlan(),
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      loginCount: 1,
    };

    await createUser(user);
    return { ok: true, user, created: true };
  } catch (error) {
    // A concurrent flow may have claimed the email or the Google sub between
    // the lookup above and the insert. Re-check instead of duplicating.
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return recoverFromEmailConflict(claims, authenticatedUserId);
    }

    if (error instanceof Error && error.message === "GOOGLE_SUB_TAKEN") {
      const owner = await getUserByGoogleSub(claims.sub);

      if (owner) {
        await syncGoogleProfile(owner, claims, { allowLink: true });
        touchLogin(owner);
        await updateUser(owner);
        return { ok: true, user: owner, created: false };
      }
    }

    console.error("[auth] google account resolution failed:", error);
    return { ok: false, code: "google_failed" };
  }
}

/**
 * Attaches a Google identity to an existing account, or refuses. Refusal is
 * the default: linking requires a Google-verified email *and* a live session
 * for the very account that owns the address.
 */
async function linkExistingAccount(
  existing: UserRecord,
  claims: GoogleIdClaims,
  authenticatedUserId: string | null
): Promise<GoogleAccountOutcome> {
  if (existing.googleSub === claims.sub) {
    await syncGoogleProfile(existing, claims, { allowLink: true });
    touchLogin(existing);
    await updateUser(existing);
    return { ok: true, user: existing, created: false };
  }

  const ownsAccount =
    claims.emailVerified && authenticatedUserId === existing.id;

  if (existing.googleSub || !ownsAccount) {
    return { ok: false, code: "google_email_taken" };
  }

  await linkGoogleSub(existing.id, claims.sub);
  await syncGoogleProfile(existing, claims, { allowLink: true });
  touchLogin(existing);
  await updateUser(existing);
  return { ok: true, user: existing, created: false };
}

async function recoverFromEmailConflict(
  claims: GoogleIdClaims,
  authenticatedUserId: string | null
): Promise<GoogleAccountOutcome> {
  const existing = await getUserByEmail(normalizeEmail(claims.email));

  if (!existing) {
    return { ok: false, code: "google_email_taken" };
  }

  return linkExistingAccount(existing, claims, authenticatedUserId);
}

/**
 * Keeps the ToolsGift profile in step with Google on every sign-in: display
 * name, verified flag, and email (only when Google still owns the address).
 */
async function syncGoogleProfile(
  user: UserRecord,
  claims: GoogleIdClaims,
  options: { allowLink: boolean }
): Promise<void> {
  const changes: string[] = [];

  if (options.allowLink && !user.googleSub) {
    user.googleSub = claims.sub;
    changes.push("googleSub");
  }

  if (claims.emailVerified && !user.emailVerified) {
    user.emailVerified = true;
    changes.push("emailVerified");
  }

  if (
    claims.name &&
    claims.name.length >= 2 &&
    user.name.trim().length < 2
  ) {
    user.name = claims.name.slice(0, 80);
    changes.push("name");
  }

  if (claims.emailVerified && normalizeEmail(claims.email) !== user.email) {
    await updateUserEmail(user, claims.email);
    changes.push("email");
  }

  if (changes.length > 0) {
    user.updatedAt = new Date().toISOString();
    await updateUser(user);
  }
}
