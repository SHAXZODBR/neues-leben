import { Metadata } from "next";
import BlogPageClient from "@/components/blog-page-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuesleben.uz";

export const metadata: Metadata = {
    title: "Medical Journal | NEUES LEBEN",
    description: "Peer-reviewed medical research, clinical reviews, and pharmaceutical insights from NEUES LEBEN. Evidence-based articles for healthcare professionals.",
    keywords: ["medical journal", "pharmaceutical research", "clinical reviews", "NEUES LEBEN", "healthcare", "медицинский журнал", "tibbiy jurnal"],
    openGraph: {
        title: "Medical Journal | NEUES LEBEN",
        description: "Peer-reviewed medical research and clinical reviews for healthcare professionals.",
        url: `${siteUrl}/blog`,
        siteName: "NEUES LEBEN",
        type: "website",
    },
    alternates: {
        canonical: `${siteUrl}/blog`,
    },
};

export default function BlogPage() {
    return <BlogPageClient />;
}
