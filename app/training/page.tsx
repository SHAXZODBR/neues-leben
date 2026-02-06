import { Metadata } from "next";
import TrainingPageClient from "@/components/training-page-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuesleben.uz";

export const metadata: Metadata = {
    title: "Medical Representative Training | NEUES LEBEN",
    description: "Join NEUES LEBEN's comprehensive medical representative training program in Uzbekistan. Mentorship, practical experience, and job placement assistance.",
    keywords: ["medical representative training", "pharmaceutical training", "NEUES LEBEN", "Uzbekistan", "healthcare education", "обучение", "ta'lim"],
    openGraph: {
        title: "Medical Representative Training | NEUES LEBEN",
        description: "Join NEUES LEBEN's comprehensive medical representative training program in Uzbekistan.",
        url: `${siteUrl}/training`,
        siteName: "NEUES LEBEN",
        type: "website",
    },
    alternates: {
        canonical: `${siteUrl}/training`,
    },
};

export default function TrainingPage() {
    return <TrainingPageClient />;
}
