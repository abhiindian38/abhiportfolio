"use client";

import { translations } from "./translations";

export function useLanguage() {
  const t = translations.en;

  return { language: "en", t };
}
