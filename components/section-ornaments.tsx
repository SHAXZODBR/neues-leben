"use client";

import { motion } from "framer-motion";

// Single ornament component
const Ornament = ({ color, size, delay = 0 }: { color: string; size: number; delay?: number }) => (
    <motion.div
        className="relative"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2 + delay * 0.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
        <div className="w-0.5 h-2 mx-auto bg-gray-400" style={{ marginBottom: "-1px" }} />
        <div className="w-2 h-1 mx-auto rounded-t-sm" style={{ backgroundColor: "#fbbf24" }} />
        <div
            className="rounded-full shadow-lg relative"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color})`,
                boxShadow: `0 2px 8px ${color}66, inset -3px -3px 8px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,255,0.3)`,
            }}
        >
            <div
                className="absolute rounded-full bg-white/40"
                style={{ width: size * 0.25, height: size * 0.25, top: size * 0.15, left: size * 0.2 }}
            />
        </div>
    </motion.div>
);

// Star component
const Star = ({ size }: { size: number }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
        <path
            d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
        />
    </motion.svg>
);

// Big top cluster for hero section - large compact cluster like a wreath
export function TopOrnamentCluster() {
    // Compact circular arrangement with bigger ornaments
    const ornaments = [
        // Top row
        { color: "#ef4444", size: 36, x: 60, y: 0 },
        { color: "#22c55e", size: 32, x: 100, y: 5 },
        { color: "#3b82f6", size: 34, x: 140, y: 0 },
        // Middle row - denser
        { color: "#f59e0b", size: 38, x: 40, y: 35 },
        { color: "#8b5cf6", size: 40, x: 80, y: 30 },
        { color: "#ec4899", size: 36, x: 120, y: 32 },
        { color: "#22c55e", size: 34, x: 160, y: 35 },
        // Bottom row
        { color: "#ef4444", size: 32, x: 55, y: 68 },
        { color: "#3b82f6", size: 38, x: 95, y: 65 },
        { color: "#f59e0b", size: 34, x: 135, y: 68 },
        // Extra for fullness
        { color: "#8b5cf6", size: 28, x: 25, y: 50 },
        { color: "#ec4899", size: 30, x: 175, y: 50 },
    ];

    return (
        <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <Star size={36} />
            <div className="relative h-28 w-[210px]">
                {ornaments.map((orn, i) => (
                    <div key={i} className="absolute" style={{ left: orn.x, top: orn.y }}>
                        <Ornament color={orn.color} size={orn.size} delay={i * 0.08} />
                    </div>
                ))}
            </div>
            <Star size={36} />
        </motion.div>
    );
}

// Small inline ornament for next to headlines - just 2-3 ornaments
export function InlineOrnaments({ count = 2 }: { count?: 2 | 3 }) {
    const colors = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"];
    const sizes = [16, 14, 15];

    return (
        <motion.span
            className="inline-flex items-end gap-0.5 mx-2"
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <Ornament key={i} color={colors[i]} size={sizes[i]} delay={i * 0.3} />
            ))}
        </motion.span>
    );
}

// Single ornament for minimal decoration
export function SingleOrnament({ color = "#ef4444", size = 18 }: { color?: string; size?: number }) {
    return (
        <motion.span
            className="inline-block mx-1"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <Ornament color={color} size={size} />
        </motion.span>
    );
}
