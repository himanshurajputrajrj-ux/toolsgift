import type { Metadata } from "next";
import PDFUnlocker from "../../components/PDFUnlocker";

export const metadata: Metadata = {
  title: "Unlock PDF Online",
  description:
    "Unlock supported PDF files and remove compatible security restrictions online with ToolsGift.",
  keywords: [
    "unlock PDF",
    "unlock PDF online",
    "PDF unlocker",
    "remove PDF restrictions",
    "remove PDF security",
    "PDF security remover",
    "unlock protected PDF",
    "PDF restriction remover",
    "online PDF unlocker",
    "remove PDF permissions",
    "PDF protection remover",
  ],
  alternates: {
    canonical: "/tools/pdf-unlocker",
  },
  openGraph: {
    title: "Unlock PDF Online | ToolsGift",
    description:
      "Unlock supported PDF files and remove compatible security restrictions online.",
    url: "/tools/pdf-unlocker",
    type: "website",
  },
};

export default function PDFUnlockerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFUnlocker />
    </main>
  );
}
