import type { Metadata } from "next";
import ImageMetadataTool from "@/app/components/ImageMetadataTool";

export const metadata: Metadata = {
  title: "Image Metadata Tool",
  description:
    "View image metadata, inspect EXIF information, remove embedded metadata and download a clean image copy for free.",
};

export default function ImageMetadataPage() {
  return <ImageMetadataTool />;
}