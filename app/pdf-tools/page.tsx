import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const pdfTools = [
  { name: "Merge PDF", href: "/tools/pdf-merger", description: "Combine multiple PDF files into one document." },
  { name: "Split PDF", href: "/tools/pdf-splitter", description: "Split PDF into separate files or pages." },
  { name: "Compress PDF", href: "/tools/pdf-compressor", description: "Reduce PDF file size for easier sharing." },
  { name: "PDF to Word", href: "/tools/pdf-to-word", description: "Convert PDF to editable Word documents." },
  { name: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint", description: "Convert PDF to PowerPoint presentations." },
  { name: "PDF to Excel", href: "/tools/pdf-to-excel", description: "Convert PDF tables to Excel spreadsheets." },
  { name: "Word to PDF", href: "/tools/word-to-pdf", description: "Convert Word documents to PDF files." },
  { name: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf", description: "Convert PowerPoint presentations to PDF." },
  { name: "Excel to PDF", href: "/tools/excel-to-pdf", description: "Convert Excel spreadsheets to PDF." },
  { name: "PDF Editor", href: "/tools/pdf-editor", description: "Edit text and content in your PDF." },
  { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF pages to JPG images." },
  { name: "Sign PDF", href: "/tools/pdf-signer", description: "Add your signature to PDF documents." },
  { name: "PDF Watermark", href: "/tools/pdf-watermark", description: "Add custom watermarks to PDF pages." },
  { name: "Rotate PDF", href: "/tools/pdf-rotator", description: "Rotate pages in your PDF document." },
  { name: "HTML to PDF", href: "/tools/html-to-pdf", description: "Convert HTML content into a PDF document." },
  { name: "Unlock PDF", href: "/tools/pdf-unlocker", description: "Remove PDF restrictions from authorized files." },
  { name: "Protect PDF", href: "/tools/pdf-protector", description: "Add password protection to your PDF." },
  { name: "Organize PDF", href: "/tools/pdf-organizer", description: "Reorder, remove or arrange PDF pages." },
  { name: "PDF to PDF/A", href: "/tools/pdf-to-pdfa", description: "Convert PDF to PDF/A for archiving." },
  { name: "Repair PDF", href: "/tools/pdf-repair", description: "Attempt to repair corrupted PDF files." },
  { name: "Add PDF Page Numbers", href: "/tools/pdf-page-numbers", description: "Add page numbers to your PDF." },
  { name: "Scan to PDF", href: "/tools/scan-to-pdf", description: "Create PDF from scanned images." },
  { name: "OCR PDF", href: "/tools/ocr-pdf", description: "Make scanned PDFs searchable with OCR." },
  { name: "Compare PDF", href: "/tools/pdf-comparer", description: "Compare two PDF files and identify differences." },
  { name: "Redact PDF", href: "/tools/pdf-redactor", description: "Redact sensitive information from PDFs." },
  { name: "Crop PDF", href: "/tools/pdf-cropper", description: "Crop PDF pages to remove unwanted margins." },
  { name: "PDF Forms", href: "/tools/pdf-forms", description: "Fill and work with PDF forms online." },
  { name: "PDF Summarizer", href: "/tools/pdf-summarizer", description: "Generate summaries of PDF documents." },
  { name: "PDF Translator", href: "/tools/pdf-translator", description: "Translate PDF content into different languages." },
  { name: "PDF to Markdown", href: "/tools/pdf-to-markdown", description: "Convert PDF documents to Markdown format." },
  { name: "Shipping Label & Invoice PDF", href: "/tools/shipping-label-pdf", description: "Fit shipping labels and invoices to exact print sizes." },
];

export const metadata: Metadata = {
  title: "PDF Tools Online | Free PDF Merge, Split, Convert & Edit Tools",
  description: "Free collection of online PDF tools to merge, split, compress, convert, edit, sign, protect and optimize PDF files — all in your browser.",
  alternates: {
    canonical: "/pdf-tools",
  },
  openGraph: {
    title: "PDF Tools Online | ToolsGift",
    description: "Merge, split, compress, convert and edit PDFs with free online PDF tools.",
    url: "/pdf-tools",
    siteName: "ToolsGift",
    type: "website",
    images: [
      {
        url: "/toolsgift-og.jpg",
        width: 1200,
        height: 628,
        alt: "PDF Tools Online | ToolsGift",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Tools Online | ToolsGift",
    description: "Merge, split, compress, convert and edit PDFs with free online PDF tools.",
    images: ["/toolsgift-og.jpg"],
  },
};

export default function PdfToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="PDF Tools" />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">ToolsGift</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            PDF Tools Online
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            A collection of free online PDF tools to merge, split, compress, convert, edit, sign, protect, redact and organize PDF files — all working in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pdfTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-[#c9a227]/50 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-900">{tool.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{tool.description}</p>
              <div className="mt-4 text-sm font-semibold text-[#c9a227] transition group-hover:translate-x-1">
                Open tool <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
