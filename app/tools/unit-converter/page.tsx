import type { Metadata } from "next";
import Link from "next/link";
import UnitConverter from "@/app/components/UnitConverter";
export const metadata: Metadata = {
  title: "Unit Converter Online - Length, Weight & Temperature",
  description:
    "Convert length, weight and temperature units online with the free Unit Converter from ToolsGift.",
  keywords: [
    "unit converter",
    "unit converter online",
    "length converter",
    "weight converter",
    "temperature converter",
    "km to miles",
    "kg to pounds",
    "celsius to fahrenheit",
    "free unit converter",
  ],
  alternates: {
    canonical: "/tools/unit-converter",
  },
  openGraph: {
    title: "Unit Converter Online - Length, Weight & Temperature | ToolsGift",
    description:
      "Convert common length, weight and temperature units instantly with ToolsGift.",
    url: "/tools/unit-converter",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Converter",
  url: "https://www.toolsgift.com/tools/unit-converter",
  description:
    "Convert common length, weight and temperature units online.",
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
      name: "What units can I convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "ToolsGift Unit Converter currently supports common length, weight and temperature units.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Unit Converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The ToolsGift Unit Converter is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Are my values uploaded?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Unit conversion calculations are performed directly in your browser.",
      },
    },
  ],
};
export default function UnitConverterPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-slate-600 dark:text-slate-300"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ToolsGift
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900 dark:text-white">
            Unit Converter
          </li>
        </ol>
      </nav>
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Utility Tool
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Unit Converter
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Convert length, weight and temperature units quickly and accurately
          with this free online unit converter.
        </p>
      </div>
      <UnitConverter />
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Related Tools
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/tools/percentage-calculator"
            className="rounded-xl border border-slate-200 p-4 text-sm font-medium text-blue-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
          >
            Percentage Calculator
          </Link>
          <Link
            href="/tools/word-counter"
            className="rounded-xl border border-slate-200 p-4 text-sm font-medium text-blue-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
          >
            Word Counter
          </Link>
          <Link
            href="/tools/character-counter"
            className="rounded-xl border border-slate-200 p-4 text-sm font-medium text-blue-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
          >
            Character Counter
          </Link>
        </div>
      </section>
    </main>
  );
}