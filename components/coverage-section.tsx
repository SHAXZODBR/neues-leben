"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Building2, Users, Truck } from "lucide-react"

export default function CoverageSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const regions = [
    "Tashkent City",
    "Tashkent Region",
    "Samarkand",
    "Bukhara",
    "Andijan",
    "Fergana",
    "Namangan",
    "Kashkadarya",
    "Surkhandarya",
    "Jizzakh",
    "Navoi",
    "Khorezm",
    "Karakalpakstan",
  ]

  return (
    <section id="coverage" className="w-full py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("coverage.title")}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">{t("coverage.subtitle")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-400 mb-4 flex items-center gap-3">
                <Building2 className="h-8 w-8" />
                {t("coverage.offices")}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t("coverage.officesDescription")}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{region}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl shadow-md border-l-4 border-primary">
              <p className="text-lg font-medium text-primary-800 dark:text-primary-300">{t("coverage.cooperation")}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[500px] rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center">
              <div className="relative w-full h-full p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 border-4 border-primary-500/30 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-60 h-60 border-4 border-primary-500/50 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border-4 border-primary-500/70 rounded-full"></div>
                </div>

                {/* Central hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
                    <Building2 className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>

                {/* Distribution points */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
                    <Truck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
                    <Truck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
                    <Truck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
                    <Truck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg text-center">
                    <h4 className="text-lg font-bold text-primary-700 dark:text-primary-300">
                      {t("coverage.mapTitle")}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("coverage.mapDescription")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">13+</h3>
            <p className="text-gray-600 dark:text-gray-400">Regions Covered</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">135+</h3>
            <p className="text-gray-600 dark:text-gray-400">Team Members</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">24/7</h3>
            <p className="text-gray-600 dark:text-gray-400">Distribution Network</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
