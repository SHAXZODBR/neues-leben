"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Award, Compass, Target, Headphones } from "lucide-react";

export default function ValuesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: t("values.honesty.title"),
      description: t("values.honesty.description"),
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: t("values.professionalism.title"),
      description: t("values.professionalism.description"),
    },
    {
      icon: <Compass className="h-12 w-12 text-primary" />,
      title: t("values.leadership.title"),
      description: t("values.leadership.description"),
    },
    {
      icon: <Target className="h-12 w-12 text-primary" />,
      title: t("values.aspiration.title"),
      description: t("values.aspiration.description"),
    },
    {
      icon: <Headphones className="h-12 w-12 text-primary" />,
      title: t("values.support.title"),
      description: t("values.support.description"),
    },
  ];

  return (
    <section id="values" className="w-full py-20 bg-muted/50">
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
              {t("values.title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
              {t("values.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left pulsing heart circle */}
          <motion.div
            className="relative h-[400px] sm:h-[600px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <div className="relative w-[85%] h-[85%] max-w-[280px] sm:max-w-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border-4 border-primary/20 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-3/4 h-3/4 border-4 border-primary/30 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-1/2 h-1/2 border-4 border-primary/40 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-card p-4 sm:p-8 rounded-full shadow-lg border border-border">
                    <Heart className="h-20 w-20 sm:h-24 sm:w-24 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right values list */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex-shrink-0 w-full md:w-64 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-base sm:text-lg shadow-md text-center">
                    {value.title}
                  </div>
                  <div className="flex-grow bg-card p-4 rounded-lg shadow-sm border border-border">
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
