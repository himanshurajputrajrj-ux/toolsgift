import type { Metadata } from "next";
import MergePDF from "../../components/MergePDF";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "Merge PDF Online",
  description:
    "Merge multiple PDF files into one PDF document online quickly and easily with ToolsGift.",
  keywords: [
    "merge PDF",
    "merge PDF online",
    "combine PDF files",
    "combine PDFs online",
    "PDF merger",
    "PDF merge tool",
    "join PDF files",
    "merge multiple PDFs",
    "combine PDF documents",
    "online PDF merger",
    "free PDF merger",
  ],
  alternates: {
    canonical: "/tools/pdf-merger",
  },
  openGraph: {
    title: "Merge PDF Online | ToolsGift",
    description:
      "Merge multiple PDF files into one PDF document online quickly and easily.",
    url: "/tools/pdf-merger",
    type: "website",
  },
};

export default function MergePDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <MergePDF />
      <ToolSEOContent toolKey="pdf-merger" />
    </main>
  );
}
