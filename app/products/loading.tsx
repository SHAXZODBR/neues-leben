"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Package } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        className="text-center space-y-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Skeleton className="h-12 w-80 mx-auto" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </motion.div>

                    {/* Search Bar Skeleton */}
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Loading Animation */}
            <section className="py-16">
                <div className="container px-4 md:px-6">
                    {/* Animated Loading State */}
                    <div className="flex flex-col items-center justify-center py-12 mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl"
                            />
                            <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-6">
                                <motion.div
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Package className="h-12 w-12 text-primary" />
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 space-y-2 text-center"
                        >
                            <p className="text-lg font-semibold text-foreground">Loading Products</p>
                            <div className="flex items-center justify-center gap-1.5">
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        className="h-2 w-2 rounded-full bg-primary"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Skeletons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
                                    {/* Image Skeleton */}
                                    <Skeleton className="h-72 w-full" />

                                    {/* Content Skeleton */}
                                    <div className="p-5 space-y-4">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />

                                        {/* Features Skeleton */}
                                        <div className="flex gap-2">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-6 w-24 rounded-full" />
                                            <Skeleton className="h-6 w-16 rounded-full" />
                                        </div>

                                        {/* Button Skeleton */}
                                        <Skeleton className="h-10 w-full rounded-lg" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
