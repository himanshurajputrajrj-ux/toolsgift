import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";
import CompressImageToKB from "../../components/CompressImageToKB";
export const metadata: Metadata = {
  title: "Compress Image to KB Online",
  description:
    "Compress JPG, PNG and WebP images to 20KB, 50KB, 100KB, 200KB or a custom target size online with ToolsGift.",
  keywords: [
    "compress image to 20kb",
    "compress image to 50kb",
    "compress image to 100kb",
    "compress image to 200kb",
    "compress image to kb",
    "reduce image size to kb",
    "image compressor to specific size",
    "compress jpg to 50kb",
    "compress png to 100kb",
    "compress image online",
  ],
  alternates: {
    canonical: "/tools/compress-image-to-kb",
  },
  openGraph: {
    title: "Compress Image to KB Online | ToolsGift",
    description:
      "Compress images to 20KB, 50KB, 100KB, 200KB or a custom target size online.",
    url: "/tools/compress-image-to-kb",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compress Image to KB Online",
  url: "https://www.toolsgift.com/tools/compress-image-to-kb",
  description:
    "Compress JPG, PNG and WebP images to a specific file-size target online.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function CompressImageToKBPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Compress Image to KB Online" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <CompressImageToKB />
      <RelatedTools
        tools={[
          {
            name: "Image Compressor",
            href: "/tools/compressor",
          },
          {
            name: "Image Resizer",
            href: "/tools/resizer",
          },
          {
            name: "Image Converter",
            href: "/tools/converter",
          },
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
          },
        ]}
      />
    </main>
  );
}