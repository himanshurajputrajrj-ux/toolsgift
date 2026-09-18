import type { Metadata } from "next";
import PDFToWord from "../../components/PDFToWord";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "PDF to Word Converter Online",
  description:
    "Convert PDF files to editable Word DOCX documents online quickly and easily with ToolsGift.",
  keywords: [
    "PDF to Word",
    "PDF to Word converter",
    "PDF to DOCX",
    "convert PDF to Word",
    "convert PDF to editable Word",
    "PDF converter online",
    "PDF to DOC",
    "editable PDF to Word",
    "online PDF to Word converter",
    "PDF document converter",
    "PDF to Word online",
  ],
  alternates: {
    canonical: "/tools/pdf-to-word",
  },
  openGraph: {
    title: "PDF to Word Converter Online | ToolsGift",
    description:
      "Convert PDF files to editable Word DOCX documents online quickly and easily.",
    url: "/tools/pdf-to-word",
    type: "website",
  },
};

export default function PDFToWordPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFToWord />
      <ToolSEOContent toolKey="pdf-to-word" />
    </main>
  );
}
