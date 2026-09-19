import type { Metadata } from "next";
import PDFRepair from "../../components/PDFRepair";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Repair PDF Online",
  description:
    "Repair and rebuild readable PDF files online to help recover PDFs with minor structural issues using ToolsGift.",
  keywords: [
    "repair PDF",
    "repair PDF online",
    "PDF repair tool",
    "PDF file repair",
    "fix corrupted PDF",
    "fix PDF online",
    "repair damaged PDF",
    "recover PDF file",
    "rebuild PDF",
    "PDF recovery tool",
    "online PDF repair",
  ],
  alternates: {
    canonical: "/tools/pdf-repair",
  },
  openGraph: {
    title: "Repair PDF Online | ToolsGift",
    description:
      "Repair and rebuild readable PDF files online to help recover PDFs with minor structural issues.",
    url: "/tools/pdf-repair",
    type: "website",
  },
};

export default function PDFRepairPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Repair PDF" />
      <PDFRepair />
      <ToolSEOContent toolKey="pdf-repair" />
      <RelatedTools tools={[
        { name: "PDF Compressor", href: "/tools/pdf-compressor" },
        { name: "PDF Protector", href: "/tools/pdf-protector" },
        { name: "PDF Unlocker", href: "/tools/pdf-unlocker" },
        { name: "PDF Merger", href: "/tools/pdf-merger" },
      ]} />
    </main>
  );
}


