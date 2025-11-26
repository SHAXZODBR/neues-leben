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
      className="w-full py-20 bg-muted/50"
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              {t("infrastructure.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
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
                <div className="p-3 bg-primary/10 rounded-full">
                  <Warehouse className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("infrastructure.warehouse.title")}
                </h3>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("infrastructure.warehouse.description")}
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-xl shadow-sm border border-primary/20">
                <p className="font-medium text-foreground">
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
                <div className="bg-card/95 p-4 rounded-lg shadow-lg max-w-xs text-center border border-border">
                  <h4 className="text-xl font-bold text-foreground">
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
                <div className="bg-card/95 p-4 rounded-lg shadow-lg max-w-xs text-center border border-border">
                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {t("infrastructure.logistics.modern")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("infrastructure.logistics.efficient")}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("infrastructure.logistics.title")}
                </h3>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("infrastructure.logistics.description")}
                </p>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Thermometer className="h-6 w-6 text-primary" />
                </div>
                <p className="text-foreground">
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
