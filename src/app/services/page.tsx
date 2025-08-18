"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Services",
      subtitle: "Professional offerings, specialties, and consulting services",
      offerings: {
        title: "Service Offerings",
        services: [
          {
            title: "Frontend Development",
            description: "Modern React, Next.js, and TypeScript applications",
          },
          {
            title: "Backend Development",
            description: "Scalable APIs and server-side solutions",
          },
          {
            title: "Full-Stack Development",
            description: "End-to-end web application development",
          },
          {
            title: "UI/UX Design",
            description: "User-centered design and interface development",
          },
        ],
      },
      consulting: {
        title: "Consulting Details",
        description:
          "I provide technical consulting for web development projects, code reviews, and architecture decisions.",
      },
    },
    sv: {
      title: "Tjänster",
      subtitle: "Professionella erbjudanden, specialiteter och konsulttjänster",
      offerings: {
        title: "Tjänsteutbud",
        services: [
          {
            title: "Frontend-utveckling",
            description: "Moderna React, Next.js och TypeScript-applikationer",
          },
          {
            title: "Backend-utveckling",
            description: "Skalbara API:er och server-side lösningar",
          },
          {
            title: "Full-Stack utveckling",
            description: "End-to-end webbutveckling",
          },
          {
            title: "UI/UX Design",
            description: "Användarcentrerad design och gränssnittsutveckling",
          },
        ],
      },
      consulting: {
        title: "Konsultdetaljer",
        description:
          "Jag tillhandahåller teknisk konsultation för webbutvecklingsprojekt, kodgranskning och arkitekturbeslut.",
      },
    },
    fa: {
      title: "خدمات",
      subtitle: "ارائه خدمات حرفه‌ای، تخصص‌ها و خدمات مشاوره‌ای",
      offerings: {
        title: "ارائه خدمات",
        services: [
          {
            title: "توسعه Frontend",
            description: "اپلیکیشن‌های مدرن React، Next.js و TypeScript",
          },
          {
            title: "توسعه Backend",
            description: "API های مقیاس‌پذیر و راه‌حل‌های سمت سرور",
          },
          {
            title: "توسعه Full-Stack",
            description: "توسعه اپلیکیشن وب از ابتدا تا انتها",
          },
          {
            title: "طراحی UI/UX",
            description: "طراحی کاربرمحور و توسعه رابط کاربری",
          },
        ],
      },
      consulting: {
        title: "جزئیات مشاوره",
        description:
          "من مشاوره فنی برای پروژه‌های توسعه وب، بررسی کد و تصمیمات معماری ارائه می‌دهم.",
      },
    },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div className={`max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Service Offerings */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">{t.offerings.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.offerings.services.map((service, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Consulting Details */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">{t.consulting.title}</h2>
        <div className="bg-primary/10 p-6 rounded-lg">
          <p className="text-lg">{t.consulting.description}</p>
        </div>
      </section>
    </div>
  );
}
