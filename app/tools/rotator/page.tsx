import type { Metadata } from "next";
import ImageRotator from "../../components/ImageRotator";

export const metadata: Metadata = {
  title: "Image Rotator Online",
  description:
    "Rotate JPG, PNG and WebP images online by 90, 180, or 270 degrees quickly and easily with ImgSwift.",
  keywords: [
    "image rotator",
    "rotate image online",
    "rotate images online",
    "JPG rotator",
    "PNG rotator",
    "WebP rotator",
    "rotate photo online",
    "image rotation tool",
    "rotate image 90 degrees",
    "rotate image 180 degrees",
    "rotate image 270 degrees",
  ],
  alternates: {
    canonical: "/tools/rotator",
  },
  openGraph: {
    title: "Image Rotator Online | ImgSwift",
    description:
      "Rotate JPG, PNG and WebP images online by 90, 180, or 270 degrees quickly and easily.",
    url: "/tools/rotator",
    type: "website",
  },
};

export default function ImageRotatorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ImageRotator />
    </main>
  );
}