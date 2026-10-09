import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const imageTools = [
  { name: "Image Compressor", href: "/tools/compressor", description: "Reduce image size while keeping quality." },
  { name: "Image Converter", href: "/tools/converter", description: "Convert JPG, PNG, WebP and more." },
  { name: "Image Resizer", href: "/tools/resizer", description: "Resize images to exact dimensions." },
  { name: "Image Cropper", href: "/tools/cropper", description: "Crop images quickly and precisely." },
  { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert HEIC/HEIF images to JPG for free." },
  { name: "Compress Image to KB", href: "/tools/compress-image-to-kb", description: "Compress images to a target KB size." },
  { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert one or more images to a PDF." },
  { name: "WebP Converter", href: "/tools/webp-converter", description: "Convert images to and from WebP." },
  { name: "Image Rotator", href: "/tools/rotator", description: "Rotate images to the correct orientation." },
  { name: "Image Enhancer", href: "/tools/enhancer", description: "Improve clarity and image quality." },
  { name: "Background Remover", href: "/tools/background-remover", description: "Remove image backgrounds online." },
  { name: "Image Metadata Tool", href: "/tools/image-metadata", description: "View, inspect or clean image metadata." },
  { name: "Passport Size Photo", href: "/tools/passport-photo", description: "Create standard passport size photos." },
  { name: "Batch Converter", href: "/tools/batch-converter", description: "Convert multiple images in one batch." },
  { name: "Image to Word", href: "/tools/image-to-word", description: "Convert images to an editable Word document." },
  { name: "Word to Image", href: "/tools/word-to-image", description: "Convert Word pages into images." },
  { name: "Image to Text", href: "/tools/image-to-text", description: "Extract text from images with OCR." },
];

export const metadata: Metadata = {
  title: "Image Tools Online | Free Image Editing & Conversion Tools",
  description: "Free collection of online image tools for compressing, converting, resizing, cropping, enhancing, removing backgrounds and more — all in your browser.",
  alternates: {
    canonical: "/image-tools",
  },
  openGraph: {
    title: "Image Tools Online | ToolsGift",
    description: "Compress, convert, resize, crop, enhance and work with images using free online image tools.",
    url: "/image-tools",
    siteName: "ToolsGift",
    type: "website",
    images: [
      {
        url: "/toolsgift-og.jpg",
        width: 1200,
        height: 628,
        alt: "Image Tools Online | ToolsGift",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Tools Online | ToolsGift",
    description: "Compress, convert, resize, crop, enhance and work with images using free online image tools.",
    images: ["/toolsgift-og.jpg"],
  },
};

export default function ImageToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Tools" />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">ToolsGift</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Image Tools Online
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            A collection of free online image tools to compress, convert, resize, crop, rotate, enhance, remove backgrounds and extract text — all working in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageTools.map((tool) => (
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
