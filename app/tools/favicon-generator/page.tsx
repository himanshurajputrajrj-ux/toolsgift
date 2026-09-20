import type { Metadata } from "next";
import Link from "next/link";
import FaviconGenerator from "@/app/components/FaviconGenerator";
export const metadata: Metadata = {
  title: "Favicon Generator Online - Create Favicons from Images",
  description:
    "Create favicon images online from PNG, JPG, WebP or SVG files with ToolsGift. Generate multiple favicon sizes for websites and apps for free.",
  keywords: [
    "favicon generator",
    "favicon generator online",
    "create favicon",
    "favicon maker",
    "favicon creator",
    "website favicon generator",
    "favicon from image",
    "png to favicon",
    "jpg to favicon",
    "free favicon generator",
  ],
  alternates: {
    canonical: "/tools/favicon-generator",
  },
  openGraph: {
    title: "Favicon Generator Online - Create Favicons | ToolsGift",
    description:
      "Create multiple favicon sizes from an image with this free browser-based favicon generator.",
    url: "/tools/favicon-generator",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Favicon Generator",
  url: "https://www.toolsgift.com/tools/favicon-generator",
  description:
    "Create multiple favicon sizes from PNG, JPG, WebP or SVG images online.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function FaviconGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            ToolsGift
          </Link>
          <span className="mx-2">/</span>
          <span>Favicon Generator</span>
        </nav>
        <section className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            IMAGE TOOL
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Favicon Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Create favicon images in multiple sizes from PNG, JPG, WebP or SVG
            files. Fast, free and processed directly in your browser.
          </p>
        </section>
        <FaviconGenerator />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </div>
    </main>
  );
}
