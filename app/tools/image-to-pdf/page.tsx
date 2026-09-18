import type { Metadata } from "next";
import ImageToPDF from "../../components/ImageToPDF";

export const metadata: Metadata = {
  title: "Image to PDF Online",
  description:
    "Convert JPG, PNG and WebP images to PDF online quickly and easily with ToolsGift.",
  keywords: [
    "image to PDF",
    "image to PDF converter",
    "JPG to PDF",
    "PNG to PDF",
    "WebP to PDF",
    "convert image to PDF",
    "images to PDF",
    "photo to PDF",
    "online image to PDF",
    "image PDF converter",
  ],
  alternates: {
    canonical: "/tools/image-to-pdf",
  },
  openGraph: {
    title: "Image to PDF Online | ToolsGift",
    description:
      "Convert JPG, PNG and WebP images to PDF online quickly and easily.",
    url: "/tools/image-to-pdf",
    type: "website",
  },
};

export default function ImageToPDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ImageToPDF />
    </main>
  );
}
