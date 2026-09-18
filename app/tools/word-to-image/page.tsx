import type { Metadata } from "next";
import WordToImage from "../../components/WordToImage";

export const metadata: Metadata = {
  title: "Word to Image Converter Online",
  description:
    "Convert Word DOC and DOCX documents to images online quickly and easily with ToolsGift.",
  keywords: [
    "Word to image",
    "Word to image converter",
    "DOC to image",
    "DOCX to image",
    "Word document to image",
    "convert Word to JPG",
    "convert Word to PNG",
    "DOCX to JPG",
    "DOCX to PNG",
    "online Word to image converter",
    "Word document converter",
  ],
  alternates: {
    canonical: "/tools/word-to-image",
  },
  openGraph: {
    title: "Word to Image Converter Online | ToolsGift",
    description:
      "Convert Word DOC and DOCX documents to images online quickly and easily.",
    url: "/tools/word-to-image",
    type: "website",
  },
};

export default function WordToImagePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <WordToImage />
    </main>
  );
}
