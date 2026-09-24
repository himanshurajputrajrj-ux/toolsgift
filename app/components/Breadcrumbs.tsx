"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers/LanguageProvider";

type BreadcrumbsProps = {
  toolName: string;
};

export default function Breadcrumbs({ toolName }: BreadcrumbsProps) {
  const { t } = useLanguage();

  const homeLabel = t.nav.home;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: "https://toolsgift.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: toolName,
      },
    ],
  };

  return (
    <>
      <nav
        aria-label={homeLabel}
        className="mx-auto max-w-7xl px-5 pt-5 sm:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <li>
            <Link
              href="/"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              {homeLabel}
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="text-blue-400 dark:text-blue-500"
          >
            /
          </li>

          <li
            aria-current="page"
            className="font-medium text-blue-600 dark:text-blue-400"
          >
            {toolName}
          </li>
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}