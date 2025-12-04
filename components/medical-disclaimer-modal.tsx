"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISCLAIMER_TEXT = `Верификация Медицинского Специалиста
Доступ к Медицинской Литературе

Важное Уведомление

Медицинские статьи и исследовательский контент в этом разделе предназначены только для лицензированных специалистов здравоохранения. Представленная информация носит образовательный характер и не должна заменять клиническое суждение.

Пожалуйста, подтвердите вашу квалификацию

Я подтверждаю, что являюсь лицензированным специалистом здравоохранения (врачом, медсестрой, фармацевтом или другим квалифицированным медицинским практиком) и понимаю, что контент предназначен для профессионального медицинского образования.

Продолжая, вы соглашаетесь с Условиями использования и Политикой конфиденциальности`;

interface MedicalDisclaimerModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export function MedicalDisclaimerModal({ isOpen, onConfirm }: MedicalDisclaimerModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!isChecked) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/confirm-medical-professional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disclaimerText: DISCLAIMER_TEXT,
        }),
      });

      if (response.ok) {
        // Store confirmation in sessionStorage
        sessionStorage.setItem("medical_professional_confirmed", "true");
        onConfirm();
      } else {
        const data = await response.json();
        console.error("Failed to confirm medical professional status:", data);
        alert(`Произошла ошибка: ${data.details || "Пожалуйста, попробуйте снова."}`);
      }
    } catch (error) {
      console.error("Error confirming medical professional:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Верификация Медицинского Специалиста
              </h2>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              <div id="disclaimer-text" className="space-y-4 text-sm text-foreground">
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Доступ к Медицинской Литературе</h3>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Важное Уведомление</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Медицинские статьи и исследовательский контент в этом разделе предназначены только для лицензированных специалистов здравоохранения. Представленная информация носит образовательный характер и не должна заменять клиническое суждение.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Пожалуйста, подтвердите вашу квалификацию</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Я подтверждаю, что являюсь лицензированным специалистом здравоохранения (врачом, медсестрой, фармацевтом или другим квалифицированным медицинским практиком) и понимаю, что контент предназначен для профессионального медицинского образования.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Продолжая, вы соглашаетесь с Условиями использования и Политикой конфиденциальности
                  </p>
                </div>

                {/* Legal Notice */}
                <div className="bg-muted/50 border border-border rounded-lg p-4 mt-6">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Юридическое уведомление:</strong> Продолжая, вы соглашаетесь на сохранение вашего IP-адреса, данных браузера и текста данного уведомления для целей регистрации подтверждения.
                  </p>
                </div>
              </div>

              {/* Checkbox */}
              <div className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="medical-confirm"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="medical-confirm" className="text-sm text-foreground cursor-pointer">
                  Я подтверждаю, что являюсь лицензированным специалистом здравоохранения и понимаю условия доступа к медицинскому контенту.
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/30 border-t border-border px-6 py-4 flex justify-end gap-3">
              <Button
                onClick={handleConfirm}
                disabled={!isChecked || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </motion.div>
                    Подтверждение...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Подтвердить и Продолжить
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
