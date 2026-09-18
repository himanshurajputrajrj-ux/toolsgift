import type { Metadata } from "next";
import PDFRotator from "../../components/PDFRotator";

export const metadata: Metadata = {
  title: "Rotate PDF Online",
  description:
    "Rotate PDF pages online by 90, 180, or 270 degrees quickly and easily with ToolsGift.",
  keywords: [
    "rotate PDF",
    "rotate PDF online",
    "PDF rotator",
    "PDF rotation tool",
    "rotate PDF pages",
    "rotate PDF 90 degrees",
    "rotate PDF 180 degrees",
    "rotate PDF 270 degrees",
    "change PDF page orientation",
    "online PDF rotator",
    "PDF page rotation",
  ],
  alternates: {
    canonical: "/tools/pdf-rotator",
  },
  openGraph: {
    title: "Rotate PDF Online | ToolsGift",
    description:
      "Rotate PDF pages online by 90, 180, or 270 degrees quickly and easily.",
    url: "/tools/pdf-rotator",
    type: "website",
  },
};

export default function PDFRotatorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFRotator />
    </main>
  );
}
