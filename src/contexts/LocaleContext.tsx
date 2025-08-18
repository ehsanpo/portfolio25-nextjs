"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Locale = "en" | "sv" | "fa";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const isRTL = locale === "fa";

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Update document direction for RTL support
    document.documentElement.dir = newLocale === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    // Set initial direction and language
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
