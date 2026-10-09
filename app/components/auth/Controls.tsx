"use client";

import type { ReactNode } from "react";

import { useLanguage } from "@/app/providers/LanguageProvider";

export function FormAlert({ message }: { message?: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold leading-5 text-red-700 darkmode:border-red-500/30 darkmode:bg-red-500/10 darkmode:text-red-300"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export function FormSuccess({ message }: { message?: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm font-semibold leading-5 text-emerald-700 darkmode:border-emerald-500/30 darkmode:bg-emerald-500/10 darkmode:text-emerald-300"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export function SubmitButton({
  busy,
  children,
}: {
  busy: boolean;
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full rounded-xl bg-[#c9a227] px-4 py-3 text-sm font-black tracking-wide text-[#202124] shadow-sm transition hover:bg-[#f4c430] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {busy ? t.auth.pleaseWait : children}
    </button>
  );
}
