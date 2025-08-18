"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";

interface Messages {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function useTranslations(namespace: string) {
  const { currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messageModule = await import(
          `../../messages/${currentLanguage}.json`
        );
        setMessages(messageModule.default);
      } catch (error) {
        console.error(
          `Failed to load messages for locale ${currentLanguage}:`,
          error
        );
        // Fallback to English
        try {
          const fallbackModule = await import(`../translations/en.json`);
          setMessages(fallbackModule.default);
        } catch (fallbackError) {
          console.error("Failed to load fallback messages:", fallbackError);
        }
      }
    };

    loadMessages();
  }, [currentLanguage]);

  return function t(key: string): string {
    const keys = key.split(".");
    let value = messages[namespace];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };
}
