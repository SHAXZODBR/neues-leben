"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Declare gtag on window
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

function GoogleAnalyticsTracking() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

        // Track page view
        window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}

export default function GoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) {
        return null;
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            {/* Track route changes */}
            <Suspense fallback={null}>
                <GoogleAnalyticsTracking />
            </Suspense>
        </>
    );
}

// Helper function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
}
