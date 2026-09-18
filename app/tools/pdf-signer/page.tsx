import type { Metadata } from "next";
import PDFSigner from "../../components/PDFSigner";

export const metadata: Metadata = {
  title: "Sign PDF Online",
  description:
    "Add a handwritten signature to PDF documents online quickly and easily with ImgSwift.",
  keywords: [
    "sign PDF",
    "sign PDF online",
    "PDF signer",
    "PDF signature tool",
    "add signature to PDF",
    "electronic signature PDF",
    "eSign PDF online",
    "sign PDF document",
    "online PDF signer",
    "digital signature PDF",
    "add handwritten signature to PDF",
  ],
  alternates: {
    canonical: "/tools/pdf-signer",
  },
  openGraph: {
    title: "Sign PDF Online | ImgSwift",
    description:
      "Add a handwritten signature to PDF documents online quickly and easily.",
    url: "/tools/pdf-signer",
    type: "website",
  },
};

export default function PDFSignerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFSigner />
    </main>
  );
}