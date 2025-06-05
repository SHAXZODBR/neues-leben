"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import Logo from "@/components/logo"

export default function ContactSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="w-full py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("contact.title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">{t("contact.subtitle")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("contact.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name")}
                    </label>
                    <Input id="name" placeholder={t("contact.form.namePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")}
                    </label>
                    <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    {t("contact.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{t("contact.info.address.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      100047, Республика Узбекистан г.Ташкент, Яшнабадский район, Ахангаранское шоссе, ул. Паркентская №
                      333
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{t("contact.info.phone.title")}</h3>
                    <div className="space-y-1">
                      <p className="text-gray-600 dark:text-gray-400">+998 90 903 03 31</p>
                      <p className="text-gray-600 dark:text-gray-400">+998 97 769 64 80</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{t("contact.info.email.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t("contact.info.email.value")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <Logo size="large" className="h-12 w-12 sm:h-16 sm:w-16 text-primary-600 dark:text-primary-400" />
              <div className="ml-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">NEUES LEBEN</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("contact.info.tagline")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
