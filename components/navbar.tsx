"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from "@/components/logo"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import ThemeToggle from "@/components/theme-toggle"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navigateToHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const scrollToSection = (sectionId: string) => {
    // First check if we're on the home page
    if (pathname !== "/") {
      // If not, navigate to home page first, then scroll to section after a delay
      router.push("/")
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
          setIsOpen(false)
        }
      }, 100)
    } else {
      // If already on home page, just scroll to section
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={navigateToHome} className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-josefin-sans text-xl font-semibold tracking-tight">NEUES LEBEN</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={navigateToHome} className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.home")}
          </button>
          <button
            onClick={() => scrollToSection("mission")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.mission")}
          </button>
          <button
            onClick={() => scrollToSection("values")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.values")}
          </button>
          <button
            onClick={() => scrollToSection("team")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.team")}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.contact")}
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={navigateToHome}
                >
                  {t("nav.home")}
                </button>
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => scrollToSection("mission")}
                >
                  {t("nav.mission")}
                </button>
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => scrollToSection("values")}
                >
                  {t("nav.values")}
                </button>
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => scrollToSection("team")}
                >
                  {t("nav.team")}
                </button>
                <button
                  className="text-sm font-medium transition-colors hover:text-primary text-left"
                  onClick={() => scrollToSection("contact")}
                >
                  {t("nav.contact")}
                </button>
                <div className="flex items-center gap-4 pt-2">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
