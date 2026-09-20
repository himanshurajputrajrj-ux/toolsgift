import type { Metadata } from "next";
import Link from "next/link";
import QRCodeGenerator from "@/app/components/QRCodeGenerator";
export const metadata: Metadata = {
  title: "QR Code Generator Online - Create QR Codes",
  description:
    "Create QR codes online from URLs, text and other information with the free ToolsGift QR Code Generator.",
  keywords: [
    "QR code generator",
    "QR code generator online",
    "create QR code",
    "QR code maker",
    "free QR code generator",
    "URL QR code generator",
    "text QR code generator",
  ],
  alternates: {
    canonical: "/tools/qr-code-generator",
  },
  openGraph: {
    title: "QR Code Generator Online | ToolsGift",
    description:
      "Create downloadable QR codes from URLs and text with the free ToolsGift QR Code Generator.",
    url: "/tools/qr-code-generator",
    type: "website",
  },
};
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What can I use a QR code for?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "You can create QR codes for website URLs, text, contact information and other data that can be encoded as text.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a QR code for a website URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Enter the complete website URL and the QR code will be generated automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What format can I download?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The generated QR code can be downloaded as a PNG image.",
      },
    },
    {
      "@type": "Question",
      name: "Is this QR Code Generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift QR Code Generator is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. QR code generation happens directly in your browser.",
      },
    },
  ],
};
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  url: "https://www.toolsgift.com/tools/qr-code-generator",
  description:
    "Create QR codes from URLs and text with this free online QR code generator.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function QRCodeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-blue-600 dark:text-blue-400"
        >
          <Link href="/" className="hover:underline">
            ToolsGift
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700 dark:text-gray-300">
            QR Code Generator
          </span>
        </nav>
        <header className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            GENERATOR TOOL
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            QR Code Generator Online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Create a QR code from any URL or text and download it as a PNG
            image.
          </p>
        </header>
        <QRCodeGenerator />
      </main>
    </>
  );
}
