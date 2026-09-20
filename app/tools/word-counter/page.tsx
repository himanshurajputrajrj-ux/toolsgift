import type { Metadata } from "next";
import Link from "next/link";
import WordCounter from "@/app/components/WordCounter";
export const metadata: Metadata = {
  title: "Word Counter Online - Count Words & Characters",
  description:
    "Count words, characters, sentences, paragraphs and lines online with the free ToolsGift Word Counter. Fast, simple and browser-based.",
  keywords: [
    "word counter",
    "word counter online",
    "count words",
    "character counter",
    "word count tool",
    "online word counter",
    "free word counter",
    "essay word counter",
    "text counter",
  ],
  alternates: {
    canonical: "/tools/word-counter",
  },
  openGraph: {
    title: "Word Counter Online - Count Words & Characters | ToolsGift",
    description:
      "Count words, characters, sentences, paragraphs and lines instantly with the free ToolsGift Word Counter.",
    url: "/tools/word-counter",
    type: "website",
  },
};
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I count words in text?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Paste or type your text into the ToolsGift Word Counter and the word count updates automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Does Word Counter also count characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift Word Counter shows total characters and characters without spaces.",
      },
    },
    {
      "@type": "Question",
      name: "Is this Word Counter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. ToolsGift Word Counter is free to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Word counting is performed locally in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I copy or download my text?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. You can copy the text to your clipboard or download it as a TXT file.",
      },
    },
  ],
};
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: "https://www.toolsgift.com/tools/word-counter",
  description:
    "Count words, characters, sentences, paragraphs and lines online.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function WordCounterPage() {
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
            Word Counter
          </span>
        </nav>
        <header className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            TEXT TOOL
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Word Counter Online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Count words, characters, sentences, paragraphs and lines instantly
            with a fast and simple online word counter.
          </p>
        </header>
        <WordCounter />
      </main>
    </>
  );
}
