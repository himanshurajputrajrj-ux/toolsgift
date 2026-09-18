import type { Metadata } from "next";
import PDFSummarizer from "../../components/PDFSummarizer";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "PDF Summarizer Online",
  description:
    "Summarize PDF documents online directly in your browser and quickly extract the most important information with ToolsGift.",
  keywords: [
    "PDF summarizer",
    "PDF summarizer online",
    "summarize PDF",
    "summarize PDF online",
    "PDF summary generator",
    "PDF document summarizer",
    "summarize PDF document",
    "PDF text summarizer",
    "online PDF summarizer",
    "PDF summary tool",
    "document summarizer",
  ],
  alternates: {
    canonical: "/tools/pdf-summarizer",
  },
  openGraph: {
    title: "PDF Summarizer Online | ToolsGift",
    description:
      "Summarize PDF documents online directly in your browser and quickly extract the most important information.",
    url: "/tools/pdf-summarizer",
    type: "website",
  },
};

export default function PDFSummarizerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFSummarizer />
      <ToolSEOContent toolKey="pdf-summarizer" />
    </main>
  );
}
