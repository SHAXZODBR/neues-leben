"use client"

import { useLanguage } from "@/contexts/language-context"
import Logo from "@/components/logo"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button onClick={scrollToTop} className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-josefin-sans text-xl font-semibold tracking-tight">NEUES LEBEN</span>
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ООО "Neues Leben" – дистрибьюторская компания, осуществляющая свою деятельность в сфере фармацевтической
              индустрии на рынке Узбекистана.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">О компании</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  О нас
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("mission")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Миссия
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("values")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Ценности
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Команда
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Деятельность</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("partners")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Партнеры
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("infrastructure")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Инфраструктура
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("coverage")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Покрытие
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("achievements")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Достижения
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">Ташкент, Узбекистан</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">+998 71 123 4567</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">info@neuesleben.com</li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {currentYear} Neues Leben. Все права защищены.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
            Мы открыты для взаимовыгодного и долгосрочного сотрудничества
          </p>
        </div>
      </div>
    </footer>
  )
}
