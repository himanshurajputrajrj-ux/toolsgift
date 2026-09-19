import RelatedTools from "../../components/RelatedTools";
import type { Metadata } from "next";
import ImageCropper from "../../components/ImageCropper";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Image Cropper Online",
  description:
    "Crop JPG, PNG and WebP images online to a custom area with precise controls using ToolsGift.",
  keywords: [
    "image cropper",
    "crop image online",
    "crop images online",
    "JPG cropper",
    "PNG cropper",
    "WebP cropper",
    "online image cropper",
    "image cropping tool",
    "crop photo online",
    "custom image crop",
  ],
  alternates: {
    canonical: "/tools/cropper",
  },
  openGraph: {
    title: "Image Cropper Online | ToolsGift",
    description:
      "Crop JPG, PNG and WebP images online to a custom area with precise controls.",
    url: "/tools/cropper",
    type: "website",
  },
};

export default function CropperPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Cropper Online" />
      <ImageCropper />
          <RelatedTools tools={[
        { name: "Image Resizer", href: "/tools/resizer" },
        { name: "Image Compressor", href: "/tools/compressor" },
        { name: "Image Enhancer", href: "/tools/enhancer" },
        { name: "Passport Photo", href: "/tools/passport-photo" }
      ]} /></main>
  );
}




