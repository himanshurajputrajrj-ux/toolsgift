"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F5ED] text-[#202124]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
        {/* Background glow */}
        <div className="absolute left-[-140px] top-20 h-80 w-80 rounded-full bg-yellow-200/45 blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-96 w-96 rounded-full bg-amber-100/55 blur-3xl" />

        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(32,33,36,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(32,33,36,0.025)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          <p className="mb-5 text-xs font-bold tracking-[0.28em] text-black/60">
            TOOLSGIFT
          </p>

          <div className="text-[110px] font-extrabold leading-none tracking-tight sm:text-[150px]">
            404
          </div>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#C9A227]" />

          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-black/60 sm:text-lg">
            The page you’re looking for doesn’t exist, may have been moved,
            or the link may be incorrect.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-w-[170px] items-center justify-center rounded-xl bg-[#202124] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#C9A227] hover:text-[#202124] hover:shadow-lg"
            >
              ← Back to Home
            </Link>

            <Link
              href="/#tools"
              className="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#C9A227]/50 hover:bg-[#F3E7B3] hover:shadow-md"
            >
              Explore Tools →
            </Link>
          </div>

          <p className="mt-10 text-xs font-medium tracking-wide text-black/40">
            FAST • SIMPLE • PRIVATE
          </p>
        </div>
      </section>
    </main>
  );
}