import type { Metadata } from "next";
import WordToPDF from "../../components/WordToPDF";

export const metadata: Metadata = {
  title: "Word to PDF Converter Online",
  description:
    "Convert Word DOC and DOCX documents to PDF online quickly and easily with ToolsGift.",
  keywords: [
    "Word to PDF",
    "Word to PDF converter",
    "DOC to PDF",
    "DOCX to PDF",
    "convert Word to PDF",
    "convert DOCX to PDF",
    "Word document to PDF",
    "online Word to PDF converter",
    "Word PDF converter",
    "DOC to PDF online",
    "DOCX to PDF online",
  ],
  alternates: {
    canonical: "/tools/word-to-pdf",
  },
  openGraph: {
    title: "Word to PDF Converter Online | ToolsGift",
    description:
      "Convert Word DOC and DOCX documents to PDF online quickly and easily.",
    url: "/tools/word-to-pdf",
    type: "website",
  },
};

export default function WordToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <WordToPDF />
    </main>
  );
}
