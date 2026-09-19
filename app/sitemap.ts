import type { MetadataRoute } from "next";

const baseUrl = "https://www.toolsgift.com";

const staticPages = [
  "",
  "about",
  "contact",
  "privacy",
  "terms",
  "cookies",
  "disclaimer",
];

const tools = [
  // Image Tools
  "compressor",
  "compress-image-to-kb",
  "heic-to-jpg",
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
    ...staticPages.map((page) => ({
      url: page ? `${baseUrl}/${page}` : baseUrl,
      changeFrequency:
        page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.6,
    })),

    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
