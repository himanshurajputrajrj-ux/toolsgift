import type { Metadata } from "next";
import PDFCompressor from "../../components/PDFCompressor";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Compress PDF Online",
  description:
    "Compress PDF files online and reduce document file size quickly and easily with ToolsGift.",
  keywords: [
    "compress PDF",
    "compress PDF online",
    "PDF compressor",
    "PDF compression tool",
    "reduce PDF size",
    "reduce PDF file size",
    "compress PDF file",
    "make PDF smaller",
    "shrink PDF size",
    "online PDF compressor",
    "PDF size reducer",
  ],
  alternates: {
    canonical: "/tools/pdf-compressor",
  },
  openGraph: {
    title: "Compress PDF Online | ToolsGift",
    description:
      "Compress PDF files online and reduce document file size quickly and easily.",
    url: "/tools/pdf-compressor",
    type: "website",
  },
};

export default function CompressPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Compress PDF Online" />
      <PDFCompressor />
      <ToolSEOContent toolKey="pdf-compressor" />
    </main>
  );
}




