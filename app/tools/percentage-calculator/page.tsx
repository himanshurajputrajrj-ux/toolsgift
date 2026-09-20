import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculator from "@/app/components/PercentageCalculator";
export const metadata: Metadata = {
  title: "Percentage Calculator Online - Calculate Percentages",
  description:
    "Calculate percentages online with the free ToolsGift Percentage Calculator. Find a percentage of any number instantly.",
  keywords: [
    "percentage calculator",
    "percentage calculator online",
    "percent calculator",
    "calculate percentage",
    "percentage of a number",
    "percentage calculator free",
    "online percentage calculator",
  ],
  alternates: {
    canonical: "/tools/percentage-calculator",
  },
  openGraph: {
    title: "Percentage Calculator Online | ToolsGift",
    description:
      "Calculate a percentage of any number instantly with the free ToolsGift Percentage Calculator.",
    url: "/tools/percentage-calculator",
    type: "website",
  },
};
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate a percentage of a number?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Enter the percentage and the number, then select Calculate. The result is calculated using the percentage divided by 100, multiplied by the number.",
      },
    },
    {
      "@type": "Question",
      name: "What is 20% of 500?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "20% of 500 is 100.",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate decimal percentages?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. You can enter decimal percentages such as 12.5%.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Percentage Calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift Percentage Calculator is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The calculator works in modern desktop and mobile browsers.",
      },
    },
  ],
};
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Percentage Calculator",
  url: "https://www.toolsgift.com/tools/percentage-calculator",
  description:
    "Calculate a percentage of any number with this free online percentage calculator.",
  applicationCategory: "CalculatorApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function PercentageCalculatorPage() {
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
            Percentage Calculator
          </span>
        </nav>
        <header className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            CALCULATOR TOOL
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Percentage Calculator Online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Calculate a percentage of any number quickly and easily with this
            free online percentage calculator.
          </p>
        </header>
        <PercentageCalculator />
      </main>
    </>
  );
}
