import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";
import ToolSEOContent from "../../components/ToolSEOContent";
import EDFForm from "../../components/EDFForm";
export const metadata: Metadata = {
  title: "RBI EDF Form Generator Online | ToolsGift",
  description:
    "Fill export declaration form details and generate a completed RBI EDF PDF online with ToolsGift.",
  alternates: { canonical: "/tools/edf-form" },
  openGraph: {
    title: "RBI EDF Form Generator | ToolsGift",
    description:
      "Prepare your export declaration form and generate a PDF online.",
    url: "/tools/edf-form",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RBI EDF Form Generator",
  url: "https://www.toolsgift.com/tools/edf-form",
  description:
    "Fill export declaration form details and generate a completed PDF.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function EDFFormPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolSlug="edf-form" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <EDFForm />
      <ToolSEOContent toolKey="edf-form" />
      <RelatedTools
        tools={[
          { name: "PDF Tools", href: "/pdf-tools" },
          { name: "Image Tools", href: "/image-tools" },
        ]}
      />
    </main>
  );
}
