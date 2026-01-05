"use client";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/logo";

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full min-h-[90vh] py-12 md:py-24 lg:py-32 relative overflow-hidden flex items-center">


      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-slate-50/30 to-zinc-50/50 dark:from-slate-950 dark:via-slate-900/30 dark:to-neutral-900 pointer-events-none"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6">

            {/* Badge with inline ornaments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
            </motion.div>

            {/* Main Heading with better visibility */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)"
              }}>
              {t("hero.title")}
            </motion.h1>

            {/* Description with better contrast */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/90 max-w-[600px]"
              style={{
                textShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("about")}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all">
                  {t("hero.cta.primary")}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all">
                  {t("hero.cta.secondary")}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              {/* Pulsing background */}
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo */}
              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <Logo className="w-full h-full max-w-[400px] max-h-[400px] drop-shadow-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
