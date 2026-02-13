import type { Metadata } from "next";
import NewsPageClient from "@/components/news-page-client";

export const metadata: Metadata = {
    title: "Company News | NEUES LEBEN",
    description:
        "Latest news, events, and updates from NEUES LEBEN pharmaceutical distribution company in Uzbekistan.",
    openGraph: {
        title: "Company News | NEUES LEBEN",
        description:
            "Latest news, events, and updates from NEUES LEBEN pharmaceutical distribution company.",
        type: "website",
    },
};

export default function NewsPage() {
    return <NewsPageClient />;
}
