import type { Metadata } from "next";
import ImageToText from "@/app/components/ImageToText";
export const metadata: Metadata = {
  title: "Image to Text Converter - Extract Text from Images",
  description:
    "Extract text from JPG, PNG, WebP and other images online with ToolsGift. Free browser-based OCR tool with copy and download options.",
  keywords: [
    "image to text",
    "image to text converter",
    "jpg to text",
    "png to text",
    "extract text from image",
    "OCR online",
    "OCR image to text",
    "photo to text",
    "image OCR",
    "free image to text converter",
  ],
  alternates: {
    canonical: "/tools/image-to-text",
  },
  openGraph: {
    title: "Image to Text Converter - Extract Text from Images | ToolsGift",
    description:
      "Extract text from images online with free browser-based OCR.",
    url: "/tools/image-to-text",
    type: "website",
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to Text Converter",
  url: "https://www.toolsgift.com/tools/image-to-text",
  description:
    "Extract text from images online using browser-based OCR.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
export default function ImageToTextPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Image to Text Converter
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Extract text from images online with free browser-based OCR.
        </p>
      </div>
      <ImageToText />
      <section className="mt-12 space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Image to Text Converter
          </h2>
          <p className="mt-2">
            ToolsGift Image to Text Converter uses OCR technology to extract
            readable text from images. Upload an image, let the browser
            process it, then copy or download the extracted text.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Extract Text from an Image
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Upload your image.</li>
            <li>Wait while the OCR process recognizes the text.</li>
            <li>Review or edit the extracted text.</li>
            <li>Copy the text or download it as a TXT file.</li>
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Free Online OCR
          </h2>
          <p className="mt-2">
            The tool is designed for quick everyday text extraction from
            screenshots, photos, scanned documents and other image files.
          </p>
        </div>
      </section>
    </main>
  );
}