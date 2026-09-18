import type { Metadata } from "next";
import PDFToMarkdown from "../../components/PDFToMarkdown";

export const metadata: Metadata = {
  title: "PDF to Markdown Converter Online",
  description:
    "Convert PDF documents to Markdown online and extract structured text into clean Markdown format with ToolsGift.",
  keywords: [
    "PDF to Markdown",
    "PDF to Markdown converter",
    "PDF to MD",
    "convert PDF to Markdown",
    "convert PDF to MD",
    "PDF Markdown converter",
    "PDF text to Markdown",
    "extract PDF to Markdown",
    "online PDF to Markdown converter",
    "PDF document to Markdown",
    "Markdown converter",
  ],
  alternates: {
    canonical: "/tools/pdf-to-markdown",
  },
  openGraph: {
    title: "PDF to Markdown Converter Online | ToolsGift",
    description:
      "Convert PDF documents to Markdown online and extract structured text into clean Markdown format.",
    url: "/tools/pdf-to-markdown",
    type: "website",
  },
};

export default function PDFToMarkdownPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFToMarkdown />
    </main>
  );
}
