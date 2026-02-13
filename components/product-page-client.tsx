"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/products-data";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ProductPageClientProps {
    product: Product;
}

const DICTIONARY = {
    en: {
        manualMode: "Manual Mode",
        viewDetails: "VIEW DETAILS",
        backToMain: "BACK TO MAIN",
    },
    ru: {
        manualMode: "Ручной режим",
        viewDetails: "ПОСМОТРЕТЬ ДЕТАЛИ",
        backToMain: "НАЗАД К ОСНОВНОМУ",
    },
    uz: {
        manualMode: "Qo'lda boshqarish",
        viewDetails: "TAVSILOTLARNI KO'RISH",
        backToMain: "ASOSIYGA QAYTISH",
    },
    de: {
        manualMode: "Manueller Modus",
        viewDetails: "DETAILS ANZEIGEN",
        backToMain: "ZURÜCK ZUR ÜBERSICHT",
    },
} as const;

// Same formatting function as modal
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

        const bulletMatch = line.match(/^[•\-\*—]\s*/);
        if (bulletMatch) {
            if (!inList) {
                html += '<ul class="list-disc pl-4 my-0">';
                inList = true;
            }
            const content = line.substring(bulletMatch[0].length).trim();
            html += `<li class="text-gray-900 dark:text-gray-100 text-sm leading-tight py-0">${content}</li>`;
        }
        else if (line.endsWith(':') && line.length < 80) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<p class="font-bold text-emerald-600 dark:text-emerald-400 mt-3 mb-0.5 text-sm">${line}</p>`;
        }
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

export default function ProductPageClient({ product }: ProductPageClientProps) {
    const { language } = useLanguage();
    const [viewMode, setViewMode] = useState<'main' | 'side' | 'back'>('main');
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [prevProductId, setPrevProductId] = useState<string | null>(null);
    const lang = language as keyof typeof product.name;

    // --- DERIVED STATE / RESET LOGIC ---
    // Override state during the INITIAL frame of a switch to prevent flickers.
    let effectiveViewMode = viewMode;
    let effectiveIsAutoPlaying = isAutoPlaying;

    const isNewProduct = product && product.id !== prevProductId;

    if (isNewProduct) {
        setPrevProductId(product.id);
        setViewMode('main');
        setIsAutoPlaying(true);

        effectiveViewMode = 'main';
        effectiveIsAutoPlaying = true;
    }

    // Advanced Auto-Rotation Sequence (Main -> Back -> Side -> Back)
    useEffect(() => {
        if (!product || !isAutoPlaying) return;

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
    }, [product?.id, isAutoPlaying]);

    const handleManualInteraction = (nextMode: 'main' | 'side' | 'back') => {
        setIsAutoPlaying(false);
        setViewMode(nextMode);
    };

    const t = DICTIONARY[language as keyof typeof DICTIONARY] || DICTIONARY.en;
    const medicalInfo = product.medicalInfo?.[lang];
    const formattedMedicalInfo = medicalInfo ? formatMedicalText(medicalInfo) : '';

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/products">
                    <Button variant="ghost" className="mb-4 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {language === "en" ? "Back to Products" : language === "uz" ? "Mahsulotlarga qaytish" : language === "ru" ? "Назад к продуктам" : "Zurück zu Produkten"}
                    </Button>
                </Link>

                {/* Same layout as modal */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-emerald-600 dark:border-emerald-500 overflow-hidden">
                    {/* Header - exactly like modal */}
                    <div className="bg-white dark:bg-gray-900 border-b-2 border-emerald-600 dark:border-emerald-500 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide break-words">
                                {product.name[lang]}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium break-words">
                                {product.category[lang]}
                            </p>

                            {/* SEO: Show all language names for Google indexing */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.name.en !== product.name[lang] && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                        {product.name.en}
                                    </span>
                                )}
                                {product.name.ru !== product.name[lang] && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                        {product.name.ru}
                                    </span>
                                )}
                                {product.name.uz !== product.name[lang] && product.name.uz !== product.name.en && product.name.uz !== product.name.ru && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                        {product.name.uz}
                                    </span>
                                )}
                                {product.name.de !== product.name[lang] && product.name.de !== product.name.en && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                                        {product.name.de}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hidden SEO text - All language descriptions for Google */}
                    <div className="sr-only" aria-hidden="true">
                        <p>{product.name.en} - {product.name.ru} - {product.name.uz} - {product.name.de}</p>
                        <p>{product.description.en}</p>
                        <p>{product.description.ru}</p>
                        <p>{product.description.uz}</p>
                        <p>{product.description.de}</p>
                        <p>{product.category.en} - {product.category.ru} - {product.category.uz} - {product.category.de}</p>
                    </div>

                    {/* Content - exactly like modal */}
                    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
                        {/* Product Image - Large Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 sm:mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-3 sm:p-4 md:p-8 border border-gray-200 dark:border-gray-700"
                        >
                            <div
                                className="relative w-full h-[300px] sm:h-[430px] md:h-[530px] lg:h-[630px] overflow-hidden cursor-pointer group"
                            >
                                <AnimatePresence mode="wait" key={product.id}>
                                    {effectiveViewMode === 'main' ? (
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
                                                alt={`${product.name[lang]} - Main`}
                                                width={800}
                                                height={800}
                                                className="object-contain w-full h-full drop-shadow-2xl"
                                                unoptimized
                                                priority
                                            />
                                        </motion.div>
                                    ) : (
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
                                                <div
                                                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
                                                    style={{ backfaceVisibility: "hidden" }}
                                                >
                                                    <Image
                                                        src={product.image_side || product.image_back || product.image}
                                                        alt={`${product.name[lang]} - Side`}
                                                        width={800}
                                                        height={800}
                                                        className="object-contain w-full h-full drop-shadow-2xl"
                                                        unoptimized
                                                    />
                                                </div>

                                                <div
                                                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg)"
                                                    }}
                                                >
                                                    <Image
                                                        src={product.image_back || product.image_side || product.image}
                                                        alt={`${product.name[lang]} - Back`}
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
                        </motion.div>

                        {/* Medical Information - exactly like modal */}
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
                            /* Fallback: Show basic info if no medical info - exactly like modal */
                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
                                    <h3 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 break-words">
                                        {language === "en" ? "Description" : language === "uz" ? "Tavsif" : language === "ru" ? "Описание" : "Beschreibung"}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                                        {product.description[lang]}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
                                    <h3 className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3 break-words">
                                        {language === "en" ? "Key Features" : language === "uz" ? "Asosiy xususiyatlar" : language === "ru" ? "Ключевые особенности" : "Hauptmerkmale"}
                                    </h3>
                                    <ul className="space-y-2">
                                        {product.features[lang].map((feature, idx) => (
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
                </div>
            </div>
        </div>
    );
}
