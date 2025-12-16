"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function FestiveBanner() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date("2026-01-01T00:00:00");

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

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

            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <span className="text-xl">🎄</span>
                <span className="font-semibold text-sm md:text-base">
                    Happy New Year 2026!
                </span>
                <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm">
                    <div className="bg-white/20 rounded px-1.5 sm:px-2 py-0.5">
                        <span className="font-bold">{timeLeft.days}</span>
                        <span className="text-[10px] sm:text-xs ml-0.5">d</span>
                    </div>
                    <span>:</span>
                    <div className="bg-white/20 rounded px-1.5 sm:px-2 py-0.5">
                        <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-[10px] sm:text-xs ml-0.5">h</span>
                    </div>
                    <span>:</span>
                    <div className="bg-white/20 rounded px-1.5 sm:px-2 py-0.5">
                        <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-[10px] sm:text-xs ml-0.5">m</span>
                    </div>
                    <span>:</span>
                    <div className="bg-white/20 rounded px-1.5 sm:px-2 py-0.5">
                        <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-[10px] sm:text-xs ml-0.5">s</span>
                    </div>
                </div>
                <span className="text-xl">🎁</span>
            </div>
        </motion.div>
    );
}
