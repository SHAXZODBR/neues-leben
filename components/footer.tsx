"use client";

import { useLanguage } from "@/contexts/language-context";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/logo";

export default function Footer() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-border bg-muted/50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button onClick={scrollToTop} className="flex items-center gap-2">
              <Logo className="h-16 w-16" />
              <span className="font-josefin-sans text-xl font-semibold tracking-tight text-foreground">
                NEUES LEBEN
              </span>
            </button>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">{t("footer.about")}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.aboutUs")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("mission")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.mission")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("values")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.values")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.team")}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">
              {t("footer.activities")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("partners")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.partners")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("infrastructure")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.infrastructure")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("coverage")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.coverage")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("achievements")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.achievements")}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">
              {t("footer.contacts")}
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                {t("footer.location")}
              </li>
              <li className="text-sm text-muted-foreground">
                +998 90 903 03 31
              </li>
              <li className="text-sm text-muted-foreground">
                +998 97 769 64 80
              </li>
              <li className="text-sm text-muted-foreground">
                info@neuesleben.uz
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Neues Leben. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              {t("footer.openToCooperation")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
