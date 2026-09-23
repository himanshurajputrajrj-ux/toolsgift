"use client";

import { useMemo, useState } from "react";
import SiteStructuredData from "./components/SiteStructuredData";

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

const tools: Array<{
  icon: IconType;
  title: string;
  description: string;
  link: string;
  category: string;
}> = [
  // Image Tools
  {
    icon: "compress",
    title: "Image Compressor",
    description:
      "Reduce image file size while maintaining excellent quality.",
    link: "/tools/compressor",
    category: "Image",
  },
  {
    icon: "converter",
    title: "Favicon Generator",
    description:
      "Create favicon images in multiple sizes from PNG, JPG, WebP or SVG files.",
    link: "/tools/favicon-generator",
    category: "Image",
  },  {
    icon: "converter",
    title: "QR Code Generator",
    description:
      "Create QR codes from URLs, text and other information instantly.",
    link: "/tools/qr-code-generator",
    category: "Generator",
  },
  {
    icon: "converter",
    title: "Unit Converter",
    description:
      "Convert length, weight and temperature units instantly with an easy online converter.",
    link: "/tools/unit-converter",
    category: "Utility",
  },
  {
    icon: "converter",
    title: "Percentage Calculator",
    description:
      "Calculate a percentage of any number quickly and easily.",
    link: "/tools/percentage-calculator",
    category: "Calculator",
  },
  {
    icon: "converter",
    title: "Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case or sentence case instantly.",
    link: "/tools/case-converter",
    category: "Text",
  },
  {
    icon: "converter",
    title: "Character Counter",
    description:
      "Count characters, spaces, words, sentences and paragraphs instantly.",
    link: "/tools/character-counter",
    category: "Text",  },  {
    icon: "converter",
    title: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs and lines instantly.",
    link: "/tools/word-counter",
    category: "Text",
  },
  {
    icon: "converter",
    title: "HEIC to JPG",
    description:
      "Convert HEIC and HEIF images to JPG online for free.",
    link: "/tools/heic-to-jpg",
    category: "Image",
  },
  {
    icon: "compress",
    title: "Compress Image to KB",
    description:
      "Compress images to 20KB, 50KB, 100KB, 200KB or a custom target size.",
    link: "/tools/compress-image-to-kb",
    category: "Image",
  },
  {
    icon: "converter",
    title: "Image to Text",
    description:
      "Extract text from JPG, PNG, WebP and other images with browser-based OCR.",
    link: "/tools/image-to-text",
    category: "Image",
  },
  {
    icon: "converter",
    title: "Image Converter",
    description:
      "Convert JPG, PNG, WebP and other popular image formats.",
    link: "/tools/converter",
    category: "Image",
  },
  {
    icon: "resize",
    title: "Image Resizer",
    description:
      "Resize images to your exact dimensions in seconds.",
    link: "/tools/resizer",
    category: "Image",
  },
  {
    icon: "crop",
    title: "Image Cropper",
    description:
      "Crop your images quickly with precise dimensions.",
    link: "/tools/cropper",
    category: "Image",
  },
  {
    icon: "pdfa",
    title: "Image to PDF",
    description:
      "Turn one or multiple images into a PDF document.",
    link: "/tools/image-to-pdf",
    category: "Image",
  },
  {
    icon: "converter",
    title: "WebP Converter",
    description:
      "Convert images to the fast and efficient WebP format.",
    link: "/tools/webp-converter",
    category: "Image",
  },
  {
    icon: "rotate",
    title: "Image Rotator",
    description:
      "Rotate and straighten your images with ease.",
    link: "/tools/rotator",
    category: "Image",
  },
  {
    icon: "enhance",
    title: "Image Enhancer",
    description:
      "Improve image clarity and visual quality.",
    link: "/tools/enhancer",
    category: "Image",
  },
  {
    icon: "background",
    title: "Background Remover",
    description:
      "Remove image backgrounds and replace them with professional colors.",
    link: "/tools/background-remover",
    category: "Image",
  },
  {
    icon: "metadata",
    title: "Image Metadata Tool",
    description:
      "View image metadata, inspect EXIF information, remove metadata and download a clean image.",
    link: "/tools/image-metadata",
    category: "Image",
  },
  {
    icon: "passport",
    title: "Passport Size Photo",
    description:
      "Create standard passport-size photos and printable photo sheets.",
    link: "/tools/passport-photo",
    category: "Image",
  },
  {
    icon: "batch",
    title: "Batch Converter",
    description:
      "Process multiple images together in one workflow.",
    link: "/tools/batch-converter",
    category: "Image",
  },
  {
    icon: "word",
    title: "Image to Word",
    description:
      "Convert one or multiple images into a Word document.",
    link: "/tools/image-to-word",
    category: "Image",
  },
  {
    icon: "batch",
    title: "Word to Image",
    description:
      "Convert your Word document into an image quickly.",
    link: "/tools/word-to-image",
    category: "Image",
  },

  // PDF Tools
  {
    icon: "merge",
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one document.",
    link: "/tools/pdf-merger",
    category: "PDF",
  },
  {
    icon: "split",
    title: "Split PDF",
    description:
      "Split a PDF into separate documents quickly and easily.",
    link: "/tools/pdf-splitter",
    category: "PDF",
  },
  {
    icon: "compress",
    title: "Compress PDF",
    description:
      "Reduce PDF file size while keeping your documents easy to use.",
    link: "/tools/pdf-compressor",
    category: "PDF",
  },
  {
    icon: "word",
    title: "PDF to Word",
    description:
      "Convert PDF files into editable Word documents.",
    link: "/tools/pdf-to-word",
    category: "PDF",
  },
  {
    icon: "batch",
    title: "PDF to PowerPoint",
    description:
      "Convert PDF files into PowerPoint presentations.",
    link: "/tools/pdf-to-powerpoint",
    category: "PDF",
  },
  {
    icon: "excel",
    title: "PDF to Excel",
    description:
      "Convert PDF files into Excel spreadsheets.",
    link: "/tools/pdf-to-excel",
    category: "PDF",
  },
  {
    icon: "word",
    title: "Word to PDF",
    description:
      "Convert Word documents into PDF files.",
    link: "/tools/word-to-pdf",
    category: "PDF",
  },
  {
    icon: "batch",
    title: "PowerPoint to PDF",
    description:
      "Convert PowerPoint presentations into PDF files.",
    link: "/tools/powerpoint-to-pdf",
    category: "PDF",
  },
  {
    icon: "excel",
    title: "Excel to PDF",
    description:
      "Convert Excel spreadsheets into PDF files.",
    link: "/tools/excel-to-pdf",
    category: "PDF",
  },
  {
    icon: "edit",
    title: "PDF Editor",
    description:
      "Add text to your PDF pages and edit your documents.",
    link: "/tools/pdf-editor",
    category: "PDF",
  },
  {
    icon: "jpg",
    title: "PDF to JPG",
    description:
      "Convert PDF pages into JPG images.",
    link: "/tools/pdf-to-jpg",
    category: "PDF",
  },
  {
    icon: "sign",
    title: "Sign PDF",
    description:
      "Add your signature to PDF documents.",
    link: "/tools/pdf-signer",
    category: "PDF",
  },
  {
    icon: "converter",
    title: "PDF Watermark",
    description:
      "Add a custom watermark to every page of your PDF.",
    link: "/tools/pdf-watermark",
    category: "PDF",
  },
  {
    icon: "rotate",
    title: "Rotate PDF",
    description:
      "Rotate PDF pages to the correct orientation.",
    link: "/tools/pdf-rotator",
    category: "PDF",
  },
  {
    icon: "html",
    title: "HTML to PDF",
    description:
      "Convert HTML content into a PDF document.",
    link: "/tools/html-to-pdf",
    category: "PDF",
  },
  {
    icon: "unlock",
    title: "Unlock PDF",
    description:
      "Remove PDF restrictions from documents you are authorized to edit.",
    link: "/tools/pdf-unlocker",
    category: "PDF",
  },
  {
    icon: "protect",
    title: "Protect PDF",
    description:
      "Add protection settings to your PDF documents.",
    link: "/tools/pdf-protector",
    category: "PDF",
  },
  {
    icon: "organize",
    title: "Organize PDF",
    description:
      "Reorder, organize, and combine PDF files.",
    link: "/tools/pdf-organizer",
    category: "PDF",
  },
  {
    icon: "pdfa",
    title: "PDF to PDF/A",
    description:
      "Prepare PDF documents for long-term archiving.",
    link: "/tools/pdf-to-pdfa",
    category: "PDF",
  },
  {
    icon: "repair",
    title: "Repair PDF",
    description:
      "Try to repair PDF files with minor structural issues.",
    link: "/tools/pdf-repair",
    category: "PDF",
  },
  {
    icon: "numbers",
    title: "Add PDF Page Numbers",
    description:
      "Add page numbers to your PDF documents.",
    link: "/tools/pdf-page-numbers",
    category: "PDF",
  },
  {
    icon: "batch",
    title: "Scan to PDF",
    description:
      "Convert scanned images into a PDF document.",
    link: "/tools/scan-to-pdf",
    category: "PDF",
  },
  {
    icon: "ocr",
    title: "OCR PDF",
    description:
      "Extract searchable text from scanned PDF documents.",
    link: "/tools/ocr-pdf",
    category: "PDF",
  },
  {
    icon: "compare",
    title: "Compare PDF",
    description:
      "Compare two PDF documents and identify basic differences.",
    link: "/tools/pdf-comparer",
    category: "PDF",
  },
  {
    icon: "redact",
    title: "Redact PDF",
    description:
      "Hide sensitive information in PDF documents.",
    link: "/tools/pdf-redactor",
    category: "PDF",
  },
  {
    icon: "crop",
    title: "Crop PDF",
    description:
      "Crop PDF pages and remove unwanted margins.",
    link: "/tools/pdf-cropper",
    category: "PDF",
  },
  {
    icon: "forms",
    title: "PDF Forms",
    description:
      "Fill PDF form fields and add information to documents.",
    link: "/tools/pdf-forms",
    category: "PDF",
  },
  {
    icon: "enhance",
    title: "PDF Summarizer",
    description:
      "Summarize PDF documents and understand key content.",
    link: "/tools/pdf-summarizer",
    category: "PDF",
  },
  {
    icon: "translate",
    title: "PDF Translator",
    description:
      "Translate PDF documents into your preferred language.",
    link: "/tools/pdf-translator",
    category: "PDF",
  },
  {
    icon: "markdown",
    title: "PDF to Markdown",
    description:
      "Convert PDF documents into Markdown files.",
    link: "/tools/pdf-to-markdown",
    category: "PDF",
  },

  // Other Tools
  {
    icon: "pdfa",
    title: "Social Media QR Card",
    description:
      "Create one QR code for WhatsApp, Instagram, Facebook, X, YouTube and other social links.",
    link: "/tools/social-qr-card",
    category: "Other",
  },
  {
    icon: "video",
    title: "Video → Link",
    description:
      "Upload a video and create a shareable link with an expiry time.",
    link: "/tools/video-to-link",
    category: "Other",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      let matchesCategory = true;

      if (activeCategory === "Images") {
        matchesCategory =
          tool.category === "Image" ||
          tool.title.toLowerCase().includes("image") ||
          tool.title.toLowerCase().includes("jpg") ||
          tool.title.toLowerCase().includes("webp") ||
          tool.title.toLowerCase().includes("heic");
      }

      if (activeCategory === "PDF") {
        matchesCategory =
          tool.category === "PDF" ||
          tool.title.toLowerCase().includes("pdf");
      }

      if (activeCategory === "Convert") {
        const title = tool.title.toLowerCase();
        matchesCategory =
          title.includes("convert") ||
          title.includes(" to ") ||
          title.includes("converter") ||
          title.includes("heic to") ||
          title.includes("image to") ||
          title.includes("word to") ||
          title.includes("pdf to") ||
          title.includes("html to");
      }

      if (activeCategory === "Compress") {
        matchesCategory = tool.title.toLowerCase().includes("compress");
      }

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#F8F5ED] text-[#202124]">
      <SiteStructuredData />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#F8F5ED]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,39,0.13),transparent_48%)]" />
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 text-center sm:px-8 md:pb-20 md:pt-28">
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Everything you need to
            <span className="block font-normal">work with your files.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
            Convert, compress, resize, edit and manage images, PDFs and
            everyday files with simple online tools.
          </p>

          <div className="mx-auto mt-9 max-w-2xl">
            <label className="sr-only" htmlFor="tool-search">
              Search tools
            </label>

            <div className="flex items-center rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_12px_40px_rgba(32,33,36,0.08)] transition focus-within:border-[#C9A227]/60 focus-within:shadow-[0_16px_45px_rgba(32,33,36,0.12)]">
              <span className="mr-3 text-xl text-black/35" aria-hidden="true">
                ⌕
              </span>

              <input
                id="tool-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools, PDF, image, compress, convert..."
                className="w-full bg-transparent text-base outline-none placeholder:text-black/40"
                aria-label="Search tools"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="ml-3 rounded-full px-2 text-lg text-black/35 transition hover:bg-black/5 hover:text-black"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="bg-white px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-black/[0.08] pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">
                Tools
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Find the tool you need.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 sm:text-base">
                Browse the collection or search by what you want to do.
              </p>
            </div>

            <p className="text-sm font-medium text-black/45">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"}
            </p>
          </div>

          {/* Categories */}
          <div className="mt-7 flex gap-2 overflow-x-auto pb-1">
            {["All", "Images", "PDF", "Convert", "Compress"].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category
                      ? "border-[#202124] bg-[#202124] text-white"
                      : "border-black/10 bg-white text-black/60 hover:border-black/20 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div className="mt-9">
            {filteredTools.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.title}
                    href={tool.link}
                    className="group relative flex min-h-[215px] flex-col overflow-hidden rounded-2xl border border-black/[0.09] bg-white p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#C9A227]/50 hover:shadow-[0_16px_40px_rgba(32,33,36,0.10)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <ToolIcon
                        type={tool.icon}
                        color={getIconColor(tool)}
                      />

                      <span className="rounded-full bg-[#F8F5ED] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-bold tracking-tight">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      {tool.description}
                    </p>

                    <div className="mt-auto pt-5 text-sm font-semibold text-black/70 transition group-hover:translate-x-1 group-hover:text-black">
                      Open tool <span aria-hidden="true">→</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-black/[0.08] bg-[#F8F5ED] px-6 py-16 text-center">
                <div className="text-3xl text-black/35" aria-hidden="true">
                  ⌕
                </div>

                <h3 className="mt-3 text-xl font-bold">No tools found</h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/55">
                  Try a different search term or choose another category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-[#202124] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C9A227] hover:text-[#202124]"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust / Product statement */}
      <section className="border-t border-black/[0.06] bg-[#F8F5ED] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">
            ToolsGift
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Useful tools without the unnecessary complexity.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
            ToolsGift brings everyday file, document and utility tools
            together in one clean place, so you can get the task done without
            jumping between different websites.
          </p>
        </div>
      </section>
    </main>
  );
}


function getIconColor(tool: {
  title: string;
  category: string;
}): IconColor {
  const title = tool.title.toLowerCase();

  if (
    title.includes("compress") ||
    title.includes("repair") ||
    title.includes("ocr")
  ) {
    return "green";
  }

  if (
    title.includes("word")
  ) {
    return "blue";
  }

  if (
    title.includes("powerpoint")
  ) {
    return "red";
  }

  if (
    title.includes("excel")
  ) {
    return "green";
  }

  if (
    title.includes("jpg") ||
    title.includes("html") ||
    title.includes("webp")
  ) {
    return "yellow";
  }

  if (
    title.includes("security") ||
    title.includes("unlock") ||
    title.includes("protect") ||
    title.includes("sign") ||
    title.includes("compare") ||
    title.includes("background") ||
    title.includes("metadata") ||
    title.includes("passport") ||
    title.includes("qr")
  ) {
    return "blue";
  }

  if (
    title.includes("editor") ||
    title.includes("rotate") ||
    title.includes("watermark") ||
    title.includes("crop") ||
    title.includes("forms") ||
    title.includes("redact") ||
    title.includes("page numbers") ||
    title.includes("enhancer")
  ) {
    return "purple";
  }

  if (
    title.includes("merge") ||
    title.includes("split") ||
    title.includes("organize") ||
    title.includes("scan")
  ) {
    return "red";
  }

  if (
    title.includes("summarizer") ||
    title.includes("translator") ||
    title.includes("markdown")
  ) {
    return "purple";
  }

  return tool.category === "PDF" ? "blue" : "yellow";
}

type IconColor =
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "purple"
  | "orange";

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
    yellow: "bg-[#F3E7B3] text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-500",
  };

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
    >
      <IconShape type={type} />
    </div>
  );
}

function IconShape({ type }: { type: IconType }) {
  const common = {
    width: 25,
    height: 25,
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
          <path d="M8 7h8M8 11h3M8 15h4" />
          <text x="13" y="18" fontSize="7" fontWeight="800" fill="currentColor" stroke="none">W</text>
        </svg>
      );

    case "powerpoint":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <text x="7" y="17" fontSize="9" fontWeight="800" fill="currentColor" stroke="none">P</text>
        </svg>
      );

    case "excel":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 9l6 6M15 9l-6 6" />
          <text x="6" y="8" fontSize="6" fontWeight="800" fill="currentColor" stroke="none">X</text>
        </svg>
      );

    case "jpg":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="m6 17 4-4 3 3 2-2 3 3" />
          <circle cx="15.5" cy="8" r="1.2" />
        </svg>
      );

    case "compress":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1" />
          <path d="M3 8h4M3 12h4M3 16h4M21 8h-4M21 12h-4M21 16h-4" />
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
          <path d="M12 4v16M8 9l2 2-2 2M16 9l-2 2 2 2" />
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

    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="15" height="12" rx="2" />
          <path d="M18 10l4-2v8l-4-2z" />
        </svg>
      );
    case "pdfa":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <text x="7" y="17" fontSize="8" fontWeight="800" fill="currentColor" stroke="none">A</text>
        </svg>
      );

    case "rotate":
      return (
        <svg {...common}>
          <path d="M5 10a7 7 0 0 1 12-4l2 2M19 4v5h-5" />
          <path d="M19 14a7 7 0 0 1-12 4l-2-2M5 20v-5h5" />
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
          <path d="M8 16l8-8M7 18l3-1M17 7l1-3" />
        </svg>
      );

    case "crop":
      return (
        <svg {...common}>
          <path d="M8 3v13a5 5 0 0 0 5 5h8M3 8h13a5 5 0 0 1 5 5v8" />
        </svg>
      );

    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20l4-1 10-10-3-3L5 16zM13 7l3 3" />
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
          <path d="M5 18c3-6 5-10 7-10 1 0 1 2-1 4-2 3-4 5-6 4M13 16c2-3 4-4 5-3 1 1-1 3-3 4h5" />
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
    case "enhance":
      return (
        <svg {...common}>
          <path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z" />
        </svg>
      );

    case "translate":
      return (
        <svg {...common}>
          <path d="M4 5h8M8 5v2c0 4-2 7-5 9M6 11c1 1 3 3 5 4M14 7h6M17 7c0 5 2 8 4 10M15 17h5" />
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
          <path d="M5 20a7 7 0 0 1 14 0M19 5v4M17 7h4" />
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
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="9" cy="9" r="1.5" />
          <path d="m6 17 4-4 3 3 2-2 3 3" />
        </svg>
      );
  }
}

