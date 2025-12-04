"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Building2, Globe } from "lucide-react";

export default function CoverageSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
  ];

  const stats = [
    { number: "13+", label: t("coverage.stats.regions") },
    { number: "135+", label: t("coverage.stats.team") },
    { number: "24/7", label: t("coverage.stats.network") },
  ];

  return (
    <section id="coverage" className="w-full py-16 sm:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              {t("coverage.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t("coverage.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Distribution Network - First on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-xl text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("coverage.mapTitle")}
                </h3>
              </div>
              <p className="opacity-90 mb-6">{t("coverage.mapDescription")}</p>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-muted/50 rounded-xl overflow-hidden border border-border">
              <div className="relative w-full h-[320px]">
                <iframe
                  title="NEUES LEBEN Location"
                  src="https://www.google.com/maps?q=41.302743,69.350461&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 left-4 flex items-start gap-3 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-border">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {t("coverage.uzbekistanMap")}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t("coverage.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regional Coverage - Second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <div className="bg-muted/50 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t("coverage.offices")}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("coverage.officesDescription")}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="bg-card p-3 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {region}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
              <p className="text-lg font-medium text-foreground">
                {t("coverage.cooperation")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
