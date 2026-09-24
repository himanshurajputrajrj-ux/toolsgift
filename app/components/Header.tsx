"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { languageOptions } from "@/app/i18n/translations";
import { useLanguage } from "@/app/providers/LanguageProvider";

type Tool = {
  title: string;
  link: string;
  icon: IconType;
  color: IconColor;
};

type IconType =
  | "compress"
  | "merge"
  | "split"
  | "organize"
  | "scan"
  | "repair"
  | "ocr"
  | "jpg"
  | "word"
  | "powerpoint"
  | "excel"
  | "html"
  | "pdfa"
  | "rotate"
  | "numbers"
  | "watermark"
  | "crop"
  | "edit"
  | "forms"
  | "unlock"
  | "protect"
  | "sign"
  | "redact"
  | "compare"
  | "ai"
  | "translate"
  | "markdown"
  | "image"
  | "converter"
  | "resize"
  | "enhance"
  | "background"
  | "metadata"
  | "passport"
  | "batch"
  | "qr"
  | "video";

type IconColor =
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "purple"
  | "orange";

const imageTools: Tool[] = [
  {
    title: "Image Compressor",
    link: "/tools/compressor",
    icon: "compress",
    color: "green",
  },
  {
    title: "Image Converter",
    link: "/tools/converter",
    icon: "converter",
    color: "yellow",
  },
  {
    title: "Image Resizer",
    link: "/tools/resizer",
    icon: "resize",
    color: "blue",
  },
  {
    title: "Image Cropper",
    link: "/tools/cropper",
    icon: "crop",
    color: "purple",
  },
  {
    title: "Image to PDF",
    link: "/tools/image-to-pdf",
    icon: "pdfa",
    color: "red",
  },
  {
    title: "WebP Converter",
    link: "/tools/webp-converter",
    icon: "converter",
    color: "yellow",
  },
  {
    title: "Image Rotator",
    link: "/tools/rotator",
    icon: "rotate",
    color: "purple",
  },
  {
    title: "Image Enhancer",
    link: "/tools/enhancer",
    icon: "enhance",
    color: "purple",
  },
  {
    title: "Background Remover",
    link: "/tools/background-remover",
    icon: "background",
    color: "blue",
  },
  {
    title: "Image Metadata",
    link: "/tools/image-metadata",
    icon: "metadata",
    color: "blue",
  },
  {
    title: "Passport Size Photo",
    link: "/tools/passport-photo",
    icon: "passport",
    color: "blue",
  },
  {
    title: "Batch Converter",
    link: "/tools/batch-converter",
    icon: "batch",
    color: "yellow",
  },
  {
    title: "Image to Word",
    link: "/tools/image-to-word",
    icon: "word",
    color: "blue",
  },
  {
    title: "Word to Image",
    link: "/tools/word-to-image",
    icon: "word",
    color: "blue",
  },
];

const organizeTools: Tool[] = [
  {
    title: "Merge PDF",
    link: "/tools/pdf-merger",
    icon: "merge",
    color: "red",
  },
  {
    title: "Split PDF",
    link: "/tools/pdf-splitter",
    icon: "split",
    color: "red",
  },
  {
    title: "Organize PDF",
    link: "/tools/pdf-organizer",
    icon: "organize",
    color: "red",
  },
  {
    title: "Scan to PDF",
    link: "/tools/scan-to-pdf",
    icon: "scan",
    color: "red",
  },
];

const optimizeTools: Tool[] = [
  {
    title: "Compress PDF",
    link: "/tools/pdf-compressor",
    icon: "compress",
    color: "green",
  },
  {
    title: "Repair PDF",
    link: "/tools/pdf-repair",
    icon: "repair",
    color: "green",
  },
  {
    title: "OCR PDF",
    link: "/tools/ocr-pdf",
    icon: "ocr",
    color: "green",
  },
];

const convertToPdfTools: Tool[] = [
  {
    title: "JPG to PDF",
    link: "/tools/image-to-pdf",
    icon: "jpg",
    color: "yellow",
  },
  {
    title: "Word to PDF",
    link: "/tools/word-to-pdf",
    icon: "word",
    color: "blue",
  },
  {
    title: "PowerPoint to PDF",
    link: "/tools/powerpoint-to-pdf",
    icon: "powerpoint",
    color: "red",
  },
  {
    title: "Excel to PDF",
    link: "/tools/excel-to-pdf",
    icon: "excel",
    color: "green",
  },
  {
    title: "HTML to PDF",
    link: "/tools/html-to-pdf",
    icon: "html",
    color: "yellow",
  },
];

const convertFromPdfTools: Tool[] = [
  {
    title: "PDF to JPG",
    link: "/tools/pdf-to-jpg",
    icon: "jpg",
    color: "yellow",
  },
  {
    title: "PDF to Word",
    link: "/tools/pdf-to-word",
    icon: "word",
    color: "blue",
  },
  {
    title: "PDF to PowerPoint",
    link: "/tools/pdf-to-powerpoint",
    icon: "powerpoint",
    color: "red",
  },
  {
    title: "PDF to Excel",
    link: "/tools/pdf-to-excel",
    icon: "excel",
    color: "green",
  },
  {
    title: "PDF to PDF/A",
    link: "/tools/pdf-to-pdfa",
    icon: "pdfa",
    color: "blue",
  },
];

const editTools: Tool[] = [
  {
    title: "Rotate PDF",
    link: "/tools/pdf-rotator",
    icon: "rotate",
    color: "purple",
  },
  {
    title: "Add Page Numbers",
    link: "/tools/pdf-page-numbers",
    icon: "numbers",
    color: "purple",
  },
  {
    title: "PDF Watermark",
    link: "/tools/pdf-watermark",
    icon: "watermark",
    color: "purple",
  },
  {
    title: "Crop PDF",
    link: "/tools/pdf-cropper",
    icon: "crop",
    color: "purple",
  },
  {
    title: "PDF Editor",
    link: "/tools/pdf-editor",
    icon: "edit",
    color: "purple",
  },
  {
    title: "PDF Forms",
    link: "/tools/pdf-forms",
    icon: "forms",
    color: "purple",
  },
];

const securityTools: Tool[] = [
  {
    title: "Unlock PDF",
    link: "/tools/pdf-unlocker",
    icon: "unlock",
    color: "blue",
  },
  {
    title: "Protect PDF",
    link: "/tools/pdf-protector",
    icon: "protect",
    color: "blue",
  },
  {
    title: "Sign PDF",
    link: "/tools/pdf-signer",
    icon: "sign",
    color: "blue",
  },
  {
    title: "Redact PDF",
    link: "/tools/pdf-redactor",
    icon: "redact",
    color: "blue",
  },
  {
    title: "Compare PDF",
    link: "/tools/pdf-comparer",
    icon: "compare",
    color: "blue",
  },
];

const intelligenceTools: Tool[] = [
  {
    title: "PDF Summarizer",
    link: "/tools/pdf-summarizer",
    icon: "ai",
    color: "purple",
  },
  {
    title: "PDF Translator",
    link: "/tools/pdf-translator",
    icon: "translate",
    color: "purple",
  },
  {
    title: "PDF to Markdown",
    link: "/tools/pdf-to-markdown",
    icon: "markdown",
    color: "purple",
  },
];

const utilityTools: Tool[] = [
  {
    title: "Favicon Generator",
    link: "/tools/favicon-generator",
    icon: "image",
    color: "blue",
  },
  {
    title: "QR Code Generator",
    link: "/tools/qr-code-generator",
    icon: "qr",
    color: "blue",
  },
  {
    title: "Percentage Calculator",
    link: "/tools/percentage-calculator",
    icon: "converter",
    color: "green",
  },
  {
    title: "Case Converter",
    link: "/tools/case-converter",
    icon: "converter",
    color: "purple",
  },
  {
    title: "Character Counter",
    link: "/tools/character-counter",
    icon: "converter",
    color: "blue",
  },
  {
    title: "Word Counter",
    link: "/tools/word-counter",
    icon: "converter",
    color: "blue",
  },
  {
    title: "HEIC to JPG",
    link: "/tools/heic-to-jpg",
    icon: "converter",
    color: "yellow",
  },
  {
    title: "Compress Image to KB",
    link: "/tools/compress-image-to-kb",
    icon: "compress",
    color: "green",
  },
  {
    title: "Image to Text",
    link: "/tools/image-to-text",
    icon: "ocr",
    color: "purple",
  },
  {
    title: "Unit Converter",
    link: "/tools/unit-converter",
    icon: "converter",
    color: "orange",
  },
];const otherTools: Tool[] = [
  {
    title: "Video \u2192 Link",
    link: "/tools/video-to-link",
    icon: "video",
    color: "blue",
  },
  {
    title: "Social Media QR Card",
    link: "/tools/social-qr-card",
    icon: "qr",
    color: "blue",
  },
];

export default function Header() {
  const { locale, t, setLocale } = useLanguage();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<"all" | "images" | "pdf" | "convert" | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
    useEffect(() => {
      const savedTheme = localStorage.getItem("toolsgift-theme");
      if (savedTheme === "dark") {
        // Theme is restored from localStorage after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDarkMode(true);
      }
      setThemeReady(true);
    }, []);

  const toolsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("toolsgift-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        toolsRef.current &&
        !toolsRef.current.contains(event.target as Node)
      ) {
        setToolsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
        setLanguageOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  function closeMenus() {
    setToolsOpen(false);
    setMobileOpen(false);
    setLanguageOpen(false);
    setDesktopDropdown(null);
    setMoreOpen(false);
  }
    if (!themeReady) return null;

    return (
      <header
      ref={toolsRef}
      className={`sticky top-0 z-[100] border-b shadow-[0_8px_30px_rgba(32,33,36,0.04)] backdrop-blur-xl ${
  darkMode
    ? "border-white/[0.10] bg-[#182235]/95"
    : "border-black/[0.08] bg-[#f8f5ed]/95"
}`}>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-1 text-2xl tracking-tight"
          aria-label="ToolsGift Home"
        >
          <span className="font-black text-[#202124]">Tools</span><span className="font-medium text-[#202124]">Gift</span>
          <span
            className="ml-0.5 -mt-3 text-sm font-bold text-[#c9a227] transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          >
            ✦
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <DesktopDropdown label={t.nav.allTools} open={desktopDropdown === "all"} onClick={() => { setDesktopDropdown((v) => v === "all" ? null : "all"); setToolsOpen(false); setLanguageOpen(false); setMoreOpen(false); }}>
            <DesktopAllToolsContent />
          </DesktopDropdown>

          <DesktopDropdown label={t.nav.images} open={desktopDropdown === "images"} onClick={() => { setDesktopDropdown((v) => v === "images" ? null : "images"); setToolsOpen(false); setLanguageOpen(false); setMoreOpen(false); }}>
            <DesktopToolList tools={imageTools} />
          </DesktopDropdown>

          <DesktopDropdown label={t.nav.pdf} open={desktopDropdown === "pdf"} onClick={() => { setDesktopDropdown((v) => v === "pdf" ? null : "pdf"); setToolsOpen(false); setLanguageOpen(false); setMoreOpen(false); }}>
            <DesktopPdfContent />
          </DesktopDropdown>

          <DesktopDropdown label={t.nav.convert} open={desktopDropdown === "convert"} onClick={() => { setDesktopDropdown((v) => v === "convert" ? null : "convert"); setToolsOpen(false); setLanguageOpen(false); setMoreOpen(false); }}>
            <DesktopConvertContent />
          </DesktopDropdown>

          <Link href="/#tools" className="rounded-full px-3.5 py-2.5 text-sm font-semibold text-black/65 transition hover:bg-black/[0.045] hover:text-[#202124]">
            {t.nav.search}
          </Link>
        </nav>

        {/* Desktop Language Selector */}
        <div className="relative hidden lg:block">
          <button type="button" onClick={() => { setLanguageOpen((v) => !v); setToolsOpen(false); }} className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-sm font-bold shadow-sm transition ${darkMode ? "border-white/10 bg-[#1e293b] text-white hover:bg-[#334155]" : "border-black/10 bg-white/70 text-[#202124] hover:bg-white"}`} aria-expanded={languageOpen}>
            <span aria-hidden="true">🌐</span><span>{languageOptions.find((language) => language.code === locale)?.name ?? "Language"}</span>
          </button>
          {languageOpen && <div className={`absolute right-0 top-full mt-3 w-80 rounded-2xl border p-3 shadow-2xl ${darkMode ? "border-white/10 bg-[#151f32]" : "border-[#c9a227]/20 bg-[#fffdf8]"}`}>
            <div className="grid max-h-[65vh] grid-cols-2 gap-1 overflow-y-auto">
              {languageOptions.map((language) => <button key={language.code} type="button" onClick={() => { setLocale(language.code); setLanguageOpen(false); }} className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${darkMode ? "text-slate-200 hover:bg-white/10" : "text-black/75 hover:bg-black/[0.05]"}`}>{language.name}</button>)}
            </div>
          </div>}
        </div>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode((value) => !value)}
          className={`hidden h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold shadow-sm transition md:flex ${
  darkMode
    ? "border-[#c9a227]/40 bg-[#1e293b] text-[#f4d77b] hover:bg-[#334155]"
    : "border-[#c9a227]/20 bg-white/70 text-[#202124] hover:bg-white"
}`}
          aria-label={darkMode ? t.nav.lightMode : t.nav.darkMode}
          title={darkMode ? t.nav.lightMode : t.nav.darkMode}
        >
            <span>{darkMode ? t.nav.lightMode : t.nav.darkMode}</span>
          {darkMode ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Desktop Secondary Menu */}
        <div className="relative hidden lg:block">
          <button type="button" onClick={() => { setToolsOpen(false); setLanguageOpen(false); setDesktopDropdown(null); setMoreOpen((v) => !v); }} className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition ${darkMode ? "border-white/10 bg-[#1e293b] text-white hover:bg-[#334155]" : "border-black/10 bg-white/70 text-[#202124] hover:bg-white"}`} aria-label={t.nav.more} title={t.nav.more}>
            <span className="grid grid-cols-2 gap-1">{Array.from({length:4}).map((_,i)=><span key={i} className="h-1.5 w-1.5 rounded-full bg-current" />)}</span>
          </button>
        </div>

        {moreOpen && (
          <div className={`absolute right-5 top-[66px] z-[130] hidden w-56 rounded-2xl border p-2 shadow-2xl lg:block ${darkMode ? "border-white/10 bg-[#151f32]" : "border-[#c9a227]/20 bg-[#fffdf8]"}`}>
            {[
              [t.nav.features, "/#features"],
              [t.nav.howItWorks, "/#how-it-works"],
              [t.nav.faq, "/#faq"],
              [t.footer.about, "/about"],
              [t.footer.contact, "/contact"],
              [t.footer.privacy, "/privacy"],
              [t.footer.terms, "/terms"],
              [t.footer.cookies, "/cookies"],
              [t.footer.disclaimer, "/disclaimer"],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMoreOpen(false)} className={`block rounded-xl px-3 py-2.5 text-sm font-semibold ${darkMode ? "text-slate-200 hover:bg-white/10" : "text-black/75 hover:bg-black/[0.05]"}`}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() =>
            setMobileOpen((value) => !value)
          }
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm md:hidden ${
  darkMode
    ? "border-[#c9a227]/30 bg-[#1e293b] text-[#f4d77b]"
    : "border-[#c9a227]/20 bg-white/70 text-[#202124]"
}`}
          aria-label="Open menu"
        >
          {mobileOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M6 6l12 12M18 6 6 18"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (
        <div className={`absolute left-0 right-0 top-full border-b shadow-xl md:hidden ${
  darkMode
    ? "border-[#c9a227]/20 bg-[#151f32]"
    : "border-[#c9a227]/20 bg-[#fffdf8]"
}`}>

          <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-5 py-5">

            <div className="mb-3">
              <span className={`text-lg font-extrabold ${
  darkMode ? "text-white" : "text-[#202124]"
}`}>
                {t.nav.menu}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setToolsOpen((value) => !value)
              }
              className={`flex w-full items-center justify-between border-b py-4 text-base font-bold ${
  darkMode
    ? "border-white/10 text-white"
    : "border-black/10 text-black"
}`}
            >
              <span>{t.nav.tools}</span>

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform ${
                  toolsOpen
                    ? "rotate-180"
                    : ""
                }`}
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {toolsOpen && (
              <div className={`mt-3 rounded-2xl border border-[#c9a227]/15 p-3 ${
  darkMode ? "bg-[#1e293b]" : "bg-[#f8f5ed]"
}`}>

                <MobileCategory
                  title={t.categories.imageTools}
                  tools={imageTools}
                />

                <MobileCategory
                  title={t.categories.organizePdf}
                  tools={organizeTools}
                />

                <MobileCategory
                  title={t.categories.optimizePdf}
                  tools={optimizeTools}
                />

                <MobileCategory
                  title={t.categories.convertToPdf}
                  tools={convertToPdfTools}
                />

                <MobileCategory
                  title={t.categories.convertFromPdf}
                  tools={convertFromPdfTools}
                />

                <MobileCategory
                  title={t.categories.editPdf}
                  tools={editTools}
                />

                <MobileCategory
                  title={t.categories.pdfSecurity}
                  tools={securityTools}
                />

                <MobileCategory
                  title={t.categories.pdfIntelligence}
                  tools={intelligenceTools}
                />

                <MobileCategory
                  title="Other Tools"
                  tools={otherTools}
                />

              </div>
            )}

            <div className={`mt-3 border-t pt-2 ${
  darkMode ? "border-white/10" : "border-black/10"
}`}>

              <Link
                href="/#features"
                onClick={closeMenus}
                className={`block py-4 text-base font-bold ${
  darkMode ? "text-slate-300" : "text-black/75"
}`}
              >
                {t.nav.features}
              </Link>

              <Link
                href="/#how-it-works"
                onClick={closeMenus}
                className={`block py-4 text-base font-bold ${
  darkMode ? "text-slate-300" : "text-black/75"
}`}
              >
                {t.nav.howItWorks}
              </Link>

              {/* LANGUAGE */}
              <div
                className={`border-b ${
  darkMode ? "border-white/10" : "border-black/10"
}`}
              >
                <button
                  type="button"
                  onClick={() => setLanguageOpen((value) => !value)}
                  className={`flex w-full items-center justify-between py-4 text-base font-bold ${
  darkMode ? "text-slate-300" : "text-black/75"
}`}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true">🌐</span>
                    <span>{languageOptions.find((language) => language.code === locale)?.name ?? t.nav.language}</span>
                  </span>

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`transition-transform ${
                      languageOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {languageOpen && (
                  <div
                    className={`mb-3 max-h-64 overflow-y-auto rounded-2xl border p-2 ${
  darkMode
    ? "border-white/10 bg-[#1e293b]"
    : "border-black/10 bg-[#f8f5ed]"
}`}
                  >
                    {languageOptions.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => {
                          setLocale(language.code);
                          setLanguageOpen(false);
                        }}
                        className={`block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
  darkMode
    ? "text-slate-200 hover:bg-white/10"
    : "text-black/75 hover:bg-black/[0.05]"
}`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className={`my-2 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold ${
  darkMode
    ? "border-white/10 bg-[#1e293b] text-white"
    : "border-black/10 bg-white text-black"
}`}
                aria-label={darkMode ? t.nav.lightMode : t.nav.darkMode}
              >
                <span>{darkMode ? t.nav.lightMode : t.nav.darkMode}</span>
              </button>

              <Link
                href="/#faq"
                onClick={closeMenus}
                className={`block py-4 text-base font-bold ${
  darkMode ? "text-slate-300" : "text-black/75"
}`}
              >
                {t.nav.faq}
              </Link>

            </div>

            <Link
              href="/#tools"
              onClick={closeMenus}
              className="mt-3 block rounded-xl bg-[#202124] px-5 py-3 text-center text-sm font-bold text-white"
            >
              {t.nav.getStarted}
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}


function DesktopDropdown({ label, open, onClick, children }: { label: string; open: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <div className="relative">
      <button type="button" onClick={onClick} className={`flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-semibold transition ${open ? "bg-[#202124] text-white" : "text-black/65 hover:bg-black/[0.045] hover:text-[#202124]"}`}>
        {label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && <div className="absolute left-0 top-full z-[120] mt-3 w-[720px] overflow-hidden rounded-2xl border border-[#c9a227]/20 bg-[#fffdf8] p-5 shadow-[0_28px_80px_rgba(32,33,36,0.20)]">{children}</div>}
    </div>
  );
}

function DesktopToolList({ tools }: { tools: Tool[] }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{tools.map((tool) => <ToolLink key={tool.title} tool={tool} />)}</div>;
}

function DesktopAllToolsContent() {
  const { t } = useLanguage();
  return <div className="max-h-[70vh] overflow-y-auto">
    <div className="mb-5 rounded-2xl bg-[#202124] px-5 py-4 text-white"><h2 className="text-lg font-extrabold">{t.nav.allTools}</h2><p className="mt-1 text-xs font-medium text-white/55">{t.home.toolsDescription}</p></div>
    <ToolSection title={t.categories.imageTools} tools={imageTools} />
    <div className="mt-7"><SectionTitle title={t.home.pdf} /><div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
      <ToolColumn title={t.categories.organizePdf} tools={organizeTools}/><ToolColumn title={t.categories.optimizePdf} tools={optimizeTools}/><ToolColumn title={t.categories.convertToPdf} tools={convertToPdfTools}/><ToolColumn title={t.categories.convertFromPdf} tools={convertFromPdfTools}/><ToolColumn title={t.categories.editPdf} tools={editTools}/><ToolColumn title={t.categories.pdfSecurity} tools={securityTools}/><ToolColumn title={t.categories.pdfIntelligence} tools={intelligenceTools}/>
    </div></div>
    <div className="mt-7"><SectionTitle title={t.categories.utilityOther} /><DesktopToolList tools={utilityTools}/></div>
    <div className="mt-7"><SectionTitle title={t.categories.utilityOther} /><DesktopToolList tools={otherTools}/></div>
  </div>;
}

function DesktopPdfContent() {
  const { t } = useLanguage();
  return <div className="grid grid-cols-2 gap-6 sm:grid-cols-3"><ToolColumn title={t.categories.organizePdf} tools={organizeTools}/><ToolColumn title={t.categories.optimizePdf} tools={optimizeTools}/><ToolColumn title={t.categories.editPdf} tools={editTools}/><ToolColumn title={t.categories.pdfSecurity} tools={securityTools}/><ToolColumn title={t.categories.pdfIntelligence} tools={intelligenceTools}/></div>;
}

function DesktopConvertContent() {
  const { t } = useLanguage();
  return <div className="grid grid-cols-2 gap-6"><ToolColumn title={t.categories.convertToPdf} tools={convertToPdfTools}/><ToolColumn title={t.categories.convertFromPdf} tools={convertFromPdfTools}/></div>;
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">

      {title === "Image Tools" ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#202124] text-[#f4d77b] shadow-sm ring-1 ring-black/10">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
            <circle cx="8.5" cy="9" r="1.5" fill="currentColor" stroke="none" />
            <path d="m5.5 17 4.2-4.2 3.2 3.1 2.5-2.5 3.1 3.6" />
          </svg>
        </span>
      ) : null}

      <h2 className="shrink-0 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#9b7818]">
        {title}
      </h2>

      <div className="h-px flex-1 bg-[#c9a227]/25" />

    </div>
  );
}


/* =========================================================
   IMAGE TOOL SECTION
========================================================= */

function ToolSection({ title, tools }: { title: string; tools: Tool[] }) {
  return (
    <section>

      <SectionTitle title={title} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {tools.map((tool) => (
          <ToolLink
            key={tool.title}
            tool={tool}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   TOOL COLUMN
========================================================= */

function ToolColumn({ title, tools }: { title: string; tools: Tool[] }) {
  return (
    <div>

      <h3 className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-black/40">
        {title}
      </h3>

      <div className="space-y-1">

        {tools.map((tool) => (
          <ToolLink
            key={tool.title}
            tool={tool}
            compact
          />
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   TOOL LINK
========================================================= */

function ToolLink({
  tool,
  compact = false,
}: {
  tool: Tool;
    compact?: boolean;
}) {
  return (
    <Link href={tool.link}
      onClick={(event) => { event.preventDefault(); window.location.assign(tool.link); }}
      title={tool.title}
      className={`group flex items-center gap-2 rounded-lg border border-transparent transition hover:border-[#c9a227]/25 hover:bg-[#fff9e8] hover:shadow-sm ${
        compact
          ? "px-1.5 py-1.5"
          : "px-2.5 py-2"
      }`}
    >

      <ToolIcon
        type={tool.icon}
        color={tool.color}
      />

      <span
        className={`min-w-0 truncate font-semibold text-[#202124] ${
          compact
            ? "text-[11px]"
            : "text-[12px]"
        }`}
      >
        {tool.title}
      </span>

    </Link>
  );
}


/* =========================================================
   MOBILE CATEGORY
========================================================= */

function MobileCategory({
  title,
  tools,
  }: {
  title: string;
  tools: Tool[];
  }) {
  return (
    <section className="mb-5 last:mb-0">

      <h3 className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-black/40">
        {title}
      </h3>

      <div className="overflow-hidden rounded-xl bg-white">

        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.link}
            onClick={(event) => { event.preventDefault(); window.location.assign(tool.link); }}
            className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3 last:border-b-0"
          >

            <ToolIcon
              type={tool.icon}
              color={tool.color}
            />

            <span className="truncate text-[13px] font-bold text-[#202124]">
              {tool.title}
            </span>

            <span className="ml-auto text-black/25">
              ?
            </span>

          </Link>
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   TOOL ICON
========================================================= */

function ToolIcon({
  type,
  color,
}: {
  type: IconType;
  color: IconColor;
}) {
  const colors: Record<IconColor, string> = {
    red: "bg-red-100 text-red-500",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-500",
  };

  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${colors[color]}`}
    >
      <IconShape type={type} />
    </span>
  );
}


/* =========================================================
   SVG ICON SHAPES
========================================================= */

function IconShape({
  type,
}: {
  type: IconType;
}) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "word":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8" />
          <path d="M8 11h3" />
          <path d="M8 15h4" />
          <text
            x="13"
            y="17"
            fontSize="7"
            fontWeight="700"
            fill="currentColor"
            stroke="none"
          >
            W
          </text>
        </svg>
      );

    case "powerpoint":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <text
            x="7"
            y="16"
            fontSize="9"
            fontWeight="800"
            fill="currentColor"
            stroke="none"
          >
            P
          </text>
        </svg>
      );

    case "excel":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 9l6 6M15 9l-6 6" />
          <text
            x="6"
            y="8"
            fontSize="6"
            fontWeight="800"
            fill="currentColor"
            stroke="none"
          >
            X
          </text>
        </svg>
      );

    case "jpg":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M7 16l3-4 2 2 2-3 3 5" />
          <circle cx="15.5" cy="8" r="1.2" />
        </svg>
      );

    case "compress":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1" />
          <path d="M3 8h4M3 12h4M3 16h4" />
          <path d="M21 8h-4M21 12h-4M21 16h-4" />
          <path d="m6 6 2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" />
        </svg>
      );

    case "merge":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="9" height="11" rx="1" />
          <rect x="11" y="8" width="9" height="11" rx="1" />
          <path d="M8 8v5M6 11h4" />
        </svg>
      );

    case "split":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M12 4v16" />
          <path d="m8 9 2 2-2 2M16 9l-2 2 2 2" />
        </svg>
      );

    case "organize":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );

    case "scan":
      return (
        <svg {...common}>
          <path d="M5 8V5h3M16 5h3v3M19 16v3h-3M8 19H5v-3" />
          <path d="M7 12h10" />
        </svg>
      );

    case "repair":
      return (
        <svg {...common}>
          <path d="M14 6a4 4 0 0 0-5 5l-5 5a2 2 0 0 0 3 3l5-5a4 4 0 0 0 5-5l-3 3-3-3z" />
        </svg>
      );

    case "ocr":
      return (
        <svg {...common}>
          <path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3" />
          <path d="M8 9h8M8 12h8M8 15h5" />
        </svg>
      );

    case "html":
      return (
        <svg {...common}>
          <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" />
        </svg>
      );

    case "pdfa":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <text
            x="7"
            y="16"
            fontSize="8"
            fontWeight="800"
            fill="currentColor"
            stroke="none"
          >
            A
          </text>
        </svg>
      );

    case "rotate":
      return (
        <svg {...common}>
          <path d="M5 10a7 7 0 0 1 12-4l2 2" />
          <path d="M19 4v5h-5" />
          <path d="M19 14a7 7 0 0 1-12 4l-2-2" />
          <path d="M5 20v-5h5" />
        </svg>
      );

    case "numbers":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h8" />
          <circle cx="6" cy="8" r=".5" fill="currentColor" />
          <circle cx="6" cy="12" r=".5" fill="currentColor" />
          <circle cx="6" cy="16" r=".5" fill="currentColor" />
        </svg>
      );

    case "watermark":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 16l8-8" />
          <path d="M7 18l3-1M17 7l1-3" />
        </svg>
      );

    case "crop":
      return (
        <svg {...common}>
          <path d="M8 3v13a5 5 0 0 0 5 5h8" />
          <path d="M3 8h13a5 5 0 0 1 5 5v8" />
        </svg>
      );

    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20l4-1 10-10-3-3L5 16z" />
          <path d="m13 7 3 3" />
        </svg>
      );

    case "forms":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="7" y="7" width="3" height="3" />
          <path d="M13 8h4M7 14h3M13 14h4M7 17h10" />
        </svg>
      );

    case "unlock":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M9 10V7a4 4 0 0 1 7-2" />
        </svg>
      );

    case "protect":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case "sign":
      return (
        <svg {...common}>
          <path d="M5 18c3-6 5-10 7-10 1 0 1 2-1 4-2 3-4 5-6 4" />
          <path d="M13 16c2-3 4-4 5-3 1 1-1 3-3 4h5" />
        </svg>
      );

    case "redact":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M7 10h10M7 14h7" />
        </svg>
      );

    case "compare":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="6" height="14" rx="1" />
          <rect x="14" y="5" width="6" height="14" rx="1" />
          <path d="M10 9h4M10 15h4" />
        </svg>
      );

    case "ai":
      return (
        <svg {...common}>
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
          <path d="M18 16l.7 2.3L21 19l-2.3.7L18 22l-.7-2.3L15 19l2.3-.7z" />
        </svg>
      );

    case "translate":
      return (
        <svg {...common}>
          <path d="M4 5h8M8 5v2c0 4-2 7-5 9M6 11c1 1 3 3 5 4" />
          <path d="M14 7h6M17 7c0 5 2 8 4 10M15 17h5" />
        </svg>
      );

    case "markdown":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M6 15v-5l3 3 3-3v5M15 13h3M17 11v4" />
        </svg>
      );

    case "converter":
      return (
        <svg {...common}>
          <path d="M5 8h11l-3-3M19 16H8l3 3" />
        </svg>
      );

    case "resize":
      return (
        <svg {...common}>
          <path d="M4 9V5h4M20 15v4h-4M5 19l5-5M19 5l-5 5" />
        </svg>
      );

    case "enhance":
      return (
        <svg {...common}>
          <path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z" />
        </svg>
      );

    case "background":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m6 17 4-4 3 3 2-2 3 3" />
        </svg>
      );

    case "metadata":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20a7 7 0 0 1 14 0" />
          <path d="M19 5v4M17 7h4" />
        </svg>
      );

    case "passport":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8 17c1-2 2.5-3 4-3s3 1 4 3" />
        </svg>
      );

    case "batch":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="10" height="7" rx="1" />
          <rect x="10" y="12" width="10" height="7" rx="1" />
        </svg>
      );

    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="15" height="12" rx="2" />
          <path d="M18 10l4-2v8l-4-2z" />
        </svg>
      );
    case "qr":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <path d="M14 14h2v2h-2zM18 14h2M18 18h2M14 18v2" />
        </svg>
      );

    case "image":
    default:
      return (
        <svg
          {...common}
          stroke="none"
          aria-hidden="true"
        >
          <rect x="3.5" y="4" width="17" height="16" rx="2.5" fill="currentColor" />
          <circle cx="8.5" cy="9" r="1.6" fill="white" />
          <path
            d="m5.5 17 4.2-4.2 3.2 3.1 2.5-2.5 3.1 3.6H5.5Z"
            fill="white"
          />
        </svg>
      );
  }
}


