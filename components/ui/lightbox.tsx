"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

type LightboxMedia = {
    type: "image" | "video";
    url: string;
    caption?: string;
};

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    media: LightboxMedia[];
    initialIndex?: number;
}

export function Lightbox({ isOpen, onClose, media, initialIndex = 0 }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen, initialIndex]);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    }, [media.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, [media.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") handlePrevious();
        if (e.key === "ArrowRight") handleNext();
    }, [isOpen, onClose, handlePrevious, handleNext]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const currentMedia = useMemo(() => media[currentIndex] || media[0], [media, currentIndex]);

    if (!isOpen || !media || media.length === 0 || !currentMedia) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            >
                {/* Header/Controls */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-[110]">
                    <div className="text-white/70 text-sm font-medium">
                        {currentIndex + 1} / {media.length}
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsFullScreen(!isFullScreen)}
                            className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                            {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative max-w-full max-h-full aspect-auto flex flex-col items-center"
                    >
                        {currentMedia.type === "image" ? (
                            <div className={`relative ${isFullScreen ? "w-screen h-screen" : "w-[90vw] h-[75vh] max-w-full max-h-[80vh]"} transition-all duration-300`}>
                                <Image
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || "Gallery image"}
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={100}
                                />
                            </div>
                        ) : (
                            <div className={`relative ${isFullScreen ? "w-screen h-screen" : "w-[85vw] md:w-[70vw] aspect-video"} transition-all duration-300 bg-black rounded-lg overflow-hidden`}>
                                {currentMedia.url.includes("youtube.com/embed") ? (
                                    <iframe
                                        src={currentMedia.url}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={currentMedia.url}
                                        controls
                                        autoPlay
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        )}

                        {currentMedia.caption && !isFullScreen && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 text-white/90 text-center max-w-2xl px-4 text-sm sm:text-base italic bg-black/20 p-2 rounded-lg backdrop-blur-sm"
                            >
                                {currentMedia.caption}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                {/* Navigation Buttons */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110] border border-white/10"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[110] border border-white/10"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </>
                )}

                {/* Thumbnail Strip (Optional) */}
                {!isFullScreen && media.length > 1 && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2 z-[110]">
                        {media.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentIndex === idx ? "border-primary scale-110" : "border-white/20 opacity-50 hover:opacity-100"
                                    }`}
                            >
                                {item.type === "image" ? (
                                    <Image src={item.url} alt="" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
                                        VIDEO
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
