import type { MetadataRoute } from "next";

const baseUrl = "https://toolsgift.com";

const tools = [
  // Image Tools
  "compressor",
  "converter",
  "resizer",
  "cropper",
  "image-to-pdf",
  "webp-converter",
  "rotator",
  "enhancer",
  "background-remover",
  "image-metadata",
  "passport-photo",
  "batch-converter",
  "image-to-word",
  "word-to-image",

  // PDF Tools
  "pdf-merger",
  "pdf-splitter",
  "pdf-compressor",
  "pdf-to-word",
  "pdf-to-powerpoint",
  "pdf-to-excel",
  "word-to-pdf",
  "powerpoint-to-pdf",
  "excel-to-pdf",
  "pdf-editor",
  "pdf-to-jpg",
  "pdf-signer",
  "pdf-watermark",
  "pdf-rotator",
  "html-to-pdf",
  "pdf-unlocker",
  "pdf-protector",
  "pdf-organizer",
  "pdf-to-pdfa",
  "pdf-repair",
  "pdf-page-numbers",
  "scan-to-pdf",
  "ocr-pdf",
  "pdf-comparer",
  "pdf-redactor",
  "pdf-cropper",
  "pdf-forms",
  "pdf-summarizer",
  "pdf-translator",
  "pdf-to-markdown",

  // Other Tools
  "social-qr-card",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },

    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

