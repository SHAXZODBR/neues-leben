"use client";

import { useLanguage } from "@/contexts/language-context";
import Logo from "@/components/logo";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button onClick={scrollToTop} className="flex items-center gap-2">
              <Logo className="h-16 w-16" />
              <span className="font-josefin-sans text-xl font-semibold tracking-tight">
                NEUES LEBEN
              </span>
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("footer.description")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              {t("footer.about")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.aboutUs")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("mission")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.mission")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("values")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.values")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.team")}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              {t("footer.activities")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("partners")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.partners")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("infrastructure")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.infrastructure")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("coverage")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.coverage")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("achievements")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t("footer.achievements")}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              {t("footer.contacts")}
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                {t("footer.location")}
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                +998 90 903 03 31
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                +998 97 769 64 80
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                info@neuesleben.uz
              </li>
            </ul>
            {/* Socials */}
            <div className="flex space-x-4 pt-2">
              {/* ... SVG icons (unchanged) ... */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Neues Leben. {t("footer.rights")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
            {t("footer.openToCooperation")}
          </p>
        </div>
      </div>
    </footer>
  );
}
