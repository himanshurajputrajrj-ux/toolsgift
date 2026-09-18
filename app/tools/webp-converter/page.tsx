import type { Metadata } from "next";
import WebPConverter from "../../components/WebPConverter";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "WebP Converter Online",
  description:
    "Convert JPG, PNG and other images to WebP online with adjustable quality using ToolsGift.",
  keywords: [
    "WebP converter",
    "WebP converter online",
    "JPG to WebP",
    "PNG to WebP",
    "image to WebP",
    "convert image to WebP",
    "WebP image converter",
    "online WebP converter",
    "WebP conversion tool",
    "convert JPG to WebP",
  ],
  alternates: {
    canonical: "/tools/webp-converter",
  },
  openGraph: {
    title: "WebP Converter Online | ToolsGift",
    description:
      "Convert JPG, PNG and other images to WebP online with adjustable quality.",
    url: "/tools/webp-converter",
    type: "website",
  },
};

export default function WebPConverterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <WebPConverter />
      <ToolSEOContent toolKey="webp-converter" />
    </main>
  );
}
