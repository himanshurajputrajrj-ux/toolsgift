import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";
import HeicToJpg from "../../components/HeicToJpg";
export const metadata: Metadata = {
  title: "HEIC to JPG Converter Online",
  description:
    "Convert HEIC and HEIF images to JPG online for free with ToolsGift. Fast browser-based HEIC to JPG conversion.",
  keywords: [
    "heic to jpg",
    "heic to jpg converter",
    "convert heic to jpg",
    "heic converter",
    "heif to jpg",
    "heic to jpeg",
    "convert heif to jpg",
    "iphone heic to jpg",
    "free heic to jpg converter",
    "heic image converter",
  ],
  alternates: {
    canonical: "/tools/heic-to-jpg",
  },
  openGraph: {
    title: "HEIC to JPG Converter Online | ToolsGift",
    description:
      "Convert HEIC and HEIF images to JPG online for free with browser-based processing.",
    url: "/tools/heic-to-jpg",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HEIC to JPG Converter",
  url: "https://www.toolsgift.com/tools/heic-to-jpg",
  description:
    "Convert HEIC and HEIF images to JPG online with browser-based processing.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function HeicToJpgPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="HEIC to JPG Converter" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HeicToJpg />
      <RelatedTools
        tools={[
          {
            name: "Image Converter",
            href: "/tools/converter",
          },
          {
            name: "Image Compressor",
            href: "/tools/compressor",
          },
          {
            name: "Compress Image to KB",
            href: "/tools/compress-image-to-kb",
          },
          {
            name: "Image Resizer",
            href: "/tools/resizer",
          },
        ]}
      />
    </main>
  );
}
