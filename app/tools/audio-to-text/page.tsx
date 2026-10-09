import type { Metadata } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import AudioToText from "../../components/AudioToText";
import ToolSEOContent from "../../components/ToolSEOContent";

export const metadata: Metadata = {
  title: "Audio to Text Transcription Online - Free Speech to Text Tool",
  description:
    "Turn audio recordings into editable text for free with the ToolsGift Audio to Text tool. Transcribe MP3, WAV, FLAC, OGG and M4A files privately in your browser.",
  keywords: [
    "audio to text",
    "speech to text",
    "audio transcription",
    "transcribe audio",
    "mp3 to text",
    "wav to text",
    "voice to text converter",
    "online transcription",
    "free audio transcriber",
    "whisper transcription",
  ],
  alternates: {
    canonical: "/tools/audio-to-text",
  },
  openGraph: {
    title: "Audio to Text Transcription Online | ToolsGift",
    description:
      "Transcribe audio files into text in your browser. Your recordings are never uploaded.",
    url: "/tools/audio-to-text",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Audio to Text",
  url: "https://www.toolsgift.com/tools/audio-to-text",
  description:
    "Transcribe speech from audio files into editable text directly in the browser. Audio files are never uploaded to a server.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function AudioToTextPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs toolSlug="audio-to-text" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AudioToText />
      <ToolSEOContent toolKey="audio-to-text" />
    </main>
  );
}
