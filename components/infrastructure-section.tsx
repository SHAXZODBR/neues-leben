"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Warehouse, Truck, Thermometer } from "lucide-react";

export default function InfrastructureSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="infrastructure"
      className="w-full py-20 bg-gray-50 dark:bg-gray-900"
    >
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
              {t("infrastructure.title")}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {t("infrastructure.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={ref}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <Warehouse className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {t("infrastructure.warehouse.title")}
                </h3>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("infrastructure.warehouse.description")}
                </p>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl shadow-md">
                <p className="font-medium text-primary-800 dark:text-primary-300">
                  {t("infrastructure.warehouse.size")}
                </p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/warehouse.png"
                alt="Modern Warehouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg max-w-xs text-center">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {t("infrastructure.warehouse.standards")}
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="order-2 md:order-1 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/labis.jpg"
                alt="Modern Logistics Fleet"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg max-w-xs text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Современный автопарк
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Эффективная доставка по всей стране
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <Truck className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {t("infrastructure.logistics.title")}
                </h3>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("infrastructure.logistics.description")}
                </p>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-full">
                  <Thermometer className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-primary-800 dark:text-primary-300">
                  {t("infrastructure.logistics.temperature")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
