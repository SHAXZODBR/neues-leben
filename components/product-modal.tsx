"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/lib/products-data";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Auto-format plain text medical info into beautiful HTML
function formatMedicalText(text: string): string {
  if (!text) return '';
  
  console.log('Formatting medical text, length:', text.length);
  
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (!line) {
      // Close list if we were in one
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += '<br/>';
      continue;
    }
    
    // Check if line is a bullet point (•, -, *, or starts with dash)
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.match(/^[\-\•\*]\s/)) {
      if (!inList) {
        html += '<ul class="list-disc pl-8 space-y-4 my-5">';
        inList = true;
      }
      const content = line.substring(1).trim();
      html += `<li class="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">${content}</li>`;
    }
    // Check if line is a section header (ends with colon)
    else if (line.endsWith(':')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h3 class="font-bold text-2xl text-red-700 dark:text-red-400 mt-10 mb-5">${line}</h3>`;
    }
    // Check if line looks like a title (short, all caps, or contains ®)
    else if ((line.length < 50 && line === line.toUpperCase()) || line.includes('®') || line.includes('ВАЗОЛИЗИН')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h2 class="font-bold text-3xl text-red-600 dark:text-red-400 mt-8 mb-4">${line}</h2>`;
    }
    // Regular paragraph
    else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="mb-4 text-gray-900 dark:text-gray-100 text-lg leading-relaxed">${line}</p>`;
    }
  }
  
  // Close list if still open
  if (inList) {
    html += '</ul>';
  }
  
  console.log('Formatted HTML length:', html.length);
  return html;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { language } = useLanguage();

  console.log('Product modal opened:', product?.id, 'Language:', language);
  console.log('Product medicalInfo:', product?.medicalInfo);

  const medicalInfo = product?.medicalInfo?.[language as keyof typeof product.medicalInfo];
  console.log('Selected medical info for language:', medicalInfo ? 'Found' : 'Not found');
  
  const formattedMedicalInfo = medicalInfo ? formatMedicalText(medicalInfo) : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0 bg-white dark:bg-gray-900">
        {product && (
          <>
            {/* Header - Medical Document Style */}
            <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b-2 border-red-600 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wide">
                    {product.name[language as keyof typeof product.name]}
                  </DialogTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
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
            <div className="overflow-y-auto max-h-[calc(95vh-80px)] px-6 py-6">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-64 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name[language as keyof typeof product.name]}
                    width={400}
                    height={400}
                    className="object-contain max-h-full w-auto drop-shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Medical Information */}
              {formattedMedicalInfo ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert
                      prose-headings:text-red-700 dark:prose-headings:text-red-400
                      prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-p:text-lg
                      prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-bold
                      prose-ul:text-gray-900 dark:prose-ul:text-gray-100
                      prose-li:marker:text-red-600 dark:prose-li:marker:text-red-400
                      prose-li:text-lg"
                    dangerouslySetInnerHTML={{ __html: formattedMedicalInfo }}
                  />
                </motion.div>
              ) : (
                /* Fallback: Show basic info if no medical info */
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {language === "en" ? "Description" : language === "uz" ? "Tavsif" : language === "ru" ? "Описание" : "Beschreibung"}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description[language as keyof typeof product.description]}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {language === "en" ? "Key Features" : language === "uz" ? "Asosiy xususiyatlar" : language === "ru" ? "Ключевые особенности" : "Hauptmerkmale"}
                    </h3>
                    <ul className="space-y-2">
                      {product.features[language as keyof typeof product.features].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                          <span>{feature}</span>
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
