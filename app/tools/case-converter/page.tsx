import type { Metadata } from "next";
import Link from "next/link";
import CaseConverter from "@/app/components/CaseConverter";
export const metadata: Metadata = {
  title: "Case Converter Online - Uppercase, Lowercase & Title Case",
  description:
    "Convert text to uppercase, lowercase, title case or sentence case with the free ToolsGift Case Converter.",
  keywords: [
    "case converter",
    "case converter online",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "text case converter",
    "free case converter",
  ],
  alternates: {
    canonical: "/tools/case-converter",
  },
  openGraph: {
    title: "Case Converter Online - Uppercase & Lowercase | ToolsGift",
    description:
      "Convert text between uppercase, lowercase, title case and sentence case with ToolsGift.",
    url: "/tools/case-converter",
    type: "website",
  },
};
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a case converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A case converter changes text capitalization into formats such as uppercase, lowercase, title case and sentence case.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert text to uppercase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Use the UPPERCASE option to convert the text instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert text to lowercase?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Use the lowercase option to convert all letters to lowercase.",
      },
    },
    {
      "@type": "Question",
      name: "Is this Case Converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift Case Converter is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Text conversion is performed locally in your browser.",
      },
    },
  ],
};
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: "https://www.toolsgift.com/tools/case-converter",
  description:
    "Convert text to uppercase, lowercase, title case and sentence case online.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function CaseConverterPage() {
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
            Case Converter
          </span>
        </nav>
        <header className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            TEXT TOOL
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Case Converter Online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Convert text to uppercase, lowercase, title case or sentence case
            instantly with a fast and simple online case converter.
          </p>
        </header>
        <CaseConverter />
      </main>
    </>
  );
}
