"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Building, Globe } from "lucide-react"

export default function CoverageSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Regions of Uzbekistan
  const regions = [
    "Tashkent",
    "Samarkand",
    "Bukhara",
    "Andijan",
    "Fergana",
    "Namangan",
    "Kashkadarya",
    "Surkhandarya",
    "Khorezm",
    "Navoi",
    "Jizzakh",
    "Syrdarya",
    "Karakalpakstan",
  ]

  return (
    <section id="coverage" className="w-full py-20 bg-primary-900 text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">{t("coverage.title")}</h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed">{t("coverage.subtitle")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building className="h-8 w-8" />
                {t("coverage.offices")}
              </h3>
              <p className="text-xl text-white/90 mb-8">{t("coverage.officesDescription")}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {regions.map((region, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 rounded-lg p-3 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-white text-sm">{region}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md border-l-4 border-primary-400">
              <p className="text-lg font-medium text-white">{t("coverage.cooperation")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-64 w-64 text-primary-700/30" />
                  </div>
                  <div className="relative z-10 p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">{t("coverage.mapTitle")}</h3>
                    <p className="text-white/90">{t("coverage.mapDescription")}</p>

                    <div className="mt-8 grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-primary-400 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Tashkent HQ</h4>
                          <p className="text-sm text-white/80">Main Office</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-primary-400 flex items-center justify-center">
                          <Building className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">13 Regional Offices</h4>
                          <p className="text-sm text-white/80">Nationwide Coverage</p>
                        </div>
                      </div>
                    </div>
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
