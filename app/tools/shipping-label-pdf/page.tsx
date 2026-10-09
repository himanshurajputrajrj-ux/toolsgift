import type { Metadata } from "next";
import ShippingLabelPDF from "../../components/ShippingLabelPDF";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping Label & Invoice PDF",
  description:
    "Fit shipping labels and invoices from any PDF onto exact 4x6, 100x150 mm or custom print pages online with ToolsGift — no stretching, no cut content.",
  keywords: [
    "shipping label pdf",
    "shipping label maker",
    "4x6 label printer",
    "invoice pdf",
    "print shipping label",
    "label size converter",
    "meesho label print",
    "amazon shipping label",
    "flipkart label pdf",
    "shipping label resize",
    "online shipping label tool",
    "label and invoice pdf",
  ],
  alternates: {
    canonical: "/tools/shipping-label-pdf",
  },
  openGraph: {
    title: "Shipping Label & Invoice PDF | ToolsGift",
    description:
      "Fit shipping labels and invoices from any PDF onto exact 4x6, 100x150 mm or custom print pages — no stretching, no cut content.",
    url: "/tools/shipping-label-pdf",
    type: "website",
  },
};

export default function ShippingLabelPdfPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolSlug="shipping-label-pdf" />
      <ShippingLabelPDF />
      <ToolSEOContent toolKey="shipping-label-pdf" />
    </main>
  );
}
