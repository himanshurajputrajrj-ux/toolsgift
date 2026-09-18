import type { Metadata } from "next";
import PDFPageNumbers from "../../components/PDFPageNumbers";

export const metadata: Metadata = {
  title: "Add PDF Page Numbers Online",
  description:
    "Add customizable page numbers to PDF files online with flexible position, starting number, font size and margin options using ImgSwift.",
  keywords: [
    "add PDF page numbers",
    "PDF page numbers",
    "add page numbers to PDF",
    "number PDF pages",
    "PDF page numbering",
    "page number PDF online",
    "PDF page number tool",
    "number pages in PDF",
    "custom PDF page numbers",
    "online PDF page numbering",
    "PDF numbering tool",
  ],
  alternates: {
    canonical: "/tools/pdf-page-numbers",
  },
  openGraph: {
    title: "Add PDF Page Numbers Online | ImgSwift",
    description:
      "Add customizable page numbers to PDF files online with flexible position, starting number, font size and margin options.",
    url: "/tools/pdf-page-numbers",
    type: "website",
  },
};

export default function PDFPageNumbersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFPageNumbers />
    </main>
  );
}