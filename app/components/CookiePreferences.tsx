"use client";
import { useEffect, useState } from "react";
import {
  CONSENT_KEY,
  type CookieConsent,
} from "@/app/lib/cookieConsent";
export default function CookiePreferences() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  function loadPreferences() {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      setAnalytics(false);
      setAdvertising(false);
      return;
    }
    try {
      const consent = JSON.parse(saved) as CookieConsent;
      setAnalytics(Boolean(consent.analytics));
      setAdvertising(Boolean(consent.advertising));
    } catch {
      setAnalytics(false);
      setAdvertising(false);
    }
  }
  useEffect(() => {
    loadPreferences();
  }, []);
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  function openPreferences() {
    loadPreferences();
    setOpen(true);
  }
  function savePreferences() {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics,
        advertising,
      })
    );
    window.dispatchEvent(new Event("toolsgift-consent-change"));
    setOpen(false);
  }
  return (
    <>
      <button
        type="button"
        onClick={openPreferences}
        className="text-sm font-medium underline hover:no-underline"
      >
        Manage Cookie Preferences
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            <h2
              id="cookie-preferences-title"
              className="text-xl font-semibold text-slate-900 dark:text-white"
            >
              Cookie Preferences
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Choose which optional cookies you want to allow. Necessary
              cookies are always enabled because they support basic website
              functionality.
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      Necessary Cookies
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Required for basic website functionality.
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-slate-500">
                    Always On
                  </span>
                </div>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    Analytics Cookies
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Help us understand website usage and performance.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="h-5 w-5 shrink-0"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    Advertising Cookies
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    May be used to support personalized or measured
                    advertising.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(event) => setAdvertising(event.target.checked)}
                  className="h-5 w-5 shrink-0"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
