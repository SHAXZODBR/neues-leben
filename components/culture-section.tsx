"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Award, Globe, Users } from "lucide-react"

export default function CultureSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cultureItems = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t("culture.family.title"),
      description: t("culture.family.description"),
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: t("culture.achievements.title"),
      description: t("culture.achievements.description"),
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t("culture.internships.title"),
      description: t("culture.internships.description"),
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: t("culture.events.title"),
      description: t("culture.events.description"),
    },
  ]

  return (
    <section id="culture" className="w-full py-20 bg-muted/50">
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
              {t("culture.title")}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card p-6 rounded-xl shadow-md">
              <p className="text-lg text-muted-foreground leading-relaxed">{t("culture.paragraph1")}</p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
              <p className="text-lg text-muted-foreground leading-relaxed">{t("culture.paragraph2")}</p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
              <p className="text-lg text-muted-foreground leading-relaxed">{t("culture.paragraph3")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {cultureItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
