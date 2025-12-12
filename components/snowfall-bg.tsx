"use client";

import { useEffect, useRef, useState } from "react";

export default function SnowfallBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Star-shaped snowflakes with ice blue color
        const snowflakes: {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            rotation: number;
            rotationSpeed: number;
            opacity: number;
            points: number;
        }[] = [];

        const particleCount = Math.min(15, Math.floor(dimensions.width / 80));

        for (let i = 0; i < particleCount; i++) {
            snowflakes.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: Math.random() * 15 + 8,
                speedY: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 0.6 - 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.6 + 0.4,
                points: Math.random() > 0.5 ? 6 : 8,
            });
        }

        // Ice blue colors for visibility on white backgrounds
        const drawSnowflake = (
            x: number,
            y: number,
            size: number,
            rotation: number,
            points: number,
            opacity: number
        ) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;

            // Draw main star shape
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
                const angle = (i * Math.PI) / points;
                const radius = i % 2 === 0 ? size : size * 0.4;
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();

            // Ice blue gradient for visibility on light backgrounds
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gradient.addColorStop(0, `rgba(100, 180, 255, ${opacity})`);      // Light ice blue center
            gradient.addColorStop(0.4, `rgba(70, 150, 220, ${opacity * 0.8})`); // Medium ice blue
            gradient.addColorStop(0.7, `rgba(50, 130, 200, ${opacity * 0.5})`); // Deeper blue
            gradient.addColorStop(1, `rgba(30, 100, 180, ${opacity * 0.2})`);   // Edge blue

            ctx.fillStyle = gradient;
            ctx.fill();

            // Ice blue sparkle lines
            ctx.strokeStyle = `rgba(100, 180, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < points; i++) {
                const angle = (i * Math.PI * 2) / points;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * size * 1.2, Math.sin(angle) * size * 1.2);
                ctx.stroke();
            }

            // Ice blue center sparkle
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
            const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.2);
            centerGradient.addColorStop(0, `rgba(200, 230, 255, ${opacity})`);
            centerGradient.addColorStop(1, `rgba(100, 180, 255, ${opacity * 0.5})`);
            ctx.fillStyle = centerGradient;
            ctx.fill();

            // Add subtle white highlight for shimmer
            ctx.beginPath();
            ctx.arc(-size * 0.15, -size * 0.15, size * 0.1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
            ctx.fill();

            ctx.restore();
        };

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            snowflakes.forEach((flake) => {
                drawSnowflake(
                    flake.x,
                    flake.y,
                    flake.size,
                    flake.rotation,
                    flake.points,
                    flake.opacity
                );

                // Update position
                flake.y += flake.speedY;
                flake.x += flake.speedX;
                flake.rotation += flake.rotationSpeed;

                // Reset when off screen
                if (flake.y > dimensions.height + 20) {
                    flake.y = -20;
                    flake.x = Math.random() * dimensions.width;
                }
                if (flake.x > dimensions.width + 20) {
                    flake.x = -20;
                } else if (flake.x < -20) {
                    flake.x = dimensions.width + 20;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
            aria-hidden="true"
        />
    );
}
