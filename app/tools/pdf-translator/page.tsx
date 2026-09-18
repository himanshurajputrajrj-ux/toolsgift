import type { Metadata } from "next";
import PDFTranslator from "../../components/PDFTranslator";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "PDF Translator Online",
  description:
    "Translate text from PDF documents into multiple languages online quickly and easily with ToolsGift.",
  keywords: [
    "PDF translator",
    "PDF translator online",
    "translate PDF",
    "translate PDF online",
    "PDF translation tool",
    "translate PDF document",
    "PDF language translator",
    "multilingual PDF translator",
    "online PDF translator",
    "translate PDF text",
    "document translator",
  ],
  alternates: {
    canonical: "/tools/pdf-translator",
  },
  openGraph: {
    title: "PDF Translator Online | ToolsGift",
    description:
      "Translate text from PDF documents into multiple languages online quickly and easily.",
    url: "/tools/pdf-translator",
    type: "website",
  },
};

export default function PDFTranslatorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFTranslator />
      <ToolSEOContent toolKey="pdf-translator" />
    </main>
  );
}
