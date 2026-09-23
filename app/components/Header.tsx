"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

const allTools: Tool[] = [
  ...imageTools,
  ...organizeTools,
  ...optimizeTools,
  ...convertToPdfTools,
  ...convertFromPdfTools,
  ...editTools,
  ...securityTools,
  ...intelligenceTools,
  ...utilityTools,
  ...otherTools,
];

const allToolCategories = [
  { title: "Image Tools", tools: imageTools },
  { title: "Organize PDF", tools: organizeTools },
  { title: "Optimize PDF", tools: optimizeTools },
  { title: "Convert to PDF", tools: convertToPdfTools },
  { title: "Convert from PDF", tools: convertFromPdfTools },
  { title: "Edit PDF", tools: editTools },
  { title: "PDF Security", tools: securityTools },
  { title: "PDF Intelligence", tools: intelligenceTools },
  { title: "Utility & Other", tools: [...utilityTools, ...otherTools] },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const toolsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("toolsgift-theme");
    // Theme is restored from localStorage after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(savedTheme === "dark");
    setThemeReady(true);
  }, []);

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
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function closeMenus() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  function goToTools() {
    closeMenus();
    window.location.assign("/#tools");
  }

  if (!themeReady) return null;

  const navButton = (label: string, key: string) => (
    <button
      type="button"
      onClick={() => setOpenMenu((value) => (value === key ? null : key))}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
        openMenu === key
          ? darkMode
            ? "bg-white/[0.08] text-white"
            : "bg-black/[0.045] text-[#202124]"
          : darkMode
            ? "text-white/75 hover:bg-white/[0.05] hover:text-white"
            : "text-black/65 hover:bg-black/[0.045] hover:text-[#202124]"
      }`}
      aria-expanded={openMenu === key}
    >
      {label}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
        className={`transition-transform ${openMenu === key ? "rotate-180" : ""}`}
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <header
      ref={toolsRef}
      className={`sticky top-0 z-[100] border-b backdrop-blur-xl transition-colors ${
        darkMode
          ? "border-white/[0.08] bg-[#101827]/95"
          : "border-black/[0.07] bg-[#f8f5ed]/95"
      }`}
    >
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/45 to-transparent ${
          darkMode ? "opacity-70" : ""
        }`}
      />

      <div className="mx-auto flex h-[70px] max-w-7xl items-center px-5 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center tracking-[-0.035em]"
          aria-label="ToolsGift Home"
        >
          <span
            className={`text-[25px] font-black ${
              darkMode ? "text-white" : "text-[#202124]"
            }`}
          >
            Tools
          </span>
          <span
            className={`text-[25px] font-medium ${
              darkMode ? "text-white" : "text-[#202124]"
            }`}
          >
            Gift
          </span>
          <span
            className="ml-1 -mt-3 text-[13px] font-black text-[#c9a227] transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          >
            ✦
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navButton("All Tools", "all")}
          {navButton("Images", "images")}
          {navButton("PDF", "pdf")}
          {navButton("Convert", "convert")}

          <button
            type="button"
            onClick={goToTools}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              darkMode
                ? "text-white/75 hover:bg-white/[0.05] hover:text-white"
                : "text-black/65 hover:bg-black/[0.045] hover:text-[#202124]"
            }`}
          >
            Search
          </button>

          {/* Existing Dark / Light toggle — behavior intentionally preserved */}
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className={`ml-2 flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-3.5 text-sm font-bold shadow-sm transition ${
              darkMode
                ? "border-[#c9a227]/35 bg-[#1e293b] text-[#f4d77b] hover:bg-[#334155]"
                : "border-[#c9a227]/20 bg-white/75 text-[#202124] hover:bg-white"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            {darkMode ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Six-dot secondary menu */}
          <button
            type="button"
            onClick={() => setOpenMenu((value) => (value === "more" ? null : "more"))}
            className={`ml-1 flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              openMenu === "more"
                ? darkMode
                  ? "border-[#c9a227]/50 bg-[#c9a227] text-[#202124]"
                  : "border-[#202124] bg-[#202124] text-white"
                : darkMode
                  ? "border-white/10 bg-white/[0.04] text-white hover:border-[#c9a227]/40 hover:text-[#f4d77b]"
                  : "border-black/10 bg-white/75 text-[#202124] shadow-sm hover:border-[#c9a227]/45 hover:bg-white"
            }`}
            aria-label="More navigation"
            aria-expanded={openMenu === "more"}
            title="More"
          >
            <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} className="h-[4px] w-[4px] rounded-full bg-current" />
              ))}
            </span>
          </button>
        </nav>

        {/* Mobile */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-bold shadow-sm transition ${
              darkMode
                ? "border-[#c9a227]/35 bg-[#1e293b] text-[#f4d77b]"
                : "border-[#c9a227]/20 bg-white/75 text-[#202124]"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition ${
              darkMode
                ? "border-white/10 bg-white/[0.04] text-white"
                : "border-black/10 bg-white/75 text-[#202124]"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={index} className="h-[4px] w-[4px] rounded-full bg-current" />
                ))}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop dropdowns */}
      {openMenu && !["more"].includes(openMenu) && (
        <div
          className={`absolute left-0 right-0 top-full border-b shadow-[0_24px_70px_rgba(32,33,36,0.16)] ${
            darkMode
              ? "border-white/10 bg-[#111a2a]"
              : "border-black/[0.07] bg-[#fffdf8]"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">            {openMenu === "all" && (
              <div>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className={`text-[10px] font-extrabold uppercase tracking-[0.16em] ${darkMode ? "text-[#d8b94e]" : "text-[#9b7818]"}`}>
                      ToolsGift
                    </p>
                    <h2 className={`mt-1 text-xl font-bold ${darkMode ? "text-white" : "text-[#202124]"}`}>
                      All Tools
                    </h2>
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? "text-white/40" : "text-black/40"}`}>
                    {allTools.length} tools
                  </span>
                </div>
                <div className="grid max-h-[62vh] grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {allToolCategories.map((category) => (
                    <div key={category.title}>
                      <MenuHeading title={category.title} darkMode={darkMode} />
                      <div className="space-y-0.5">
                        {category.tools.map((tool) => (
                          <ToolLink key={`${category.title}-${tool.title}`} tool={tool} onSelect={closeMenus} compact darkMode={darkMode} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {openMenu === "images" && (
              <div>
                <MenuIntro title="Image Tools" text="Work with images quickly and easily." darkMode={darkMode} />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {imageTools.map((tool) => (
                    <ToolLink key={tool.title} tool={tool} onSelect={closeMenus} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            )}

            {openMenu === "pdf" && (
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                <ToolColumn title="Organize PDF" tools={organizeTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="Optimize PDF" tools={optimizeTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="Edit PDF" tools={editTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="PDF Security" tools={securityTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="PDF Intelligence" tools={intelligenceTools} onSelect={closeMenus} darkMode={darkMode} />
              </div>
            )}

            {openMenu === "convert" && (
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                <ToolColumn title="Convert to PDF" tools={convertToPdfTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="Convert from PDF" tools={convertFromPdfTools} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="Image Conversion" tools={imageTools.filter((tool) => tool.title.includes("Converter") || tool.title.includes("WebP") || tool.title.includes("HEIC"))} onSelect={closeMenus} darkMode={darkMode} />
                <ToolColumn title="Other Tools" tools={otherTools} onSelect={closeMenus} darkMode={darkMode} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Six-dot secondary menu */}
      {openMenu === "more" && (
        <div
          className={`absolute right-5 top-full mt-3 w-[300px] overflow-hidden rounded-2xl border shadow-[0_24px_70px_rgba(32,33,36,0.18)] sm:right-8 ${
            darkMode
              ? "border-white/10 bg-[#111a2a]"
              : "border-black/[0.07] bg-[#fffdf8]"
          }`}
        >
          <div className="p-3">
            <div className={`rounded-xl px-4 py-3 ${darkMode ? "bg-white/[0.04]" : "bg-[#f8f5ed]"}`}>
              <p className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${darkMode ? "text-[#d8b94e]" : "text-[#9b7818]"}`}>
                ToolsGift
              </p>
              <p className={`mt-1 text-sm font-semibold ${darkMode ? "text-white" : "text-[#202124]"}`}>
                More from ToolsGift
              </p>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1">
              {[
                ["/about", "About"],
                ["/contact", "Contact"],
                ["/privacy", "Privacy"],
                ["/terms", "Terms"],
                ["/cookies", "Cookies"],
                ["/disclaimer", "Disclaimer"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenus}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? "text-white/70 hover:bg-white/[0.06] hover:text-white"
                      : "text-black/65 hover:bg-[#fff9e8] hover:text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className={`mt-2 border-t pt-2 ${darkMode ? "border-white/10" : "border-black/[0.07]"}`}>
              <Link
                href="/#tools"
                onClick={closeMenus}
                className={`block rounded-xl px-3 py-3 text-sm font-semibold ${
                  darkMode
                    ? "text-white/70 hover:bg-white/[0.06] hover:text-white"
                    : "text-black/65 hover:bg-[#fff9e8] hover:text-black"
                }`}
              >
                Search & All Tools →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`absolute left-0 right-0 top-full border-b shadow-[0_24px_60px_rgba(32,33,36,0.16)] md:hidden ${
            darkMode
              ? "border-white/10 bg-[#111a2a]"
              : "border-black/[0.07] bg-[#fffdf8]"
          }`}
        >
          <div className="max-h-[calc(100vh-70px)] overflow-y-auto px-5 py-5">
            <div className="mb-4">
              <p className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${darkMode ? "text-[#d8b94e]" : "text-[#9b7818]"}`}>
                ToolsGift
              </p>
              <h2 className={`mt-1 text-xl font-bold ${darkMode ? "text-white" : "text-[#202124]"}`}>
                Browse tools
              </h2>
            </div>
            <MobileNavButton label="All Tools" open={openMenu === "all"} onClick={() => setOpenMenu(openMenu === "all" ? null : "all")} darkMode={darkMode} />
            {openMenu === "all" && (
              <div className="mt-2 space-y-4">
                {allToolCategories.map((category) => (
                  <MobileCategory key={category.title} title={category.title} tools={category.tools} onSelect={closeMenus} darkMode={darkMode} />
                ))}
              </div>
            )}

            <MobileNavButton label="Images" open={openMenu === "images"} onClick={() => setOpenMenu(openMenu === "images" ? null : "images")} darkMode={darkMode} />
            {openMenu === "images" && (
              <div className="mt-2">
                <MobileCategory title="Image Tools" tools={imageTools} onSelect={closeMenus} darkMode={darkMode} />
              </div>
            )}

            <MobileNavButton label="PDF" open={openMenu === "pdf"} onClick={() => setOpenMenu(openMenu === "pdf" ? null : "pdf")} darkMode={darkMode} />
            {openMenu === "pdf" && (
              <div className="mt-2">
                <MobileCategory title="PDF Tools" tools={[...organizeTools, ...optimizeTools, ...editTools, ...securityTools, ...intelligenceTools]} onSelect={closeMenus} darkMode={darkMode} />
              </div>
            )}

            <MobileNavButton label="Convert" open={openMenu === "convert"} onClick={() => setOpenMenu(openMenu === "convert" ? null : "convert")} darkMode={darkMode} />
            {openMenu === "convert" && (
              <div className="mt-2">
                <MobileCategory title="Convert to PDF" tools={convertToPdfTools} onSelect={closeMenus} darkMode={darkMode} />
                <MobileCategory title="Convert from PDF" tools={convertFromPdfTools} onSelect={closeMenus} darkMode={darkMode} />
              </div>
            )}

            <button
              type="button"
              onClick={goToTools}
              className={`block w-full border-b py-4 text-left text-base font-bold ${darkMode ? "border-white/10 text-white/80" : "border-black/10 text-black/75"}`}
            >
              Search
            </button>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["/about", "About"],
                ["/contact", "Contact"],
                ["/privacy", "Privacy"],
                ["/terms", "Terms"],
                ["/cookies", "Cookies"],
                ["/disclaimer", "Disclaimer"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenus}
                  className={`rounded-xl border px-4 py-3 text-center text-sm font-bold ${
                    darkMode
                      ? "border-white/10 text-white/75"
                      : "border-black/10 text-black/70"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuHeading({
  title,
  darkMode,
}: {
  title: string;
  darkMode: boolean;
}) {
  return (
    <h3
      className={`mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
        darkMode ? "text-white/35" : "text-black/40"
      }`}
    >
      {title}
    </h3>
  );
}

function MenuIntro({
  title,
  text,
  darkMode,
}: {
  title: string;
  text: string;
  darkMode: boolean;
}) {
  return (
    <div className="mb-5">
      <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#202124]"}`}>
        {title}
      </h2>
      <p className={`mt-1 text-sm ${darkMode ? "text-white/50" : "text-black/50"}`}>
        {text}
      </p>
    </div>
  );
}

function MobileNavButton({
  label,
  open,
  onClick,
  darkMode,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
  darkMode: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between border-b py-4 text-base font-bold ${
        darkMode
          ? "border-white/10 text-white"
          : "border-black/10 text-black"
      }`}
    >
      <span>{label}</span>
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className={`transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function MenuColumn({
  title,
  tools,
  darkMode,
  onSelect,
}: {
  title: string;
  tools: Tool[];
  darkMode: boolean;
  onSelect: () => void;
}) {
  return (
    <div>
      <h3 className={`mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] ${darkMode ? "text-white/35" : "text-black/40"}`}>
        {title}
      </h3>
      <div className="space-y-1">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.link}
            onClick={(event) => {
              event.preventDefault();
              onSelect();
              window.location.assign(tool.link);
            }}
            className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition ${
              darkMode
                ? "text-white/75 hover:bg-white/[0.06] hover:text-white"
                : "text-black/65 hover:bg-[#fff9e8] hover:text-black"
            }`}
          >
            <ToolIcon type={tool.icon} color={tool.color} />
            <span className="truncate">{tool.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
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

function ToolSection({
  title,
  tools,
  onSelect,
}: {
  title: string;
  tools: Tool[];
  onSelect: () => void;
}) {
  return (
    <section>

      <SectionTitle title={title} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {tools.map((tool) => (
          <ToolLink
            key={tool.title}
            tool={tool}
            onSelect={onSelect}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   TOOL COLUMN
========================================================= */

function ToolColumn({
  title,
  tools,
  onSelect,
  darkMode = false,
}: {
  title: string;
  tools: Tool[];
  onSelect: () => void;
  darkMode?: boolean;
}) {
  return (
    <div>

      <h3 className={`mb-3 text-[10px] font-extrabold uppercase tracking-[0.12em] ${darkMode ? "text-white/35" : "text-black/40"}`}>
        {title}
      </h3>

      <div className="space-y-1">

        {tools.map((tool) => (
          <ToolLink
            key={tool.title}
            tool={tool}
            onSelect={onSelect}
            compact
            darkMode={darkMode}
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
  onSelect,
  compact = false,
  darkMode = false,
}: {
  tool: Tool;
  onSelect: () => void;
  compact?: boolean;
  darkMode?: boolean;
}) {
  return (
    <Link href={tool.link}
      onClick={(event) => { event.preventDefault(); window.location.assign(tool.link); }}
      title={tool.title}
      className={`group flex items-center gap-2 rounded-lg border border-transparent transition ${darkMode ? "text-white/75 hover:border-white/10 hover:bg-white/[0.05] hover:text-white" : "hover:border-[#c9a227]/25 hover:bg-[#fff9e8] hover:shadow-sm"} ${
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
        className={`min-w-0 truncate font-semibold ${darkMode ? "text-white/75" : "text-[#202124]"} ${
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
  onSelect,
  darkMode = false,
}: {
  title: string;
  tools: Tool[];
  onSelect: () => void;
  darkMode?: boolean;
}) {
  return (
    <section className="mb-5 last:mb-0">

      <h3 className={`mb-2 px-2 text-[10px] font-extrabold uppercase tracking-[0.14em] ${darkMode ? "text-white/35" : "text-black/40"}`}>
        {title}
      </h3>

      <div className={`overflow-hidden rounded-xl ${darkMode ? "bg-white/[0.04]" : "bg-white"}`}>

        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.link}
            onClick={(event) => { event.preventDefault(); onSelect(); window.location.assign(tool.link); }}
            className={`flex items-center gap-3 border-b px-4 py-3 last:border-b-0 ${darkMode ? "border-white/[0.07]" : "border-black/[0.06]"}`}
          >

            <ToolIcon
              type={tool.icon}
              color={tool.color}
            />

            <span className={`truncate text-[13px] font-bold ${darkMode ? "text-white/85" : "text-[#202124]"}`}>
              {tool.title}
            </span>

            <span className={darkMode ? "ml-auto text-white/25" : "ml-auto text-black/25"}>
              →
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














