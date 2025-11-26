"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Stethoscope, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import DoctorVerificationModal from "./doctor-verification-modal";

export default function MedicalJournalCTA() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    sessionStorage.setItem("blogVerified", "true");
    router.push("/blog");
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t("nav.blog")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("blog.title")}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">{t("blog.articles")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">{t("blog.specialties")}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all hover:gap-3"
          >
            {t("blog.browseArchive")}
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            {t("blog.forHealthcareProfessionals")}
          </p>
        </motion.div>
      </div>

      <DoctorVerificationModal
        isOpen={showModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </section>
  );
}

