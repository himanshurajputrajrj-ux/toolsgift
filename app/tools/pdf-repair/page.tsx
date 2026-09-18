import type { Metadata } from "next";
import PDFRepair from "../../components/PDFRepair";

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
      <PDFRepair />
    </main>
  );
}
