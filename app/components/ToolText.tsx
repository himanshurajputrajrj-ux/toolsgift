"use client";

import { getToolText, type Locale, type translations } from "@/app/i18n/translations";
import { useLanguage } from "@/app/providers/LanguageProvider";

type Translator = (typeof translations)[Locale];

const textAccessors = {
  "related.title": (t: Translator) => t.related.title,
  "related.description": (t: Translator) => t.related.description,
  "nav.home": (t: Translator) => t.nav.home,
  "nav.tools": (t: Translator) => t.nav.tools,
  "common.loading": (t: Translator) => t.common.loading,
};

export type LocalizedTextKey = keyof typeof textAccessors;

export function LocalizedText({ k }: { k: LocalizedTextKey }) {
  const { t } = useLanguage();
  return <>{textAccessors[k](t)}</>;
}

export function ToolTitle({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  return <>{getToolText(locale, slug).title}</>;
}

export function ToolDescription({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  return <>{getToolText(locale, slug).description}</>;
}
