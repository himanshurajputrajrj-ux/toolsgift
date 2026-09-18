import type { Metadata } from "next";
import PassportPhotoMaker from "../../components/PassportPhotoMaker";
import ToolSEOContent from "../../components/ToolSEOContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Passport Size Photo Maker Online",
  description:
    "Create passport size photos online with standard photo dimensions, background options and printable A4 photo sheets.",
  keywords: [
    "passport size photo maker",
    "passport photo maker",
    "passport size photo",
    "passport photo online",
    "35x45 passport photo",
    "2x2 passport photo",
    "India passport photo",
    "passport photo sheet",
  ],
  alternates: {
    canonical: "/tools/passport-photo",
  },
  openGraph: {
    title: "Passport Size Photo Maker Online | ToolsGift",
    description:
      "Create passport size photos online with standard dimensions and printable A4 photo sheets.",
    url: "/tools/passport-photo",
    type: "website",
  },
};

export default function PassportPhotoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolName="Passport Size Photo Maker" />
      <PassportPhotoMaker />
      <ToolSEOContent toolKey="passport-photo" />
    </main>
  );
}

