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
    <section
      id="coverage"
      className="w-full py-16 sm:py-20 bg-white dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("coverage.title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              {t("coverage.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Regional Coverage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {t("coverage.offices")}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("coverage.officesDescription")}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {region}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl border-l-4 border-primary">
              <p className="text-lg font-medium text-primary-800 dark:text-primary-300">
                {t("coverage.cooperation")}
              </p>
            </div>
          </motion.div>

          {/* Distribution Network */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6" />
                <h3 className="text-xl font-semibold">
                  {t("coverage.mapTitle")}
                </h3>
              </div>
              <p className="text-primary-100 mb-6">
                {t("coverage.mapDescription")}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-primary-100">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("coverage.uzbekistanMap")}
                </h4>

                <p className="text-gray-500 dark:text-gray-400">
                  {t("coverage.description")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
