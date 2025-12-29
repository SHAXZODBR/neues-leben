"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journal
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-5 w-96 mt-3" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-10 w-16 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex flex-col items-center justify-center py-12 mb-8">
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
              <CalendarDays className="h-10 w-10 text-primary" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p className="text-base font-medium text-foreground">Loading Archive...</p>
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
      {/* Timeline Skeletons */}
      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        {[0, 1].map((yearIndex) => (
          <div key={yearIndex} className="mb-12">
            {/* Year Header Skeleton */}
            <div className="relative flex items-center gap-4 mb-8">
              <Skeleton className="w-8 md:w-16 h-8 md:h-10 rounded-full" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Month Posts Skeleton */}
            <div className="relative ml-4 md:ml-8 mb-8">
              <div className="absolute -left-4 md:-left-8 top-2 w-2 h-2 rounded-full bg-primary/50" />
              <div className="pl-6 md:pl-8">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                      <Skeleton className="hidden sm:block w-20 h-20 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <Skeleton className="hidden md:block w-10 h-10 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
