import type { Metadata } from "next";
import PDFForms from "../../components/PDFForms";

export const metadata: Metadata = {
  title: "Fill PDF Forms Online",
  description:
    "Fill interactive PDF forms online, enter information into form fields and download completed PDF documents with ImgSwift.",
  keywords: [
    "PDF forms",
    "fill PDF forms",
    "fill PDF online",
    "PDF form filler",
    "PDF form filler online",
    "fillable PDF forms",
    "fill interactive PDF",
    "complete PDF form",
    "edit PDF form fields",
    "online PDF forms",
    "PDF form editor",
  ],
  alternates: {
    canonical: "/tools/pdf-forms",
  },
  openGraph: {
    title: "Fill PDF Forms Online | ImgSwift",
    description:
      "Fill interactive PDF forms online and download completed PDF documents quickly and easily.",
    url: "/tools/pdf-forms",
    type: "website",
  },
};

export default function PDFFormsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PDFForms />
    </main>
  );
}