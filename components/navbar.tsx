"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Only check isHome after component mounts to avoid hydration mismatch
  const isHome = mounted && pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/blog");
  };

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
      // Clear hash from URL without adding to history
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    // Clear hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const navItems = [
    { key: "nav.about", id: "about" },
    { key: "nav.products", id: "products" },
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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${scrolled ? "border-border/30 shadow-2xl" : "border-border/10"
        }`}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px) saturate(180%) brightness(1.1)",
        WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.1)",
        boxShadow: scrolled
          ? "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
          : "0 4px 16px 0 rgba(31, 38, 135, 0.05)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isHome ? (
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: scrolled ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Logo className="h-9 w-auto sm:h-10 transition-all group-hover:drop-shadow-lg" />
                {/* Santa hat on logo */}
                <span className="absolute -top-2 -right-1 text-sm">🎅</span>
              </motion.div>
            </motion.button>
          ) : (
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Logo className="h-9 w-auto sm:h-10 transition-all group-hover:drop-shadow-lg" />
                {/* Santa hat on logo */}
                <span className="absolute -top-2 -right-1 text-sm">🎅</span>
              </motion.div>
            </Link>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
          {isHome ? (
            <button
              onClick={scrollToTop}
              className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
            >
              {t("nav.home")}
            </button>
          ) : (
            <Link
              href="/"
              className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
            >
              {t("nav.home")}
            </Link>
          )}
          {navItems.map((item) =>
            isHome ? (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link
                key={item.key}
                href={`/#${item.id}`}
                className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
              >
                {t(item.key)}
              </Link>
            )
          )}
          <button
            onClick={handleBlogClick}
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2 py-1"
          >
            {t("nav.blog")}
          </button>
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
                {isHome ? (
                  <button
                    className="text-sm font-medium transition-colors hover:text-primary text-left"
                    onClick={scrollToTop}
                  >
                    {t("nav.home")}
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-primary text-left"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                )}
                {navItems.map((item) =>
                  isHome ? (
                    <button
                      key={item.key}
                      className="text-sm font-medium transition-colors hover:text-primary text-left"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {t(item.key)}
                    </button>
                  ) : (
                    <Link
                      key={item.key}
                      href={`/#${item.id}`}
                      className="text-sm font-medium transition-colors hover:text-primary text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  )
                )}
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={handleBlogClick}
                >
                  {t("nav.blog")}
                </button>
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
