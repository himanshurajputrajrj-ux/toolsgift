import type { Metadata } from "next";
import OCRPDF from "../../components/OCRPDF";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "OCR PDF Online",
  description:
    "Extract text from scanned PDF documents using OCR technology online with ToolsGift.",
  keywords: [
    "OCR PDF",
    "OCR PDF online",
    "PDF OCR",
    "OCR PDF converter",
    "extract text from PDF",
    "extract text from scanned PDF",
    "scanned PDF to text",
    "PDF text extraction",
    "OCR document scanner",
    "online PDF OCR",
    "convert scanned PDF to text",
  ],
  alternates: {
    canonical: "/tools/ocr-pdf",
  },
  openGraph: {
    title: "OCR PDF Online | ToolsGift",
    description:
      "Extract text from scanned PDF documents using OCR technology online.",
    url: "/tools/ocr-pdf",
    type: "website",
  },
};

export default function OCRPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="OCR PDF" />
      <OCRPDF />
      <ToolSEOContent toolKey="ocr-pdf" />
    </main>
  );
}

