import { Metadata } from "next";
import RegulatoryServicesClient from "@/components/regulatory-services-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuesleben.uz";

export const metadata: Metadata = {
    title: "Regulatory Services | NEUES LEBEN Pharmaceutical Distribution",
    description: "Expert regulatory services for pharmaceutical registration in Uzbekistan. Drug registration, medical devices, dietary supplements, and more.",
    keywords: [
        "regulatory services", "drug registration Uzbekistan", "pharmaceutical compliance", "medical devices registration",
        "регистрация лекарств", "регуляторные услуги", "Узбекистан", "медтехника",
        "dori vositalarini ro'yxatdan o'tkash", "regulyator xizmatlar", "O'zbekiston"
    ],
    openGraph: {
        title: "Regulatory Services | NEUES LEBEN",
        description: "Expert regulatory services for pharmaceutical registration in Uzbekistan.",
        url: `${siteUrl}/regulatory-services`,
        siteName: "NEUES LEBEN",
        type: "website",
        locale: "ru_RU",
    },
    alternates: {
        canonical: `${siteUrl}/regulatory-services`,
    },
};

export default function RegulatoryServicesPage() {
    return <RegulatoryServicesClient />;
}
