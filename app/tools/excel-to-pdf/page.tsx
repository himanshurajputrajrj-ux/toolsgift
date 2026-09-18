import type { Metadata } from "next";
import ExcelToPDF from "../../components/ExcelToPDF";

export const metadata: Metadata = {
  title: "Excel to PDF Converter Online",
  description:
    "Convert Excel XLS and XLSX spreadsheets to PDF documents online quickly and easily with ImgSwift.",
  keywords: [
    "Excel to PDF",
    "Excel to PDF converter",
    "XLS to PDF",
    "XLSX to PDF",
    "convert Excel to PDF",
    "convert XLS to PDF",
    "convert XLSX to PDF",
    "spreadsheet to PDF",
    "Excel spreadsheet to PDF",
    "online Excel to PDF converter",
    "Excel PDF converter",
  ],
  alternates: {
    canonical: "/tools/excel-to-pdf",
  },
  openGraph: {
    title: "Excel to PDF Converter Online | ImgSwift",
    description:
      "Convert Excel XLS and XLSX spreadsheets to PDF documents online quickly and easily.",
    url: "/tools/excel-to-pdf",
    type: "website",
  },
};

export default function ExcelToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ExcelToPDF />
    </main>
  );
}