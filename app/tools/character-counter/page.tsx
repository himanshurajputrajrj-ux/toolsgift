import type { Metadata } from "next";
import Link from "next/link";
import CharacterCounter from "@/app/components/CharacterCounter";
export const metadata: Metadata = {
  title: "Character Counter Online - Count Characters & Spaces",
  description:
    "Count characters, characters without spaces, words, sentences and paragraphs with the free ToolsGift Character Counter.",
  keywords: [
    "character counter",
    "character counter online",
    "count characters",
    "character count tool",
    "characters without spaces",
    "online character counter",
    "free character counter",
    "text character counter",
  ],
  alternates: {
    canonical: "/tools/character-counter",
  },
  openGraph: {
    title: "Character Counter Online - Count Characters | ToolsGift",
    description:
      "Count characters, spaces, words, sentences and paragraphs instantly with the free ToolsGift Character Counter.",
    url: "/tools/character-counter",
    type: "website",
  },
};
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I count characters in text?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Paste or type your text into the ToolsGift Character Counter and the character count updates automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Does the character count include spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The tool shows total characters and characters without spaces.",
      },
    },
    {
      "@type": "Question",
      name: "Is this Character Counter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift Character Counter is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Character counting is performed locally in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I copy or download the text?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. You can copy the text or download it as a TXT file.",
      },
    },
  ],
};
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Character Counter",
  url: "https://www.toolsgift.com/tools/character-counter",
  description:
    "Count characters, characters without spaces, words, sentences and paragraphs online.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function CharacterCounterPage() {
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
            Character Counter
          </span>
        </nav>
        <header className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            TEXT TOOL
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Character Counter Online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Count characters, characters without spaces, words, sentences and
            paragraphs instantly with a fast and simple online character
            counter.
          </p>
        </header>
        <CharacterCounter />
      </main>
    </>
  );
}
