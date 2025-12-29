"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <div className="container max-w-4xl py-12">
            <div className="mb-8">
                <Link href="/">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            <div className="space-y-8">
                <div>
                    <Skeleton className="h-10 w-72" />
                    <Skeleton className="h-5 w-96 mt-3" />
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl"
                        />
                        <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-5">
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Briefcase className="h-10 w-10 text-primary" />
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-center"
                    >
                        <p className="text-base font-medium text-foreground">Loading Careers...</p>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
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

                <div className="space-y-6">
                    <Skeleton className="h-8 w-40" />
                    <div className="grid gap-6 md:grid-cols-2">
                        {[0, 1].map((i) => (
                            <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-36" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                                <Skeleton className="h-10 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
