"use client";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/app/lib/cookieConsent";
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      queueMicrotask(() => setVisible(true));
    }
  }, []);
  function saveConsent(analytics: boolean, advertising: boolean) {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics,
        advertising,
      })
    );
    window.dispatchEvent(new Event("toolsgift-consent-change"));
    setVisible(false);
  }
  function acceptAll() {
    saveConsent(true, true);
  }
  function rejectOptional() {
    saveConsent(false, false);
  }
  if (!visible) {
    return null;
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              We use cookies
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              ToolsGift uses necessary cookies to keep the website working.
              Optional cookies may be used for analytics and advertising.
              You can choose whether to allow optional cookies.
              <a
                href="/cookies"
                className="ml-1 font-medium underline hover:no-underline"
              >
                Read our Cookie Policy
              </a>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reject Optional
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
