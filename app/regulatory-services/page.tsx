import { Metadata } from "next";
import RegulatoryServicesClient from "@/components/regulatory-services-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuesleben.uz";

export const metadata: Metadata = {
    title: "Regulatory Services | NEUES LEBEN",
    description: "Expert regulatory services for pharmaceutical registration in Uzbekistan. Drug registration, medical devices, dietary supplements, and more.",
    keywords: ["regulatory services", "drug registration", "pharmaceutical", "medical devices", "NEUES LEBEN", "Uzbekistan", "регистрация", "ro'yxatdan o'tish"],
    openGraph: {
        title: "Regulatory Services | NEUES LEBEN",
        description: "Expert regulatory services for pharmaceutical registration in Uzbekistan.",
        url: `${siteUrl}/regulatory-services`,
        siteName: "NEUES LEBEN",
        type: "website",
    },
    alternates: {
        canonical: `${siteUrl}/regulatory-services`,
    },
};

export default function RegulatoryServicesPage() {
    return <RegulatoryServicesClient />;
}
