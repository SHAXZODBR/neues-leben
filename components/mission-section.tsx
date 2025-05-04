"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Heart, Shield, Users } from "lucide-react"

export default function MissionSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="mission" className="w-full py-16 sm:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
                {t("mission.title")}
              </h2>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("mission.paragraph1")}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("mission.paragraph2")}
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <p className="text-base sm:text-lg font-medium text-primary-800 dark:text-primary-300">
                  {t("mission.healthFocus")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 relative h-[350px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8 w-full max-w-md sm:max-w-lg">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                  <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 dark:text-primary-400 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t("mission.protection")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("mission.protectionDesc")}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 dark:text-primary-400 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t("mission.community")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("mission.communityDesc")}</p>
                </div>
                <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                  <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 dark:text-primary-400 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {t("mission.care")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("mission.careDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
