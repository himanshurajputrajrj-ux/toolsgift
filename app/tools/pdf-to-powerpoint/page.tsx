import type { Metadata } from "next";
import PDFToPowerPoint from "../../components/PDFToPowerPoint";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "PDF to PowerPoint Converter Online",
  description:
    "Convert PDF files to PowerPoint PPTX presentations online quickly and easily with ToolsGift.",
  keywords: [
    "PDF to PowerPoint",
    "PDF to PPT",
    "PDF to PPTX",
    "PDF to PowerPoint converter",
    "convert PDF to PowerPoint",
    "convert PDF to PPT",
    "PDF presentation converter",
    "PDF to editable PowerPoint",
    "online PDF to PowerPoint converter",
    "PDF presentation maker",
    "PDF converter online",
  ],
  alternates: {
    canonical: "/tools/pdf-to-powerpoint",
  },
  openGraph: {
    title: "PDF to PowerPoint Converter Online | ToolsGift",
    description:
      "Convert PDF files to PowerPoint PPTX presentations online quickly and easily.",
    url: "/tools/pdf-to-powerpoint",
    type: "website",
  },
};

export default function PDFToPowerPointPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="PDF to PowerPoint" />
      <PDFToPowerPoint />
      <ToolSEOContent toolKey="pdf-to-powerpoint" />
    </main>
  );
}

