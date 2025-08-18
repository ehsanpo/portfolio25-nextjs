"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ReactNode, useEffect } from "react";

interface HtmlWrapperProps {
  children: ReactNode;
}

export default function HtmlWrapper({ children }: Readonly<HtmlWrapperProps>) {
  const { currentLanguage, isRTL } = useLanguage();

  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [currentLanguage, isRTL]);

  return <>{children}</>;
}
