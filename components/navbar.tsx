"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/contexts/language-context";
import ThemeToggle from "@/components/theme-toggle";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { key: "nav.about", id: "about" },
    { key: "nav.mission", id: "mission" },
    { key: "nav.values", id: "values" },
    { key: "nav.team", id: "team" },
    { key: "nav.culture", id: "culture" },
    { key: "nav.achievements", id: "achievements" },
    { key: "nav.partners", id: "partners" },
    { key: "nav.infrastructure", id: "infrastructure" },
    { key: "nav.coverage", id: "coverage" },
    { key: "nav.contact", id: "contact" },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button onClick={scrollToTop} className="flex items-center gap-2">
            <Logo className="h-16 w-16 sm:h-16 sm:w-14 " />
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          <button
            onClick={scrollToTop}
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
          >
            {t("nav.home")}
          </button>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.id)}
              className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
            >
              {t(item.key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-8 w-8"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="overflow-y-auto w-[280px] sm:w-[350px]"
            >
              <div className="flex flex-col gap-6 pt-6">
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={scrollToTop}
                >
                  {t("nav.home")}
                </button>
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    className="text-sm font-medium transition-colors hover:text-primary text-left"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {t(item.key)}
                  </button>
                ))}
                <div className="flex items-center gap-4 pt-4 sm:hidden">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
