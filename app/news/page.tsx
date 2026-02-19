import type { Metadata } from "next";
import NewsPageClient from "@/components/news-page-client";

export const metadata: Metadata = {
    title: "Company News | NEUES LEBEN",
    description:
        "Latest news, events, and updates from NEUES LEBEN pharmaceutical distribution company in Uzbekistan. Новости фармацевтического рынка Узбекистана.",
    keywords: [
        "pharmaceutical news", "healthcare updates", "NEUES LEBEN news", "Uzbekistan healthcare",
        "новости фармацевтики", "Узбекистан", "события", "фармрынок"
    ],
    openGraph: {
        title: "Company News | NEUES LEBEN Pharmaceutical Distribution",
        description:
            "Latest news, events, and updates from NEUES LEBEN pharmaceutical distribution company in Uzbekistan. Новости фармацевтического рынка Узбекистана.",
        type: "website",
        locale: "ru_RU",
    },
    alternates: {
        canonical: "https://www.neuesleben.uz/news",
    },
};

export default function NewsPage() {
    return <NewsPageClient />;
}
