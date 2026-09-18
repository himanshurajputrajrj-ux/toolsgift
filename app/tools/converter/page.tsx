import type { Metadata } from "next";
import ImageConverter from "../../components/ImageConverter";
import StructuredData from "../../components/StructuredData";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Image Converter Online",
  description:
    "Convert images online between JPG, PNG and WebP formats quickly and easily with ToolsGift.",
  keywords: [
    "image converter",
    "convert image online",
    "JPG converter",
    "PNG converter",
    "WebP converter",
    "JPG to PNG",
    "PNG to JPG",
    "JPG to WebP",
    "PNG to WebP",
    "WebP to JPG",
    "WebP to PNG",
    "online image converter",
  ],
  alternates: {
    canonical: "/tools/converter",
  },
  openGraph: {
    title: "Image Converter Online | ToolsGift",
    description:
      "Convert images between JPG, PNG and WebP formats quickly and easily.",
    url: "/tools/converter",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Converter Online" />
      <StructuredData name="Image Converter Online" description="Convert images online between JPG, PNG and WebP formats quickly and easily with ToolsGift." url="https://toolsgift.com/tools/converter" />
      <ImageConverter />
    </main>
  );
}




