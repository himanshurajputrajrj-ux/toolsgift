import type { Metadata } from "next";
import PDFComparer from "../../components/PDFComparer";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Compare PDF Online",
  description:
    "Compare two PDF documents online and find page-level text differences quickly and easily with ToolsGift.",
  keywords: [
    "compare PDF",
    "compare PDF online",
    "PDF comparer",
    "PDF comparison tool",
    "compare two PDF files",
    "compare PDF documents",
    "PDF text comparison",
    "PDF difference checker",
    "find differences in PDF",
    "PDF document comparison",
    "online PDF comparer",
  ],
  alternates: {
    canonical: "/tools/pdf-comparer",
  },
  openGraph: {
    title: "Compare PDF Online | ToolsGift",
    description:
      "Compare two PDF documents online and find page-level text differences quickly and easily.",
    url: "/tools/pdf-comparer",
    type: "website",
  },
};

export default function PDFComparerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Compare PDF" />
      <PDFComparer />
      <ToolSEOContent toolKey="pdf-comparer" />
    </main>
  );
}

