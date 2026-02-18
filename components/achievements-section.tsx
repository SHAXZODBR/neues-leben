"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Trophy, TrendingUp, Award } from "lucide-react"

export default function AchievementsSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
  const employees = [14, 32, 54, 76, 92, 121, 135, 154]

  return (
    <section id="achievements" className="w-full py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              {t("achievements.title")}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 mb-16">
          <motion.div
            className="bg-card rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t("achievements.award")}</h3>
            </div>

            <p className="text-lg text-muted-foreground">{t("achievements.description")}</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h4 className="font-bold text-foreground">{t("achievements.award1.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("achievements.award1.year")}</p>
                </div>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h4 className="font-bold text-foreground">{t("achievements.award2.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("achievements.award2.year")}</p>
                </div>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h4 className="font-bold text-foreground">{t("achievements.award3.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("achievements.award3.year")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary-600" />
                {t("achievements.growth")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("achievements.growthDescription")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative h-[400px] bg-card rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t("achievements.growthChart")}
            </h3>

            <div className="absolute bottom-16 left-0 right-0 flex justify-between px-6">
              {years.map((year, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  {year}
                </div>
              ))}
            </div>

            <div className="absolute bottom-20 left-6 right-6 h-px bg-gray-200 dark:bg-gray-700"></div>

            <div className="absolute bottom-20 left-0 right-0 flex justify-between px-6 items-end">
              {employees.map((count, index) => {
                const height = (count / 154) * 250
                return (
                  <div key={index} className="flex items-end justify-center w-8">
                    <motion.div
                      className="w-full bg-primary-600 dark:bg-primary-500 rounded-t-sm relative group"
                      style={{ height: `${height}px` }}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${height}px` } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 * index,
                        ease: "easeOut",
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary-700 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
