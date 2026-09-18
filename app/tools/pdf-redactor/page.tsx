import type { Metadata } from "next";
import PDFRedactor from "../../components/PDFRedactor";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Redact PDF Online",
  description:
    "Redact sensitive information and cover selected areas of PDF documents online with ToolsGift.",
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
    title: "Redact PDF Online | ToolsGift",
    description:
      "Redact sensitive information and cover selected areas of PDF documents online.",
    url: "/tools/pdf-redactor",
    type: "website",
  },
};

export default function PDFRedactorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Redact PDF" />
      <PDFRedactor />
      <ToolSEOContent toolKey="pdf-redactor" />
      <RelatedTools tools={[
        { name: "PDF Protector", href: "/tools/pdf-protector" },
        { name: "PDF Unlocker", href: "/tools/pdf-unlocker" },
        { name: "PDF Editor", href: "/tools/pdf-editor" },
        { name: "PDF Watermark", href: "/tools/pdf-watermark" },
      ]} />
    </main>
  );
}


