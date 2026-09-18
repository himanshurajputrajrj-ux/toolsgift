import type { Metadata } from "next";
import ImageCompressor from "../../components/ImageCompressor";

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

export default function CompressorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ImageCompressor />
    </main>
  );
}
