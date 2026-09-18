import type { Metadata } from "next";
import BatchConverter from "../../components/BatchConverter";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Batch Image Converter Online",
  description:
    "Convert multiple JPG, PNG and WebP images at once with ToolsGift's fast online batch image converter.",
  keywords: [
    "batch image converter",
    "batch converter online",
    "convert multiple images",
    "bulk image converter",
    "JPG batch converter",
    "PNG batch converter",
    "WebP batch converter",
    "convert multiple JPG images",
    "convert multiple PNG images",
    "convert multiple WebP images",
    "online batch image converter",
  ],
  alternates: {
    canonical: "/tools/batch-converter",
  },
  openGraph: {
    title: "Batch Image Converter Online | ToolsGift",
    description:
      "Convert multiple JPG, PNG and WebP images at once with ToolsGift's fast online batch image converter.",
    url: "/tools/batch-converter",
    type: "website",
  },
};

export default function BatchConverterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Batch Image Converter" />
      <BatchConverter />
    </main>
  );
}


