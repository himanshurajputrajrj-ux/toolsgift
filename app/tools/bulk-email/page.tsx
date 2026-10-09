import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";
import ToolSEOContent from "../../components/ToolSEOContent";
import BulkEmail from "../../components/BulkEmail";

export const metadata: Metadata = {
  title: "Bulk Email Composer Online - Personalize & Export Emails",
  description:
    "Create personalized bulk emails from any contact list with the free ToolsGift Bulk Email Composer. Validate email addresses, merge names and copy or export the results.",
  keywords: [
    "bulk email",
    "bulk email composer",
    "email personalization",
    "personalized email generator",
    "email merge fields",
    "bulk email generator",
    "email with name",
    "contact list to email",
    "email message template",
    "free bulk email tool",
    "online email composer",
  ],
  alternates: {
    canonical: "/tools/bulk-email",
  },
  openGraph: {
    title: "Bulk Email Composer Online | ToolsGift",
    description:
      "Personalize one email for every contact, validate email addresses and copy or export the list.",
    url: "/tools/bulk-email",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bulk Email Composer",
  url: "https://www.toolsgift.com/tools/bulk-email",
  description:
    "Personalize one email for every contact in a list, validate email addresses and copy or export the generated emails. Emails are never sent.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function BulkEmailPage() {
  notFound();
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolSlug="bulk-email" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BulkEmail />
      <ToolSEOContent toolKey="bulk-email" />
      <RelatedTools
        tools={[
          // Hidden from public UI: Bulk SMS (kept for later re-enabling)
          // { name: "Bulk SMS", href: "/tools/bulk-sms" },
          { name: "Word Counter", href: "/tools/word-counter" },
          { name: "Character Counter", href: "/tools/character-counter" },
          { name: "Case Converter", href: "/tools/case-converter" },
        ]}
      />
    </main>
  );
}
