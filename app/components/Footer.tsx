"use client";
import Link from "next/link";
import CookiePreferences from "@/app/components/CookiePreferences";
import { clearCookieConsent } from "@/app/lib/cookieConsent";
export default function Footer() {
  function resetConsent() {
    clearCookieConsent();
    window.dispatchEvent(new Event("toolsgift-consent-change"));
    window.dispatchEvent(new Event("toolsgift-consent-reset"));
  }
  return (
    <footer className="bg-[#202124] darkmode:bg-[#0f172a] px-5 py-14 text-white darkmode:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-2xl font-black text-white darkmode:text-white">
          Tools<span className="font-normal">Gift</span>
        </div>
        <p className="mt-3 text-sm text-white/60 darkmode:text-white/60">
          Fast & Simple Image Tools.
        </p>
        <nav
          aria-label="Footer navigation"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          <Link
            href="/about"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            Contact Us
          </Link>
          <Link
            href="/privacy"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            Terms of Service
          </Link>
          <Link
            href="/disclaimer"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            Disclaimer
          </Link>
          <Link
            href="/cookies"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            Cookie Policy
          </Link>
          <CookiePreferences />
          <button
            type="button"
            onClick={resetConsent}
            className="text-white/55 darkmode:text-white/55 underline decoration-white/40 darkmode:decoration-white/40 underline-offset-2 transition hover:text-white darkmode:hover:text-white"
          >
            Reset Consent Choices
          </button>
        </nav>
        <div className="mt-10 border-t border-white/10 darkmode:border-white/10 pt-7 text-sm text-white/60 darkmode:text-white/60">
          © 2026 ToolsGift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
