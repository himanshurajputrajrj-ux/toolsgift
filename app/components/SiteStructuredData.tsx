import type { ReactNode } from "react";

export default function SiteStructuredData(): ReactNode {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ToolsGift",
        url: "https://www.toolsgift.com",
      },
      {
        "@type": "WebSite",
        name: "ToolsGift",
        alternateName: "Tools Gift",
        url: "https://www.toolsgift.com",
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
