"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { testimonials } from "@/lib/testimonials-data";
import { Quote, Star } from "lucide-react";


export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10 mb-12">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("testimonials.badge")}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
            {t("testimonials.title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("testimonials.description")}
          </p>
        </motion.div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 py-4"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[400px] bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-4 leading-relaxed">
                  "{testimonial.content[language as keyof typeof testimonial.content]}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {testimonial.title[language as keyof typeof testimonial.title]}
                    </p>
                    <p className="text-xs text-primary truncate">
                      {testimonial.company[language as keyof typeof testimonial.company]}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="container px-4 md:px-6 mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-muted-foreground">
          {t("testimonials.cta")}
        </p>
      </motion.div>
    </section>
  );
}
