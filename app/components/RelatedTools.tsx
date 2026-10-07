"use client";

import Link from "next/link";
import { getToolText } from "@/app/i18n/translations";
import { useLanguage } from "@/app/providers/LanguageProvider";
type RelatedTool = {
  name: string;
  href: string;
};
type RelatedToolsProps = {
  tools: RelatedTool[];
};
export default function RelatedTools({ tools }: RelatedToolsProps) {
  const { locale, t } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8" aria-labelledby="related-tools-heading">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2
          id="related-tools-heading"
          className="text-2xl font-semibold tracking-tight text-black"
        >
          {t.related.title}
        </h2>
        <p className="mt-2 text-sm text-black/60">
          {t.related.description}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const slug = tool.href.replace(/^\/tools\//, "");
            const text = getToolText(locale, slug);
            const label = text.title === slug ? tool.name : text.title;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-sm font-medium text-black transition hover:border-black/20 hover:bg-slate-100"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
