import RelatedTools from "../../components/RelatedTools";
import type { Metadata } from "next";
import ImageEnhancer from "../../components/ImageEnhancer";
import ToolSEOContent from "../../components/ToolSEOContent";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Image Enhancer Online",
  description:
    "Enhance JPG, PNG and WebP images online by adjusting brightness, contrast, saturation and sharpness with ToolsGift.",
  keywords: [
    "image enhancer",
    "image enhancer online",
    "enhance image online",
    "enhance photo online",
    "JPG image enhancer",
    "PNG image enhancer",
    "WebP image enhancer",
    "image quality enhancer",
    "photo enhancement tool",
    "brightness contrast saturation sharpness",
    "online photo enhancer",
  ],
  alternates: {
    canonical: "/tools/enhancer",
  },
  openGraph: {
    title: "Image Enhancer Online | ToolsGift",
    description:
      "Enhance JPG, PNG and WebP images online by adjusting brightness, contrast, saturation and sharpness.",
    url: "/tools/enhancer",
    type: "website",
  },
};

export default function ImageEnhancerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Enhancer Online" />
      <ImageEnhancer />
      <ToolSEOContent toolKey="enhancer" />
          <RelatedTools tools={[
        { name: "Image Compressor", href: "/tools/compressor" },
        { name: "Image Resizer", href: "/tools/resizer" },
        { name: "Image Cropper", href: "/tools/cropper" },
        { name: "Background Remover", href: "/tools/background-remover" }
      ]} /></main>
  );
}




