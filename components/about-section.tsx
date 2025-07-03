"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="w-full py-16 sm:py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("about.title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              {t("about.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center p-3 sm:p-5 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg w-[90%] max-w-[280px] sm:max-w-md">
                <h3 className="text-base sm:text-2xl font-bold text-primary-700 dark:text-primary-300 mb-1 sm:mb-2 leading-snug">
                  {t("about.founded")}
                </h3>
                <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 leading-snug">
                  {t("about.warehouse")}
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 opacity-30"></div>
              <div className="absolute w-3/4 h-3/4 border-4 border-primary-500/30 rounded-xl"></div>
              <div className="absolute w-1/2 h-1/2 border-4 border-primary-500/20 rounded-xl"></div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.paragraph1")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.paragraph2")}
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-primary">
              <p className="text-base sm:text-lg font-medium text-primary-800 dark:text-primary-300">
                {t("about.conclusion")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
