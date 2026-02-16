import { Metadata } from "next";
import BlogPageClient from "@/components/blog-page-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuesleben.uz";

export const metadata: Metadata = {
    title: "Medical Journal | NEUES LEBEN Pharmaceutical Distribution",
    description: "Peer-reviewed medical research, clinical reviews, and pharmaceutical insights from NEUES LEBEN in Uzbekistan. Evidence-based articles for healthcare professionals.",
    keywords: [
        "medical journal", "pharmaceutical research", "clinical reviews", "NEUES LEBEN", "healthcare",
        "медицинский журнал", "клинические обзоры", "фармацевтические исследования",
        "tibbiy jurnal", "klinik sharhlar", "farmatsevtika tadqiqotlari"
    ],
    openGraph: {
        title: "Medical Journal | NEUES LEBEN",
        description: "Peer-reviewed medical research and clinical reviews for healthcare professionals in Uzbekistan.",
        url: `${siteUrl}/blog`,
        siteName: "NEUES LEBEN",
        type: "website",
        locale: "ru_RU",
    },
    alternates: {
        canonical: `${siteUrl}/blog`,
    },
};

export default function BlogPage() {
    return <BlogPageClient />;
}
