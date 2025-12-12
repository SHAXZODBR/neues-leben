"use client";

import { motion } from "framer-motion";

// Falling ornament balls with various colors - reduced for performance
const fallingOrnaments = [
    { color: "#ef4444", size: 28, left: "8%", delay: 0, duration: 20 },
    { color: "#22c55e", size: 24, left: "25%", delay: 6, duration: 22 },
    { color: "#3b82f6", size: 26, left: "50%", delay: 3, duration: 18 },
    { color: "#f59e0b", size: 22, left: "75%", delay: 9, duration: 24 },
    { color: "#8b5cf6", size: 28, left: "92%", delay: 5, duration: 21 },
];

// Ornament Ball Component
const OrnamentBall = ({ color, size }: { color: string; size: number }) => (
    <div className="relative">
        {/* Ornament string */}
        <div
            className="w-0.5 h-4 mx-auto bg-gray-400"
            style={{ marginBottom: "-2px" }}
        />
        {/* Ornament cap */}
        <div
            className="w-3 h-2 mx-auto rounded-t-sm"
            style={{ backgroundColor: "#fbbf24" }}
        />
        {/* Ornament ball */}
        <div
            className="rounded-full shadow-lg relative"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color})`,
                boxShadow: `0 4px 15px ${color}66, inset -5px -5px 15px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,255,255,0.3)`,
            }}
        >
            {/* Shine effect */}
            <div
                className="absolute rounded-full bg-white/40"
                style={{
                    width: size * 0.3,
                    height: size * 0.3,
                    top: size * 0.15,
                    left: size * 0.2,
                }}
            />
        </div>
    </div>
);

// Star Component
const Star = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
            d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
            filter="drop-shadow(0 2px 4px rgba(251, 191, 36, 0.5))"
        />
    </svg>
);

export default function FloatingOrnaments() {
    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {/* Falling Ornament Balls */}
            {fallingOrnaments.map((ornament, index) => (
                <motion.div
                    key={`falling-${index}`}
                    className="absolute"
                    style={{
                        left: ornament.left,
                        top: "-80px",
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        rotate: [0, 360],
                    }}
                    transition={{
                        y: {
                            duration: ornament.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: ornament.delay,
                        },
                        rotate: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    <OrnamentBall color={ornament.color} size={ornament.size} />
                </motion.div>
            ))}

            {/* Falling Stars - just 2 */}
            <motion.div
                className="absolute"
                style={{ left: "35%", top: "-50px" }}
                animate={{
                    y: ["0vh", "110vh"],
                    rotate: [0, 360],
                }}
                transition={{
                    y: { duration: 18, repeat: Infinity, ease: "linear", delay: 4 },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                }}
            >
                <Star size={24} />
            </motion.div>

            <motion.div
                className="absolute"
                style={{ left: "65%", top: "-50px" }}
                animate={{
                    y: ["0vh", "110vh"],
                    rotate: [0, 360],
                }}
                transition={{
                    y: { duration: 22, repeat: Infinity, ease: "linear", delay: 10 },
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                }}
            >
                <Star size={20} />
            </motion.div>

            {/* Falling Gift Box */}
            <motion.div
                className="absolute text-2xl"
                style={{ left: "45%", top: "-50px" }}
                animate={{
                    y: ["0vh", "110vh"],
                    rotate: [-10, 10, -10],
                }}
                transition={{
                    y: { duration: 25, repeat: Infinity, ease: "linear", delay: 7 },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                🎁
            </motion.div>
        </div>
    );
}
