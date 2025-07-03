"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Globe, Package } from "lucide-react"

export default function PartnersSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const partners = [
    { country: t("partners.southKorea"), code: "KR" },
    { country: t("partners.poland"), code: "PL" },
    { country: t("partners.china"), code: "CN" },
    { country: t("partners.india"), code: "IN" },
  ]

  return (
    <section id="partners" className="w-full py-20 bg-primary-900 text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">{t("partners.title")}</h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed">{t("partners.subtitle")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 mb-16">
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950 flex items-center justify-center">
              <div className="relative w-full max-w-4xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="h-96 w-96 text-primary-700/30" />
                </div>
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="text-4xl mb-2 flex items-center justify-center min-h-[3rem]">
                        <span className="text-6xl">{getCountryFlag(partner.code)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{partner.country}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="h-8 w-8" />
                {t("partners.countries")}
              </h3>
              <ul className="space-y-4">
                {partners.map((partner, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl min-w-[2rem] flex items-center justify-center">
                      <span className="text-3xl">{getCountryFlag(partner.code)}</span>
                    </div>
                    <span className="text-lg text-white/90">{partner.country}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Package className="h-8 w-8" />
                {t("partners.products")}
              </h3>
              <p className="text-xl text-white/90 mb-8">{t("partners.productsDescription")}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-white/20 rounded-lg p-4 flex items-center justify-center h-24 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <span className="text-white font-medium">
                      {t("partners.product")} {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function getCountryFlag(countryCode: string) {
  const flags: { [key: string]: string } = {
    KR: "🇰🇷",
    PL: "🇵🇱",
    CN: "🇨🇳",
    IN: "🇮🇳",
  }

  // Return the flag emoji if available, otherwise return a styled country code
  return flags[countryCode] || countryCode
}
