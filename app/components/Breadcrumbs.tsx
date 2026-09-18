import Link from "next/link";
type BreadcrumbsProps = {
  toolName: string;
};
export default function Breadcrumbs({ toolName }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-black/50">
        <li>
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-black/70">
          {toolName}
        </li>
      </ol>
    </nav>
  );
}
