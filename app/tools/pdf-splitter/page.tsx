import type { Metadata } from "next";
import PDFSplitter from "../../components/PDFSplitter";

export const metadata: Metadata = {
  title: "Split PDF Online",
  description:
    "Split PDF files online into separate documents or extract specific pages quickly and easily with ToolsGift.",
  keywords: [
    "split PDF",
    "split PDF online",
    "PDF splitter",
    "PDF split tool",
    "split PDF pages",
    "extract PDF pages",
    "extract pages from PDF",
    "separate PDF pages",
    "split PDF into multiple files",
    "online PDF splitter",
    "PDF page extractor",
  ],
  alternates: {
    canonical: "/tools/pdf-splitter",
  },
  openGraph: {
    title: "Split PDF Online | ToolsGift",
    description:
      "Split PDF files online into separate documents or extract specific pages quickly and easily.",
    url: "/tools/pdf-splitter",
    type: "website",
  },
};

export default function PDFSplitterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFSplitter />
    </main>
  );
}
