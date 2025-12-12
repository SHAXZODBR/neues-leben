"use client";

import { motion } from "framer-motion";

export default function FestiveBanner() {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white py-2 px-4 text-center relative overflow-hidden"
        >
            {/* Animated background shimmer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
                <span className="text-xl">🎄</span>
                <span className="font-semibold text-sm md:text-base">
                    Happy New Year 2025!
                </span>
                <span className="text-xl">🎁</span>
            </div>
        </motion.div>
    );
}
