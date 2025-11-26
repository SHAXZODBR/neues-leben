"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Shield, Users } from "lucide-react";

export default function MissionSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="mission" className="w-full py-16 sm:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side content */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                {t("mission.title")}
              </h2>

              <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border border-border">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t("mission.paragraph1")}
                </p>
              </div>

              <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border border-border">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t("mission.paragraph2")}
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {t("mission.healthFocus")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side cards with icons */}
          <motion.div
            className="order-1 md:order-2 relative h-[350px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 p-3 sm:p-6 w-[92%] max-w-[320px] sm:max-w-lg">
                {/* Protection */}
                <div className="bg-card p-3 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-border">
                  <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-primary mb-2 sm:mb-4" />
                  <h3 className="text-base sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("mission.protection")}
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground">
                    {t("mission.protectionDesc")}
                  </p>
                </div>

                {/* Community */}
                <div className="bg-card p-3 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-border">
                  <Users className="h-8 w-8 sm:h-12 sm:w-12 text-primary mb-2 sm:mb-4" />
                  <h3 className="text-base sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("mission.community")}
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground">
                    {t("mission.communityDesc")}
                  </p>
                </div>

                {/* Care */}
                <div className="col-span-1 sm:col-span-2 bg-card p-3 sm:p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-border">
                  <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-primary mb-2 sm:mb-4" />
                  <h3 className="text-base sm:text-xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("mission.care")}
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground">
                    {t("mission.careDesc")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
