"use client"

import Link from "next/link"
import Logo from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const router = useRouter()

  const navigateToHome = () => {
    router.push("/")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const scrollToSection = (sectionId: string) => {
    // First check if we're on the home page
    if (window.location.pathname !== "/") {
      // If not, navigate to home page first, then scroll to section after a delay
      router.push("/")
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      // If already on home page, just scroll to section
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <button onClick={navigateToHome} className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-josefin-sans text-lg font-semibold tracking-tight">NEUES LEBEN</span>
            </button>
            <p className="text-sm text-muted-foreground max-w-md">{t("footer.description")}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{t("footer.company")}</h3>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection("mission")}
                  className="text-sm text-muted-foreground hover:text-primary text-left"
                >
                  {t("footer.mission")}
                </button>
                <button
                  onClick={() => scrollToSection("values")}
                  className="text-sm text-muted-foreground hover:text-primary text-left"
                >
                  {t("footer.values")}
                </button>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-muted-foreground hover:text-primary text-left"
                >
                  {t("footer.team")}
                </button>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.careers")}
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{t("footer.legal")}</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.privacy")}
                </Link>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.terms")}
                </Link>
                <Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.cookie")}
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{t("nav.contact")}</h3>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-primary text-left"
                >
                  {t("nav.contact")}
                </button>
                <a href="mailto:info@neuesleben.com" className="text-sm text-muted-foreground hover:text-primary">
                  info@neuesleben.com
                </a>
                <a href="tel:+998711234567" className="text-sm text-muted-foreground hover:text-primary">
                  +998 71 123 4567
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Neues Leben. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
