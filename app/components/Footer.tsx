"use client";
import Link from "next/link";
import CookiePreferences from "@/app/components/CookiePreferences";
import { clearCookieConsent } from "@/app/lib/cookieConsent";
import { useLanguage } from "@/app/providers/LanguageProvider";
export default function Footer() {
  const { t } = useLanguage();
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
          {t.footerLinks.tagline}
        </p>
        <nav
          aria-label={t.footerLinks.navigation}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          <Link
            href="/"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/image-tools"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.categories.imageTools}
          </Link>
          <Link
            href="/pdf-tools"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.home.pdfToolsBtn}
          </Link>
          <Link
            href="/about"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.aboutUs}
          </Link>
          <Link
            href="/contact"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.contactUs}
          </Link>
          <Link
            href="/privacy"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.privacyPolicy}
          </Link>
          <Link
            href="/terms"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.termsOfService}
          </Link>
          <Link
            href="/disclaimer"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footer.disclaimer}
          </Link>
          <Link
            href="/cookies"
            className="text-white/55 darkmode:text-white/55 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.cookiePolicy}
          </Link>
          <CookiePreferences />
          <button
            type="button"
            onClick={resetConsent}
            className="text-white/55 darkmode:text-white/55 underline decoration-white/40 darkmode:decoration-white/40 underline-offset-2 transition hover:text-white darkmode:hover:text-white"
          >
            {t.footerLinks.resetConsent}
          </button>
        </nav>
        <div className="mt-10 border-t border-white/10 darkmode:border-white/10 pt-7 text-sm text-white/60 darkmode:text-white/60">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
