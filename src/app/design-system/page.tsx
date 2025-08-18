"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function DesignSystemPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Design System",
      description: "Unified brand and UI guidelines with reusable components",
    },
    sv: {
      title: "Designsystem",
      description:
        "Enhetliga varumärkes- och UI-riktlinjer med återanvändbara komponenter",
    },
    fa: {
      title: "سیستم طراحی",
      description:
        "راهنمای یکپارچه برند و رابط کاربری با کامپوننت‌های قابل استفاده مجدد",
    },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div className={`max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <p className="text-gray-600">{t.description}</p>
    </div>
  );
}
