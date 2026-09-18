import type { Metadata } from "next";
import PDFWatermark from "../../components/PDFWatermark";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "PDF Watermark Online",
  description:
    "Add text watermarks to PDF documents online and customize their position, size and appearance with ToolsGift.",
  keywords: [
    "PDF watermark",
    "PDF watermark online",
    "add watermark to PDF",
    "PDF watermark tool",
    "watermark PDF online",
    "add text watermark to PDF",
    "PDF text watermark",
    "watermark PDF document",
    "online PDF watermark",
    "PDF watermark generator",
    "protect PDF with watermark",
  ],
  alternates: {
    canonical: "/tools/pdf-watermark",
  },
  openGraph: {
    title: "PDF Watermark Online | ToolsGift",
    description:
      "Add text watermarks to PDF documents online and customize their position, size and appearance.",
    url: "/tools/pdf-watermark",
    type: "website",
  },
};

export default function PDFWatermarkPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFWatermark />
      <ToolSEOContent toolKey="pdf-watermark" />
    </main>
  );
}
