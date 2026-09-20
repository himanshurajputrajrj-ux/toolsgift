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
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a favicon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A favicon is a small icon used to identify a website in browser tabs, bookmarks, search results and other places where a site identity is displayed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a favicon from an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PNG, JPG, WebP or SVG image to the Favicon Generator. ToolsGift automatically creates multiple favicon sizes in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use PNG, JPG, WebP and SVG images. The generated favicon files are provided as PNG images.",
      },
    },
    {
      "@type": "Question",
      name: "What favicon sizes does ToolsGift generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ToolsGift generates 16×16, 32×32, 48×48, 180×180, 192×192 and 512×512 PNG favicon sizes.",
      },
    },
    {
      "@type": "Question",
      name: "Is this favicon generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use the ToolsGift Favicon Generator for free in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is my image uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The image is processed directly in your browser, so favicon generation does not require uploading the image to a server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated favicon on my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generated PNG favicon sizes can be used for website icons, app icons and other web projects that support PNG images.",
      },
    },
  ],
};export default function FaviconGeneratorPage() {
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
            __html: JSON.stringify(faqStructuredData),
          }}
        />        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </div>
    </main>
  );
}
