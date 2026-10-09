import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";
import ToolSEOContent from "../../components/ToolSEOContent";
import BulkSMS from "../../components/BulkSMS";

export const metadata: Metadata = {
  title: "Bulk SMS Composer Online - Personalize & Export Messages",
  description:
    "Create personalized bulk SMS messages from any contact list with the free ToolsGift Bulk SMS Composer. Validate phone numbers, merge names and copy or export the results.",
  keywords: [
    "bulk sms",
    "bulk sms composer",
    "sms personalization",
    "personalized sms generator",
    "sms merge fields",
    "bulk text message generator",
    "sms with name",
    "contact list to sms",
    "sms message template",
    "free bulk sms tool",
    "online sms composer",
  ],
  alternates: {
    canonical: "/tools/bulk-sms",
  },
  openGraph: {
    title: "Bulk SMS Composer Online | ToolsGift",
    description:
      "Personalize one SMS message for every contact, validate phone numbers and copy or export the list.",
    url: "/tools/bulk-sms",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bulk SMS Composer",
  url: "https://www.toolsgift.com/tools/bulk-sms",
  description:
    "Personalize one SMS message for every contact in a list, validate phone numbers and copy or export the generated messages.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function BulkSmsPage() {
  notFound();
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolSlug="bulk-sms" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BulkSMS />
      <ToolSEOContent toolKey="bulk-sms" />
      <RelatedTools
        tools={[
          { name: "Word Counter", href: "/tools/word-counter" },
          { name: "Character Counter", href: "/tools/character-counter" },
          { name: "Case Converter", href: "/tools/case-converter" },
          { name: "QR Code Generator", href: "/tools/qr-code-generator" },
        ]}
      />
    </main>
  );
}
