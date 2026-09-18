import type { Metadata } from "next";
import PDFCropper from "../../components/PDFCropper";

export const metadata: Metadata = {
  title: "Crop PDF Online",
  description:
    "Crop PDF pages online by removing unwanted margins and adjusting page boundaries with ImgSwift.",
  keywords: [
    "crop PDF",
    "crop PDF online",
    "PDF cropper",
    "PDF cropping tool",
    "crop PDF pages",
    "remove PDF margins",
    "crop PDF margins",
    "trim PDF pages",
    "resize PDF page area",
    "online PDF cropper",
    "PDF page cropping",
  ],
  alternates: {
    canonical: "/tools/pdf-cropper",
  },
  openGraph: {
    title: "Crop PDF Online | ImgSwift",
    description:
      "Crop PDF pages online by removing unwanted margins and adjusting page boundaries.",
    url: "/tools/pdf-cropper",
    type: "website",
  },
};

export default function PDFCropperPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFCropper />
    </main>
  );
}