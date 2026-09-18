import type { Metadata } from "next";
import PDFRedactor from "../../components/PDFRedactor";

export const metadata: Metadata = {
  title: "Redact PDF Online",
  description:
    "Redact sensitive information and cover selected areas of PDF documents online with ImgSwift.",
  keywords: [
    "redact PDF",
    "redact PDF online",
    "PDF redactor",
    "PDF redaction tool",
    "remove sensitive information from PDF",
    "hide information in PDF",
    "black out PDF text",
    "redact PDF document",
    "cover sensitive PDF content",
    "online PDF redactor",
    "PDF privacy tool",
  ],
  alternates: {
    canonical: "/tools/pdf-redactor",
  },
  openGraph: {
    title: "Redact PDF Online | ImgSwift",
    description:
      "Redact sensitive information and cover selected areas of PDF documents online.",
    url: "/tools/pdf-redactor",
    type: "website",
  },
};

export default function PDFRedactorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFRedactor />
    </main>
  );
}