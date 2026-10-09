import type { ReactNode } from "react";

export default function SiteStructuredData(): ReactNode {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.toolsgift.com/#organization",
        name: "ToolsGift",
        alternateName: "Tools Gift",
        url: "https://www.toolsgift.com",
        description:
          "ToolsGift is a free collection of online tools for images, PDFs, text and everyday files that run in the browser.",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.toolsgift.com/#website",
        name: "ToolsGift",
        alternateName: "Tools Gift",
        url: "https://www.toolsgift.com",
        inLanguage: "en",
        publisher: {
          "@id": "https://www.toolsgift.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.toolsgift.com/#webpage",
        name: "ToolsGift | Free Online Tools for Images, PDFs & Files",
        url: "https://www.toolsgift.com",
        description:
          "ToolsGift is a free collection of online tools for images, PDFs, text and everyday files — compress, convert, resize, merge, split and edit files in your browser.",
        inLanguage: "en",
        isPartOf: {
          "@id": "https://www.toolsgift.com/#website",
        },
        about: {
          "@id": "https://www.toolsgift.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
