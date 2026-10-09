"use client";

import { useState } from "react";

import { useLanguage } from "@/app/providers/LanguageProvider";

export function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

/**
 * Full-page navigation to /api/auth/google, so the only "loading" state that
 * matters is the one before the browser leaves for accounts.google.com.
 */
export function GoogleButton({
  href,
  label,
}: {
  href: string;
  label?: string;
}) {
  const { t } = useLanguage();
  const [navigating, setNavigating] = useState(false);

  return (
    <a
      href={href}
      onClick={() => setNavigating(true)}
      aria-busy={navigating}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-black tracking-wide text-[#202124] shadow-sm transition hover:bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 darkmode:border-white/15 darkmode:bg-transparent darkmode:text-slate-100 darkmode:hover:bg-white/[0.06]"
    >
      {navigating ? (
        <span>{t.auth.pleaseWait}</span>
      ) : (
        <>
          <GoogleIcon />
          <span>{label ?? t.auth.continueWithGoogle}</span>
        </>
      )}
    </a>
  );
}

export function AuthDivider() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-black/10 darkmode:bg-white/15" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-wider text-black/40 darkmode:text-slate-400">
        {t.auth.googleDivider}
      </span>
      <span className="h-px flex-1 bg-black/10 darkmode:bg-white/15" />
    </div>
  );
}
