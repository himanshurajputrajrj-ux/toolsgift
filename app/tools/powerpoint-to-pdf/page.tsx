import type { Metadata } from "next";
import PowerPointToPDF from "../../components/PowerPointToPDF";

export const metadata: Metadata = {
  title: "PowerPoint to PDF Converter Online",
  description:
    "Convert PowerPoint PPT and PPTX presentations to PDF online quickly and easily with ToolsGift.",
  keywords: [
    "PowerPoint to PDF",
    "PowerPoint to PDF converter",
    "PPT to PDF",
    "PPTX to PDF",
    "convert PowerPoint to PDF",
    "convert PPT to PDF",
    "convert PPTX to PDF",
    "PowerPoint presentation to PDF",
    "online PowerPoint to PDF converter",
    "PPT PDF converter",
    "PPTX PDF converter",
  ],
  alternates: {
    canonical: "/tools/powerpoint-to-pdf",
  },
  openGraph: {
    title: "PowerPoint to PDF Converter Online | ToolsGift",
    description:
      "Convert PowerPoint PPT and PPTX presentations to PDF online quickly and easily.",
    url: "/tools/powerpoint-to-pdf",
    type: "website",
  },
};

export default function PowerPointToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PowerPointToPDF />
    </main>
  );
}
