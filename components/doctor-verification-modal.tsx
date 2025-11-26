"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, UserCheck, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

interface DoctorVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DoctorVerificationModal({
  isOpen,
  onConfirm,
  onCancel,
}: DoctorVerificationModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {t("verification.title")}
                  </h2>
                  <p className="text-sm opacity-90">
                    {t("verification.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="flex gap-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">
                    {t("verification.notice")}
                  </p>
                  <p>{t("verification.noticeText")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  {t("verification.confirmCredentials")}
                </h3>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {t("verification.confirmText")}
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={onCancel}
                >
                  {t("verification.cancel")}
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={!isChecked}
                  onClick={onConfirm}
                >
                  {t("verification.confirm")}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                {t("verification.terms")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
