import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { LanguageProvider } from "@/app/providers/LanguageProvider";
import { AuthProvider } from "@/app/providers/AuthProvider";
import CookieConsent from "@/app/components/CookieConsent";
import ConsentGate from "@/app/components/ConsentGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toolsgift.com"),

  applicationName: "ToolsGift",

  title: {
    default: "ToolsGift | Free Online Tools for Images, PDFs & Files",
    template: "%s | ToolsGift",
  },

  description:
    "ToolsGift is a free collection of online tools for images, PDFs, text and everyday files — compress, convert, resize, merge, split and edit files in your browser.",

  keywords: [
    "ToolsGift",
    "free online tools",
    "online tools",
    "useful online tools",
    "image tools online",
    "PDF tools online",
    "file converter online",
    "document tools online",
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
    title: "ToolsGift | Free Online Tools for Images, PDFs & Files",
    description:
      "A free collection of online image, PDF and file tools for compressing, converting, resizing, merging and editing files in your browser.",
    url: "https://www.toolsgift.com",
    images: [
      {
        url: "/toolsgift-og.jpg",
        width: 1200,
        height: 628,
        alt: "ToolsGift | Free Online Tools for Images, PDFs & Files",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolsGift | Free Online Tools for Images, PDFs & Files",
    description:
      "A free collection of online image, PDF and file tools for everyday file processing.",
    images: ["/toolsgift-og.jpg"],
  },

  alternates: {
    canonical: "https://www.toolsgift.com",
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
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#f7f7f5] text-[#202124]">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("toolsgift-theme")==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
        <LanguageProvider>
          <AuthProvider>
            <Header />

            <main className="min-h-[calc(100vh-80px)]">
              {children}
            </main>

            <Footer />
            <CookieConsent />
            <ConsentGate type="advertising">
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2458517337983485"
                crossOrigin="anonymous"
              ></script>
            </ConsentGate>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}



