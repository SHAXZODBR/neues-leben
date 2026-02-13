"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/lib/products-data";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DICTIONARY = {
  en: {
    loading: "Loading product...",
    manualMode: "Manual Mode",
    viewDetails: "VIEW DETAILS",
    backToMain: "BACK TO MAIN",
  },
  ru: {
    loading: "Загрузка продукта...",
    manualMode: "Ручной режим",
    viewDetails: "ПОСМОТРЕТЬ ДЕТАЛИ",
    backToMain: "НАЗАД К ОСНОВНОМУ",
  },
  uz: {
    loading: "Mahsulot yuklanmoqda...",
    manualMode: "Qo'lda boshqarish",
    viewDetails: "TAVSILOTLARNI KO'RISH",
    backToMain: "ASOSIYGA QAYTISH",
  },
  de: {
    loading: "Produkt wird geladen...",
    manualMode: "Manueller Modus",
    viewDetails: "DETAILS ANZEIGEN",
    backToMain: "ZURÜCK ZUR ÜBERSICHT",
  },
} as const;

// Auto-format plain text medical info into clean HTML
function formatMedicalText(text: string): string {
  if (!text) return '';

  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      continue;
    }

    // Check if line starts with bullet point markers
    const bulletMatch = line.match(/^[•\-\*—]\s*/);
    if (bulletMatch) {
      if (!inList) {
        html += '<ul class="list-disc pl-4 my-0">';
        inList = true;
      }
      const content = line.substring(bulletMatch[0].length).trim();
      html += `<li class="text-gray-900 dark:text-gray-100 text-sm leading-tight py-0">${content}</li>`;
    }
    // Check if line is a section header (ends with colon and is short)
    else if (line.endsWith(':') && line.length < 80) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="font-bold text-emerald-600 dark:text-emerald-400 mt-3 mb-0.5 text-sm">${line}</p>`;
    }

    // Regular paragraph
    else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="my-0 text-gray-900 dark:text-gray-100 text-sm leading-tight">${line}</p>`;
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'main' | 'side' | 'back'>('main');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [prevProductId, setPrevProductId] = useState<string | null>(null);
  const [lastOpen, setLastOpen] = useState(false);

  // --- DERIVED STATE / RESET LOGIC ---
  // We use a local variable to override state during the INITIAL frame of a switch.
  // This prevents the "old viewMode state rendering with new product" flicker.
  let effectiveViewMode = viewMode;
  let effectiveIsAutoPlaying = isAutoPlaying;

  const isNewProduct = product && product.id !== prevProductId;
  const isJustOpened = open && !lastOpen;

  if (isNewProduct || isJustOpened) {
    // Schedule state update for future frames
    setPrevProductId(product?.id || null);
    setLastOpen(open);
    setViewMode('main');
    setIsAutoPlaying(true);

    // Override local variables for THIS current frame
    effectiveViewMode = 'main';
    effectiveIsAutoPlaying = true;
  } else if (!open && lastOpen) {
    // Handle closing state sync
    setLastOpen(false);
  }

  // Advanced Auto-Rotation Sequence (Main -> Back -> Side -> Back)
  useEffect(() => {
    if (!open || !product || !isAutoPlaying) return;

    // Define the sequence
    const sequence: ('main' | 'side' | 'back')[] = ['main'];
    if (product.image_back) sequence.push('back');
    if (product.image_side) sequence.push('side');
    if (product.image_back && product.image_side) sequence.push('back');

    if (sequence.length <= 1) return;

    let sequenceIndex = 0;
    const loopInterval = setInterval(() => {
      sequenceIndex = (sequenceIndex + 1) % sequence.length;
      setViewMode(sequence[sequenceIndex]);
    }, 6000);

    return () => clearInterval(loopInterval);
  }, [product?.id, open, isAutoPlaying]);

  const handleManualInteraction = (nextMode: 'main' | 'side' | 'back') => {
    setIsAutoPlaying(false);
    setViewMode(nextMode);
  };

  if (!product) {
    const t = DICTIONARY[language as keyof typeof DICTIONARY] || DICTIONARY.en;
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0 bg-white dark:bg-gray-900">
          <DialogTitle className="sr-only">{t.loading}</DialogTitle>
          <div className="p-8 text-center text-muted-foreground">{t.loading}</div>
        </DialogContent>
      </Dialog>
    );
  }

  const t = DICTIONARY[language as keyof typeof DICTIONARY] || DICTIONARY.en;
  const medicalInfo = product.medicalInfo?.[language as keyof typeof product.medicalInfo];
  const formattedMedicalInfo = medicalInfo ? formatMedicalText(medicalInfo) : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[95vh] overflow-hidden p-0 bg-white dark:bg-gray-900">
        {product && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b-2 border-emerald-600 dark:border-emerald-500 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide break-words">
                    {product.name[language as keyof typeof product.name]}
                  </DialogTitle>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium break-words">
                    {product.category[language as keyof typeof product.category]}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-60px)] sm:max-h-[calc(95vh-80px)] px-3 sm:px-4 md:px-6 py-4 sm:py-6">
              {/* Product Image - Large Display */}
              <div
                className="mb-6 sm:mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-3 sm:p-4 md:p-8 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden cursor-pointer group"
                >
                  {/* key on AnimatePresence is the CRITICAL fix for "old pic coming between" */}
                  <AnimatePresence mode="wait" key={product.id}>
                    {effectiveViewMode === 'main' ? (
                      /* Main Photo: Static Side (Slides in/out) */
                      <motion.div
                        key={`${product.id}-main`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-2xl"
                        onClick={() => {
                          if (product.image_back) handleManualInteraction('back');
                          else if (product.image_side) handleManualInteraction('side');
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={`${product.name[language as keyof typeof product.name]} - Main`}
                          width={800}
                          height={800}
                          className="object-contain w-full h-full drop-shadow-2xl"
                          unoptimized
                          priority
                        />
                      </motion.div>
                    ) : (
                      /* Detail Card: Flipping Side (Back <-> Side) */
                      <motion.div
                        key={`${product.id}-detail`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                        style={{ perspective: "1000px" }}
                      >
                        <motion.div
                          className="relative w-full h-full"
                          style={{ transformStyle: "preserve-3d" }}
                          animate={{ rotateY: effectiveViewMode === 'back' ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          onClick={() => {
                            if (effectiveViewMode === 'back') {
                              if (product.image_side) handleManualInteraction('side');
                              else handleManualInteraction('main');
                            } else if (effectiveViewMode === 'side') {
                              handleManualInteraction('main');
                            }
                          }}
                        >
                          {/* Front of Card: Side Image */}
                          <div
                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <Image
                              src={product.image_side || product.image_back || product.image}
                              alt={`${product.name[language as keyof typeof product.name]} - Side`}
                              width={800}
                              height={800}
                              className="object-contain w-full h-full drop-shadow-2xl"
                              unoptimized
                            />
                          </div>

                          {/* Back of Card: Back Image */}
                          <div
                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)"
                            }}
                          >
                            <Image
                              src={product.image_back || product.image_side || product.image}
                              alt={`${product.name[language as keyof typeof product.name]} - Back`}
                              width={800}
                              height={800}
                              className="object-contain w-full h-full drop-shadow-2xl"
                              unoptimized
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* UI Hint / Playback status indicator */}
                  {(product.image_side || product.image_back) && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                      {!effectiveIsAutoPlaying && (
                        <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest animate-pulse">
                          {t.manualMode}
                        </div>
                      )}
                      <div className="bg-emerald-600/20 dark:bg-emerald-400/20 backdrop-blur-md border border-emerald-600/40 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none">
                        {effectiveViewMode === 'main' ? t.viewDetails : t.backToMain}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Medical Information */}
              {formattedMedicalInfo ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6"
                >
                  <div
                    className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert
                      prose-headings:text-red-700 dark:prose-headings:text-red-400 prose-headings:break-words
                      prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg prose-p:break-words
                      prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-bold prose-strong:break-words
                      prose-ul:text-gray-900 dark:prose-ul:text-gray-100
                      prose-li:marker:text-red-600 dark:prose-li:marker:text-red-400 prose-li:break-words
                      prose-li:text-sm sm:prose-li:text-base md:prose-li:text-lg"
                    dangerouslySetInnerHTML={{ __html: formattedMedicalInfo }}
                  />
                </motion.div>
              ) : (
                /* Fallback: Show basic info if no medical info */
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 break-words">
                      {language === "en" ? "Description" : language === "uz" ? "Tavsif" : language === "ru" ? "Описание" : "Beschreibung"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                      {product.description[language as keyof typeof product.description]}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 break-words">
                      {language === "en" ? "Key Features" : language === "uz" ? "Asosiy xususiyatlar" : language === "ru" ? "Ключевые особенности" : "Hauptmerkmale"}
                    </h3>
                    <ul className="space-y-2">
                      {product.features[language as keyof typeof product.features].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0">•</span>
                          <span className="break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
