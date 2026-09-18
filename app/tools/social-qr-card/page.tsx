import type { Metadata } from "next";
import SocialQRCard from "../../components/SocialQRCard";

export const metadata: Metadata = {
  title: "Social Media QR Code Generator",
  description:
    "Create a single QR code for WhatsApp, Instagram, Facebook, X, YouTube, LinkedIn and other contact links with ImgSwift.",
  keywords: [
    "social media QR code",
    "social media QR code generator",
    "QR code generator",
    "WhatsApp QR code",
    "Instagram QR code",
    "Facebook QR code",
    "X QR code",
    "YouTube QR code",
    "LinkedIn QR code",
    "digital business card",
    "digital contact card",
    "all social media QR code",
    "social profile QR code",
  ],
  alternates: {
    canonical: "/tools/social-qr-card",
  },
  openGraph: {
    title: "Social Media QR Code Generator | ImgSwift",
    description:
      "Create one QR code for your social media profiles and contact links.",
    url: "/tools/social-qr-card",
    type: "website",
  },
};

export default function SocialQRCardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SocialQRCard />
    </main>
  );
}