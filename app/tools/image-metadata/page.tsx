import RelatedTools from "../../components/RelatedTools";
import type { Metadata } from "next";
import ImageMetadataTool from "@/app/components/ImageMetadataTool";

export const metadata: Metadata = {
  title: "Image Metadata Tool",
  description:
    "View image metadata, inspect EXIF information, remove embedded metadata and download a clean image copy for free.",
  keywords: [
    "image metadata",
    "EXIF viewer",
    "EXIF metadata viewer",
    "image metadata remover",
    "remove EXIF data",
    "view image EXIF",
    "image metadata tool",
    "remove image metadata",
    "EXIF remover",
    "online EXIF viewer",
  ],
  alternates: {
    canonical: "/tools/image-metadata",
  },
  openGraph: {
    title: "Image Metadata Tool | ToolsGift",
    description:
      "View image metadata, inspect EXIF information, remove embedded metadata and download a clean image copy for free.",
    url: "/tools/image-metadata",
    type: "website",
  },
};

export default function ImageMetadataPage() {
  return (
    <>
      <ImageMetadataTool />
      <RelatedTools tools={[
        { name: "Image Compressor", href: "/tools/compressor" },
        { name: "Image Converter", href: "/tools/converter" },
        { name: "WebP Converter", href: "/tools/webp-converter" },
        { name: "Social QR Card", href: "/tools/social-qr-card" }
      ]} />
    </>
  );
}



