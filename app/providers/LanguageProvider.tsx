"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  type Locale,
  translations,
  supportedLocales,
} from "@/app/i18n/translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;

    const isRefresh = navigation?.type === "reload";

    if (isRefresh) {
      sessionStorage.removeItem("toolsgift-language");
// eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState("en");
      return;
    }

    const savedLanguage = sessionStorage.getItem(
      "toolsgift-language"
    );

    if (
      savedLanguage &&
      supportedLocales.includes(savedLanguage as Locale)
    ) {
      setLocaleState(savedLanguage as Locale);
    }
  }, []);

  useEffect(() => {
    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Locale>;
      const nextLocale = customEvent.detail;

      if (!supportedLocales.includes(nextLocale)) {
        return;
      }

      setLocaleState(nextLocale);
      sessionStorage.setItem("toolsgift-language", nextLocale);
    }

    window.addEventListener(
      "toolsgift-language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "toolsgift-language-change",
        handleLanguageChange
      );
    };
  }, []);

  const value: LanguageContextType = {
    locale,
    setLocale: (nextLocale) => {
      setLocaleState(nextLocale);
      sessionStorage.setItem("toolsgift-language", nextLocale);
    },
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
