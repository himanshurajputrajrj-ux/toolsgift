import type { Metadata } from "next";
import PDFProtector from "../../components/PDFProtector";

export const metadata: Metadata = {
  title: "Protect PDF Online",
  description:
    "Protect PDF files with password security and restrict access to your documents using ToolsGift.",
  keywords: [
    "protect PDF",
    "protect PDF online",
    "PDF protector",
    "password protect PDF",
    "password PDF online",
    "secure PDF",
    "PDF security tool",
    "encrypt PDF",
    "PDF password protection",
    "protect PDF document",
    "online PDF protector",
  ],
  alternates: {
    canonical: "/tools/pdf-protector",
  },
  openGraph: {
    title: "Protect PDF Online | ToolsGift",
    description:
      "Protect PDF files with password security and restrict access to your documents.",
    url: "/tools/pdf-protector",
    type: "website",
  },
};

export default function PDFProtectorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFProtector />
    </main>
  );
}
