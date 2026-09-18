import type { Metadata } from "next";
import PDFToExcel from "../../components/PDFToExcel";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "PDF to Excel Converter Online",
  description:
    "Convert PDF files to editable Excel XLSX spreadsheets online quickly and easily with ToolsGift.",
  keywords: [
    "PDF to Excel",
    "PDF to Excel converter",
    "PDF to XLSX",
    "PDF to XLS",
    "convert PDF to Excel",
    "convert PDF to spreadsheet",
    "PDF table to Excel",
    "PDF data to Excel",
    "editable PDF to Excel",
    "online PDF to Excel converter",
    "PDF spreadsheet converter",
  ],
  alternates: {
    canonical: "/tools/pdf-to-excel",
  },
  openGraph: {
    title: "PDF to Excel Converter Online | ToolsGift",
    description:
      "Convert PDF files to editable Excel XLSX spreadsheets online quickly and easily.",
    url: "/tools/pdf-to-excel",
    type: "website",
  },
};

export default function PDFToExcelPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFToExcel />
      <ToolSEOContent toolKey="pdf-to-excel" />
    </main>
  );
}
