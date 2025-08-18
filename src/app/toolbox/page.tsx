"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ToolboxPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Toolbox",
      description: "Tools, configs, and resources used regularly",
    },
    sv: {
      title: "Verktygslåda",
      description:
        "Verktyg, konfigurationer och resurser som används regelbundet",
    },
    fa: {
      title: "جعبه ابزار",
      description: "ابزارها، پیکربندی‌ها و منابع مورد استفاده منظم",
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
