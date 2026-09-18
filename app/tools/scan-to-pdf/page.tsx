import type { Metadata } from "next";
import ScanToPDF from "../../components/ScanToPDF";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "Scan to PDF Online",
  description:
    "Scan documents with your camera or upload images and convert them to PDF online quickly and easily with ToolsGift.",
  keywords: [
    "scan to PDF",
    "scan to PDF online",
    "document scanner",
    "online document scanner",
    "scan documents to PDF",
    "photo to PDF",
    "camera scanner PDF",
    "image to PDF scanner",
    "mobile document scanner",
    "online scan to PDF",
    "document scan converter",
  ],
  alternates: {
    canonical: "/tools/scan-to-pdf",
  },
  openGraph: {
    title: "Scan to PDF Online | ToolsGift",
    description:
      "Scan documents with your camera or upload images and convert them to PDF online quickly and easily.",
    url: "/tools/scan-to-pdf",
    type: "website",
  },
};

export default function ScanToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ScanToPDF />
      <ToolSEOContent toolKey="scan-to-pdf" />
    </main>
  );
}
