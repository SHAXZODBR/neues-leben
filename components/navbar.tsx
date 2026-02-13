"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const handleNewsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/news");
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    const isScrolled = offset > 10;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
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

  // Primary nav items (always visible) - reduced to essential items
  const primaryNavItems = [
    { key: "nav.products", id: "products" },
    { key: "nav.team", id: "team" },
    { key: "nav.contact", id: "contact" },
  ];

  // Secondary items for "More" dropdown
  const moreNavItems = [
    { key: "nav.about", id: "about" },
    { key: "nav.mission", id: "mission" },
    { key: "nav.values", id: "values" },
    { key: "nav.culture", id: "culture" },
    { key: "nav.achievements", id: "achievements" },
    { key: "nav.partners", id: "partners" },
    { key: "nav.infrastructure", id: "infrastructure" },
    { key: "nav.coverage", id: "coverage" },
  ];

  // All items for mobile menu
  const allNavItems = [...primaryNavItems, ...moreNavItems];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        background: scrolled
          ? "var(--navbar-bg-scrolled, rgba(255, 255, 255, 0.72))"
          : "var(--navbar-bg, rgba(255, 255, 255, 0.55))",
        borderBottom: scrolled
          ? "1px solid var(--navbar-border-scrolled, rgba(255, 255, 255, 0.3))"
          : "1px solid var(--navbar-border, rgba(255, 255, 255, 0.15))",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transform: "translateZ(0)" }}
                className="relative"
              >
                <Logo className="h-9 w-auto sm:h-10 transition-all group-hover:drop-shadow-lg" />
              </motion.div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NEUES LEBEN
              </span>
            </motion.button>
          ) : (
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transform: "translateZ(0)" }}
                className="relative"
              >
                <Logo className="h-9 w-auto sm:h-10 transition-all group-hover:drop-shadow-lg" />
              </motion.div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NEUES LEBEN
              </span>
            </Link>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {isHome ? (
            <button
              onClick={scrollToTop}
              className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
            >
              {t("nav.home")}
            </button>
          ) : (
            <Link
              href="/"
              className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
            >
              {t("nav.home")}
            </Link>
          )}

          {/* Primary nav items */}
          {primaryNavItems.map((item) =>
            isHome ? (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link
                key={item.key}
                href={`/#${item.id}`}
                className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
              >
                {t(item.key)}
              </Link>
            )
          )}

          {/* More dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5 flex items-center gap-1">
                {t("nav.more") || "More"}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {moreNavItems.map((item) => (
                <DropdownMenuItem key={item.key} asChild>
                  {isHome ? (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left cursor-pointer"
                    >
                      {t(item.key)}
                    </button>
                  ) : (
                    <Link href={`/#${item.id}`} className="w-full cursor-pointer">
                      {t(item.key)}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Blog link */}
          <button
            onClick={handleBlogClick}
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
          >
            {t("nav.blog")}
          </button>

          {/* News link */}
          <button
            onClick={handleNewsClick}
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
          >
            {t("nav.news")}
          </button>

          {/* Training link */}
          <Link
            href="/training"
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
          >
            {t("nav.training")}
          </Link>

          {/* Regulatory Services link */}
          <Link
            href="/regulatory-services"
            className="text-sm whitespace-nowrap font-medium transition-colors hover:text-primary px-2.5 py-1.5 rounded-md hover:bg-primary/5"
          >
            {t("nav.regulatory")}
          </Link>
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
              className="overflow-y-auto w-[280px] sm:w-[350px] overscroll-contain"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
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
                {allNavItems.map((item) =>
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
                <Link
                  href="/news"
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.news")}
                </Link>
                <Link
                  href="/training"
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.training")}
                </Link>
                <Link
                  href="/regulatory-services"
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.regulatory")}
                </Link>
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
