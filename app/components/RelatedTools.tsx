import Link from "next/link";
type RelatedTool = {
  name: string;
  href: string;
};
type RelatedToolsProps = {
  tools: RelatedTool[];
};
export default function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8" aria-labelledby="related-tools-heading">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2
          id="related-tools-heading"
          className="text-2xl font-semibold tracking-tight text-black"
        >
          Related Tools
        </h2>
        <p className="mt-2 text-sm text-black/60">
          Explore more useful tools for working with your files.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-sm font-medium text-black transition hover:border-black/20 hover:bg-slate-100"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
