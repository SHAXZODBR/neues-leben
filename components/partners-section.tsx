"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Globe, Handshake } from "lucide-react"
import Image from "next/image"

export default function PartnersSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const partners = [
    { country: t("partners.southKorea"), code: "KR", flagUrl: "https://flagcdn.com/w80/kr.png" },
    { country: t("partners.poland"), code: "PL", flagUrl: "https://flagcdn.com/w80/pl.png" },
    { country: t("partners.china"), code: "CN", flagUrl: "https://flagcdn.com/w80/cn.png" },
    { country: t("partners.india"), code: "IN", flagUrl: "https://flagcdn.com/w80/in.png" },
  ]

  return (
    <section id="partners" className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Handshake className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">{t("partners.badge")}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">{t("partners.title")}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">{t("partners.subtitle")}</p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />

                <div className="relative flex flex-col items-center text-center space-y-4">
                  {/* Flag Image */}
                  <motion.div
                    className="relative w-16 h-12 rounded overflow-hidden shadow-md"
                    whileHover={{ scale: 1.15, rotate: [-2, 2, -2, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={partner.flagUrl}
                      alt={`${partner.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Country Code badge */}
                  <span className="text-xs font-semibold text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded">
                    {partner.code}
                  </span>

                  {/* Translated country name */}
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {partner.country}
                  </h3>

                  {/* Decorative line */}
                  <div className="h-1 w-8 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-300 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Info */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">{t("partners.globalNetwork")}</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("partners.networkDescription")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
