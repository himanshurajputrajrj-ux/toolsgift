import type { Metadata } from "next";
import HTMLToPDF from "../../components/HTMLToPDF";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "HTML to PDF Converter Online",
  description:
    "Convert HTML files and HTML code to PDF online directly in your browser with ToolsGift.",
  keywords: [
    "HTML to PDF",
    "HTML to PDF converter",
    "HTML to PDF online",
    "convert HTML to PDF",
    "HTML code to PDF",
    "HTML file to PDF",
    "webpage to PDF",
    "HTML PDF converter",
    "online HTML to PDF converter",
    "convert HTML file to PDF",
    "HTML document to PDF",
  ],
  alternates: {
    canonical: "/tools/html-to-pdf",
  },
  openGraph: {
    title: "HTML to PDF Converter Online | ToolsGift",
    description:
      "Convert HTML files and HTML code to PDF online directly in your browser.",
    url: "/tools/html-to-pdf",
    type: "website",
  },
};

export default function HTMLToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HTMLToPDF />
      <ToolSEOContent toolKey="html-to-pdf" />
    </main>
  );
}
