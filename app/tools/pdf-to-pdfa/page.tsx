import type { Metadata } from "next";
import PDFToPDFA from "../../components/PDFToPDFA";

export const metadata: Metadata = {
  title: "PDF to PDF/A Converter Online",
  description:
    "Convert PDF documents into archival-oriented PDF/A-style files online with ToolsGift.",
  keywords: [
    "PDF to PDF/A",
    "PDF to PDF/A converter",
    "PDF/A converter",
    "convert PDF to PDF/A",
    "PDF archival format",
    "archival PDF converter",
    "PDF/A online",
    "PDF archive converter",
    "convert PDF for archiving",
    "online PDF/A converter",
    "PDF document archiving",
  ],
  alternates: {
    canonical: "/tools/pdf-to-pdfa",
  },
  openGraph: {
    title: "PDF to PDF/A Converter Online | ToolsGift",
    description:
      "Convert PDF documents into archival-oriented PDF/A-style files online.",
    url: "/tools/pdf-to-pdfa",
    type: "website",
  },
};

export default function PDFToPDFAPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFToPDFA />
    </main>
  );
}
