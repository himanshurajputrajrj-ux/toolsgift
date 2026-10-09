"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-center bg-slate-50 px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-1 text-2xl tracking-tight"
          aria-label="ToolsGift Home"
        >
          <span className="font-black text-[#202124]">Tools</span>
          <span className="font-medium text-[#202124]">Gift</span>
          <span
            className="ml-0.5 -mt-3 text-sm font-bold text-[#c9a227]"
            aria-hidden="true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 8 16 12 22 12C16 12 12 16 12 22C12 16 8 12 2 12C8 12 12 8 12 2Z" />
            </svg>
          </span>
        </Link>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>

          {children ? <div className="mt-6">{children}</div> : null}
        </div>

        {footer ? (
          <div className="mt-5 text-center text-sm text-slate-600">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
