import type { Language } from "@/contexts/language-context";

// Category translations
export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "Clinical Operations": {
    en: "Clinical Operations",
    uz: "Klinik Operatsiyalar",
    ru: "Клинические Операции",
    de: "Klinische Operationen",
  },
  "Cold Chain": {
    en: "Cold Chain",
    uz: "Sovuq Zanjir",
    ru: "Холодовая Цепь",
    de: "Kühlkette",
  },
  "Regulatory Affairs": {
    en: "Regulatory Affairs",
    uz: "Tartibga Solish Ishlari",
    ru: "Регуляторные Вопросы",
    de: "Regulatorische Angelegenheiten",
  },
  "Customer Stories": {
    en: "Customer Stories",
    uz: "Mijozlar Hikoyalari",
    ru: "Истории Клиентов",
    de: "Kundengeschichten",
  },
  "Pharmacy Practice": {
    en: "Pharmacy Practice",
    uz: "Dorixona Amaliyoti",
    ru: "Фармацевтическая Практика",
    de: "Apothekenpraxis",
  },
  "Public Health": {
    en: "Public Health",
    uz: "Jamoat Salomatligi",
    ru: "Общественное Здравоохранение",
    de: "Öffentliche Gesundheit",
  },
  "Supply Chain": {
    en: "Supply Chain",
    uz: "Ta'minot Zanjiri",
    ru: "Цепь Поставок",
    de: "Lieferkette",
  },
  "Medical Innovation": {
    en: "Medical Innovation",
    uz: "Tibbiy Innovatsiya",
    ru: "Медицинские Инновации",
    de: "Medizinische Innovation",
  },
};

/**
 * Get translated category name
 * @param categoryKey - Category key (English name)
 * @param language - Target language
 * @returns Translated category name
 */
export function getCategoryTranslation(
  categoryKey: string,
  language: Language
): string {
  return CATEGORY_TRANSLATIONS[categoryKey]?.[language] || categoryKey;
}

/**
 * Get all category keys (English names used for storage)
 */
export function getCategoryKeys(): string[] {
  return Object.keys(CATEGORY_TRANSLATIONS);
}
