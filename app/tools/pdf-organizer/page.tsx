import type { Metadata } from "next";
import PDFOrganizer from "../../components/PDFOrganizer";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedTools from "../../components/RelatedTools";

export const metadata: Metadata = {
  title: "Organize PDF Online",
  description:
    "Reorder, duplicate, delete and organize PDF pages online quickly and easily with ToolsGift.",
  keywords: [
    "organize PDF",
    "organize PDF online",
    "PDF organizer",
    "reorder PDF pages",
    "rearrange PDF pages",
    "delete PDF pages",
    "duplicate PDF pages",
    "move PDF pages",
    "manage PDF pages",
    "PDF page organizer",
    "online PDF organizer",
  ],
  alternates: {
    canonical: "/tools/pdf-organizer",
  },
  openGraph: {
    title: "Organize PDF Online | ToolsGift",
    description:
      "Reorder, duplicate, delete and organize PDF pages online quickly and easily.",
    url: "/tools/pdf-organizer",
    type: "website",
  },
};

export default function PDFOrganizerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Organize PDF" />
      <PDFOrganizer />
      <ToolSEOContent toolKey="pdf-organizer" />
      <RelatedTools tools={[
        { name: "PDF Compressor", href: "/tools/pdf-compressor" },
        { name: "PDF Merger", href: "/tools/pdf-merger" },
        { name: "PDF Splitter", href: "/tools/pdf-splitter" },
        { name: "PDF Page Numbers", href: "/tools/pdf-page-numbers" },
      ]} />
    </main>
  );
}


