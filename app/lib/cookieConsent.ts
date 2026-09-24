export const CONSENT_KEY = "toolsgift-cookie-consent";
export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
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
export function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.analytics === true;
}
export function hasAdvertisingConsent(): boolean {
  return getCookieConsent()?.advertising === true;
}
