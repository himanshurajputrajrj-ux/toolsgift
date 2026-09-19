import RelatedTools from "../../components/RelatedTools";
import type { Metadata } from "next";
import ImageCompressor from "../../components/ImageCompressor";
import ToolSEOContent from "../../components/ToolSEOContent";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Image Compressor Online",
  description:
    "Compress JPG, PNG and WebP images online while maintaining excellent quality. Reduce image file size quickly with ToolsGift.",
  keywords: [
    "image compressor",
    "compress image",
    "compress images online",
    "JPG compressor",
    "PNG compressor",
    "WebP compressor",
    "reduce image size",
    "image size reducer",
    "online image compressor",
  ],
  alternates: {
    canonical: "/tools/compressor",
  },
  openGraph: {
    title: "Image Compressor Online | ToolsGift",
    description:
      "Compress JPG, PNG and WebP images online while maintaining excellent quality.",
    url: "/tools/compressor",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Compressor Online",
  url: "https://www.toolsgift.com/tools/compressor",
  description:
    "Compress JPG, PNG and WebP images online while maintaining excellent quality. Reduce image file size quickly with ToolsGift.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CompressorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Compressor Online" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ImageCompressor />
      <ToolSEOContent toolKey="compressor" />
    
      <RelatedTools tools={[
        { name: "Image Converter", href: "/tools/converter" },
        { name: "Image Resizer", href: "/tools/resizer" },
        { name: "Image Enhancer", href: "/tools/enhancer" },
        { name: "WebP Converter", href: "/tools/webp-converter" }
      ]} />
</main>
  );
}




