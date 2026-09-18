import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolsgift.com"),

  title: {
    default: "ToolsGift — Fast & Simple Image & PDF Tools",
    template: "%s | ToolsGift",
  },

  description:
    "Fast and simple online image and PDF tools to compress, convert, resize, edit, merge, split and manage your files.",

  keywords: [
    "image tools",
    "PDF tools",
    "image compressor",
    "image converter",
    "image resizer",
    "WebP converter",
    "PDF compressor",
    "PDF converter",
    "PDF editor",
    "online file tools",
  ],

  authors: [
    {
      name: "ToolsGift",
    },
  ],

  creator: "ToolsGift",
  publisher: "ToolsGift",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "ToolsGift",
    title: "ToolsGift — Fast & Simple Image & PDF Tools",
    description:
      "Fast and simple online image and PDF tools for converting, editing, compressing and managing files.",
    url: "https://toolsgift.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolsGift — Fast & Simple Image & PDF Tools",
    description:
      "Fast and simple online image and PDF tools for everyday file processing.",
  },

  alternates: {
    canonical: "https://toolsgift.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f7f5] text-[#202124]">
        <Header />

        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}


