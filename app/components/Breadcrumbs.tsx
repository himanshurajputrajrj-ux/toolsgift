import Link from "next/link";
type BreadcrumbsProps = {
  toolName: string;
};
export default function Breadcrumbs({ toolName }: BreadcrumbsProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
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
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[#202124]/70 dark:text-white/75">
          <li>
            <Link href="/" className="transition hover:text-[#202124] dark:hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#202124]/40 dark:text-white/50">/</li>
          <li aria-current="page" className="font-medium text-[#202124] dark:text-white">
            {toolName}
          </li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
