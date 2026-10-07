"use client";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_KEY,
  saveCookieConsent,
} from "@/app/lib/cookieConsent";
import { useLanguage } from "@/app/providers/LanguageProvider";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      queueMicrotask(() => setVisible(true));
    }
  }, []);
  useEffect(() => {
    function handleReset() {
      setVisible(true);
    }
    window.addEventListener("toolsgift-consent-reset", handleReset);
    return () => {
      window.removeEventListener("toolsgift-consent-reset", handleReset);
    };
  }, []);
  useEffect(() => {
    if (!visible) {
      return;
    }
    const dialog = dialogRef.current;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.focus();
    return () => {
      if (
        previous &&
        previous !== dialog &&
        document.contains(previous)
      ) {
        previous.focus();
      }
    };
  }, [visible]);
  function saveConsent(analytics: boolean, advertising: boolean) {
    saveCookieConsent(analytics, advertising);
    window.dispatchEvent(new Event("toolsgift-consent-change"));
    setVisible(false);
  }
  function acceptAll() {
    saveConsent(true, true);
  }
  function rejectOptional() {
    saveConsent(false, false);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }
    const container = dialogRef.current;
    if (!container) {
      return;
    }
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey) {
      if (
        document.activeElement === first ||
        document.activeElement === container
      ) {
        event.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  if (!visible) {
    return null;
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-4">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        onKeyDown={handleKeyDown}
        className="mx-auto max-w-5xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl outline-none dark:border-white/10 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <h2
              id="cookie-consent-title"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              {t.consent.title}
            </h2>
            <p
              id="cookie-consent-description"
              className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300"
            >
              {t.consent.description}
              <a
                href="/cookies"
                className="ml-1 font-medium underline hover:no-underline"
              >
                {t.consent.policyLink}
              </a>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t.consent.rejectOptional}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              {t.consent.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
