"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutHighlightsPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Career Highlights",
      description: "Key achievements and milestones",
    },
    sv: {
      title: "Karriärhöjdpunkter",
      description: "Viktiga prestationer och milstolpar",
    },
    fa: {
      title: "نکات برجسته شغلی",
      description: "دستاوردها و نقاط عطف کلیدی",
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
