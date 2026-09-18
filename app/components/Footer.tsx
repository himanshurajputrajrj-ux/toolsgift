"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#202124] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-2xl font-black">
          Tools<span className="font-normal">Gift</span>
        </div>

        <p className="mt-3 text-sm text-white/45">
          Fast & Simple Image Tools.
        </p>

        <nav
          aria-label="Footer navigation"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          <Link
            href="/about"
            className="text-white/55 transition hover:text-white"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="text-white/55 transition hover:text-white"
          >
            Contact Us
          </Link>

          <Link
            href="/privacy"
            className="text-white/55 transition hover:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-white/55 transition hover:text-white"
          >
            Terms of Service
          </Link>

          <Link
            href="/disclaimer"
            className="text-white/55 transition hover:text-white"
          >
            Disclaimer
          </Link>

          <Link
            href="/cookies"
            className="text-white/55 transition hover:text-white"
          >
            Cookie Policy
          </Link>
        </nav>

        <div className="mt-10 border-t border-white/10 pt-7 text-sm text-white/40">
          � 2026 ToolsGift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


