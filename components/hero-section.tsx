"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Logo from "@/components/logo"

export default function HeroSection() {
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="w-full min-h-[90vh] py-12 md:py-24 lg:py-32 relative overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96">
          <Logo className="w-full h-full text-primary" />
        </div>
        <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96">
          <Logo className="w-full h-full text-primary" />
        </div>
        <div className="absolute top-1/2 right-1/4 w-48 md:w-64 h-48 md:h-64 transform -translate-y-1/2">
          <Logo className="w-full h-full text-primary" />
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-6"
          >
            <Logo size="large" className="w-16 h-16 sm:w-24 sm:h-24" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-gray-700 dark:text-gray-200">
              NEUES LEBEN
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-primary-700 dark:text-primary-300 max-w-3xl"
          >
            {t("hero.tagline")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("hero.description")}
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("hero.description2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => scrollToSection("about")} className="bg-primary hover:bg-primary/90">
                {t("hero.learnMore")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                {t("hero.contactUs")}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                <Logo size="large" className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg max-w-xs sm:max-w-sm">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                      {t("hero.established")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t("hero.quality")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
