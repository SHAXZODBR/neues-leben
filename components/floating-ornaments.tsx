"use client";

import { motion } from "framer-motion";

// Reduced to just 2 ornaments
const ornaments = [
    { color: "#ef4444", size: 35, left: "8%", delay: 0 },
    { color: "#22c55e", size: 30, left: "90%", delay: 3 },
];

export default function FloatingOrnaments() {
    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {ornaments.map((ornament, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        left: ornament.left,
                        top: "-60px",
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        rotate: [0, 360],
                    }}
                    transition={{
                        y: {
                            duration: 20 + index * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: ornament.delay * 3,
                        },
                        rotate: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
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
                        className="rounded-full shadow-lg"
                        style={{
                            width: ornament.size,
                            height: ornament.size,
                            background: `radial-gradient(circle at 30% 30%, ${ornament.color}dd, ${ornament.color})`,
                            boxShadow: `0 4px 15px ${ornament.color}66, inset -5px -5px 15px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,255,255,0.3)`,
                        }}
                    >
                        {/* Shine effect */}
                        <div
                            className="absolute rounded-full bg-white/40"
                            style={{
                                width: ornament.size * 0.3,
                                height: ornament.size * 0.3,
                                top: ornament.size * 0.15,
                                left: ornament.size * 0.2,
                            }}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Just 1 floating gift box */}
            <motion.div
                className="absolute text-3xl"
                style={{ left: "50%", top: "-60px" }}
                animate={{
                    y: ["0vh", "110vh"],
                    rotate: [-10, 10, -10],
                }}
                transition={{
                    y: {
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 5,
                    },
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            >
                🎁
            </motion.div>
        </div>
    );
}
