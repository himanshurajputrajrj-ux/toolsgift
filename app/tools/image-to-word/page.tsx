import type { Metadata } from "next";
import ImageToWord from "../../components/ImageToWord";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "Image to Word Converter Online",
  description:
    "Convert JPG, PNG and other images to editable Word documents online quickly and easily with ToolsGift.",
  keywords: [
    "image to Word",
    "image to Word converter",
    "JPG to Word",
    "PNG to Word",
    "photo to Word",
    "convert image to Word",
    "image to DOCX",
    "image to editable Word",
    "online image to Word converter",
    "picture to Word",
    "convert photo to Word",
  ],
  alternates: {
    canonical: "/tools/image-to-word",
  },
  openGraph: {
    title: "Image to Word Converter Online | ToolsGift",
    description:
      "Convert JPG, PNG and other images to editable Word documents online quickly and easily.",
    url: "/tools/image-to-word",
    type: "website",
  },
};

export default function ImageToWordPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ImageToWord />
      <ToolSEOContent toolKey="image-to-word" />
    </main>
  );
}
