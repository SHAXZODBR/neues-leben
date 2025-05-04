"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin } from "lucide-react"

export default function CoverageSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t("coverage.offices")}</h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("coverage.officesDescription")}
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl shadow-md">
              <p className="text-lg font-medium text-primary-800 dark:text-primary-300">{t("coverage.cooperation")}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                <svg viewBox="0 0 800 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Simplified map of Uzbekistan */}
                  <path
                    d="M150,250 C150,150 250,100 350,100 C450,100 550,150 650,200 C750,250 750,350 650,400 C550,450 450,450 350,400 C250,350 150,350 150,250 Z"
                    fill="white"
                    stroke="#3D8B48"
                    strokeWidth="4"
                  />
                  {/* Distribution points */}
                  {[
                    { x: 250, y: 200 },
                    { x: 350, y: 150 },
                    { x: 450, y: 180 },
                    { x: 550, y: 250 },
                    { x: 350, y: 300 },
                    { x: 450, y: 350 },
                    { x: 250, y: 350 },
                    { x: 200, y: 250 },
                    { x: 300, y: 250 },
                    { x: 400, y: 250 },
                    { x: 500, y: 300 },
                    { x: 600, y: 300 },
                  ].map((point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.y} r="12" fill="#3D8B48" />
                      <circle cx={point.x} cy={point.y} r="6" fill="white" />
                    </g>
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t("coverage.mapTitle")}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t("coverage.mapDescription")}</p>
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
