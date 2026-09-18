import type { Metadata } from "next";
import PDFEditor from "../../components/PDFEditor";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "PDF Editor Online",
  description:
    "Edit PDF files online by adding text, drawings, highlights and covered areas with ToolsGift.",
  keywords: [
    "PDF editor",
    "PDF editor online",
    "edit PDF online",
    "online PDF editor",
    "PDF editing tool",
    "add text to PDF",
    "draw on PDF",
    "highlight PDF",
    "annotate PDF online",
    "edit PDF document",
    "PDF annotation tool",
  ],
  alternates: {
    canonical: "/tools/pdf-editor",
  },
  openGraph: {
    title: "PDF Editor Online | ToolsGift",
    description:
      "Edit PDF files online by adding text, drawings, highlights and covered areas.",
    url: "/tools/pdf-editor",
    type: "website",
  },
};

export default function PDFEditorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="PDF Editor" />
      <PDFEditor />
      <ToolSEOContent toolKey="pdf-editor" />
    </main>
  );
}

