import type { Metadata } from "next";
import PDFToJPG from "../../components/PDFToJPG";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online",
  description:
    "Convert PDF pages to high-quality JPG images online quickly and easily with ImgSwift.",
  keywords: [
    "PDF to JPG",
    "PDF to JPG converter",
    "PDF to JPEG",
    "convert PDF to JPG",
    "convert PDF to JPEG",
    "PDF pages to JPG",
    "PDF page to image",
    "PDF image converter",
    "online PDF to JPG converter",
    "PDF to image converter",
    "convert PDF pages to images",
  ],
  alternates: {
    canonical: "/tools/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG Converter Online | ImgSwift",
    description:
      "Convert PDF pages to high-quality JPG images online quickly and easily.",
    url: "/tools/pdf-to-jpg",
    type: "website",
  },
};

export default function PDFToJPGPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFToJPG />
    </main>
  );
}