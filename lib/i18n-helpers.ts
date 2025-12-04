import type { Language } from "@/contexts/language-context";

/**
 * Extract a localized field from an i18n object with fallback logic
 * @param i18nObject - JSONB object with language keys (e.g., {en: "Hello", uz: "Salom"})
 * @param language - Preferred language code
 * @param fallbackLanguage - Fallback language (default: "en")
 * @returns Localized string or empty string if not found
 */
export function getLocalizedField(
  i18nObject: Record<string, string> | null | undefined,
  language: Language,
  fallbackLanguage: Language = "en"
): string {
  if (!i18nObject || typeof i18nObject !== "object") {
    return "";
  }

  // Try preferred language
  if (i18nObject[language]) {
    return i18nObject[language];
  }

  // Try fallback language
  if (i18nObject[fallbackLanguage]) {
    return i18nObject[fallbackLanguage];
  }

  // Return first available language
  const firstAvailable = Object.values(i18nObject).find((val) => val);
  return firstAvailable || "";
}

/**
 * Check if a translation exists for a specific language
 * @param i18nObject - JSONB object with language keys
 * @param language - Language code to check
 * @returns True if translation exists and is non-empty
 */
export function hasTranslation(
  i18nObject: Record<string, string> | null | undefined,
  language: Language
): boolean {
  if (!i18nObject || typeof i18nObject !== "object") {
    return false;
  }
  return Boolean(i18nObject[language] && i18nObject[language].trim());
}

/**
 * Get list of available languages for a post
 * @param post - Post object with i18n fields
 * @returns Array of language codes that have content
 */
export function getAvailableLanguages(post: {
  title_i18n?: Record<string, string> | null;
  summary_i18n?: Record<string, string> | null;
  content_i18n?: Record<string, string> | null;
}): Language[] {
  const languages: Set<Language> = new Set();
  const supportedLanguages: Language[] = ["en", "uz", "ru", "de"];

  supportedLanguages.forEach((lang) => {
    if (
      hasTranslation(post.title_i18n, lang) ||
      hasTranslation(post.content_i18n, lang)
    ) {
      languages.add(lang);
    }
  });

  return Array.from(languages);
}

/**
 * Get language display name
 * @param language - Language code
 * @returns Display name for the language
 */
export function getLanguageDisplayName(language: Language): string {
  const names: Record<Language, string> = {
    en: "EN",
    uz: "UZ",
    ru: "RU",
    de: "DE",
  };
  return names[language] || language.toUpperCase();
}
