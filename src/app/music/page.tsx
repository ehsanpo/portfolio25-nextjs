"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function MusicPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Music",
      description:
        "Personal music projects, collaborations, and creative works",
    },
    sv: {
      title: "Musik",
      description: "Personliga musikprojekt, samarbeten och kreativa verk",
    },
    fa: {
      title: "موسیقی",
      description: "پروژه‌های موسیقی شخصی، همکاری‌ها و آثار خلاق",
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
