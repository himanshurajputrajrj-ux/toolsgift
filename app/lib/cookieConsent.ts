export const CONSENT_KEY = "toolsgift-cookie-consent";
export const CONSENT_VERSION = 2;
export const CONSENT_POLICY_VERSION = "2026-10-06";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  version: number;
  policyVersion: string;
  grantedAt: string;
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      return null;
    }
    return JSON.parse(saved) as CookieConsent;
  } catch {
    return null;
  }
}

/**
 * Records consent decisions locally in the browser. `grantedAt` and the
 * version fields keep an evidence trail (DPDP/GDPR good practice) so later
 * changes to the cookie policy can be detected.
 */
export function saveCookieConsent(
  analytics: boolean,
  advertising: boolean
): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    advertising,
    version: CONSENT_VERSION,
    policyVersion: CONSENT_POLICY_VERSION,
    grantedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  return consent;
}

export function clearCookieConsent(): void {
  localStorage.removeItem(CONSENT_KEY);
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.analytics === true;
}
export function hasAdvertisingConsent(): boolean {
  return getCookieConsent()?.advertising === true;
}