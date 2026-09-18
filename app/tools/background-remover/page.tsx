import type { Metadata } from "next";
import BackgroundRemover from "../../components/BackgroundRemover";

export const metadata: Metadata = {
  title: "Background Remover Online",
  description:
    "Remove image backgrounds online with AI and replace them with transparent, white, black, gray, blue or custom backgrounds.",
  keywords: [
    "background remover",
    "remove background",
    "AI background remover",
    "image background remover",
    "background changer",
    "transparent background",
  ],
  alternates: {
    canonical: "/tools/background-remover",
  },
  openGraph: {
    title: "Background Remover Online | ToolsGift",
    description:
      "Remove image backgrounds with AI and replace them with professional backgrounds.",
    url: "/tools/background-remover",
    type: "website",
  },
};

export default function BackgroundRemoverPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <BackgroundRemover />
    </main>
  );
}
