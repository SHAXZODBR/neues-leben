"use client";

import { motion } from "framer-motion";

const colors = [
    "#ef4444", // red
    "#22c55e", // green
    "#eab308", // yellow
    "#3b82f6", // blue
    "#f97316", // orange
    "#ec4899", // pink
];

export default function ChristmasLights() {
    const lightCount = 20;

    return (
        <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 pointer-events-none overflow-hidden">
            {/* Wire */}
            <svg
                className="w-full h-12"
                viewBox="0 0 1200 50"
                preserveAspectRatio="none"
                fill="none"
            >
                <path
                    d="M0 10 Q 30 25, 60 10 T 120 10 T 180 10 T 240 10 T 300 10 T 360 10 T 420 10 T 480 10 T 540 10 T 600 10 T 660 10 T 720 10 T 780 10 T 840 10 T 900 10 T 960 10 T 1020 10 T 1080 10 T 1140 10 T 1200 10"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>

            {/* Lights */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
                {Array.from({ length: lightCount }).map((_, i) => {
                    const color = colors[i % colors.length];
                    const delay = i * 0.15;

                    return (
                        <motion.div
                            key={i}
                            className="relative"
                            style={{ marginTop: `${Math.sin(i * 0.5) * 8 + 8}px` }}
                        >
                            {/* Bulb cap */}
                            <div className="w-2 h-2 bg-gray-600 rounded-sm mx-auto" />

                            {/* Light bulb */}
                            <motion.div
                                className="w-4 h-6 rounded-b-full mx-auto"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
                                }}
                                animate={{
                                    opacity: [0.4, 1, 0.4],
                                    scale: [0.95, 1.05, 0.95],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: delay,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
