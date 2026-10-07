"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 py-12 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4" role="status">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.common.loading}
        </p>
        <span className="sr-only">{t.common.loading}</span>
      </div>
    </div>
  );
}