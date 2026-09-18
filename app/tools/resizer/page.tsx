import type { Metadata } from "next";
import ImageResizer from "../../components/ImageResizer";

import Breadcrumbs from "../../components/Breadcrumbs";
export const metadata: Metadata = {
  title: "Image Resizer Online",
  description:
    "Resize JPG, PNG and WebP images online to custom width and height quickly and easily with ToolsGift.",
  keywords: [
    "image resizer",
    "resize image online",
    "resize images online",
    "JPG resizer",
    "PNG resizer",
    "WebP resizer",
    "image resize tool",
    "change image dimensions",
    "custom image size",
    "online image resizer",
  ],
  alternates: {
    canonical: "/tools/resizer",
  },
  openGraph: {
    title: "Image Resizer Online | ToolsGift",
    description:
      "Resize JPG, PNG and WebP images online to custom width and height quickly and easily.",
    url: "/tools/resizer",
    type: "website",
  },
};

export default function ResizerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Image Resizer Online" />
      <ImageResizer />
    </main>
  );
}


