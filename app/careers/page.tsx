import type { Metadata } from "next";
import CareersPageClient from "@/components/careers-page-client";

export const metadata: Metadata = {
  title: "Careers | NEUES LEBEN Pharmaceutical Distribution",
  description:
    "Join the NEUES LEBEN team in Uzbekistan. Explore career opportunities in the pharmaceutical industry and make a difference in healthcare. Карьера в фармацевтике.",
  keywords: [
    "careers", "jobs in Uzbekistan", "pharmaceutical jobs", "NEUES LEBEN jobs", "healthcare careers Tashkent",
    "работа в Ташкенте", "вакансии", "фармацевтика работа", "карьера"
  ],
  openGraph: {
    title: "Careers | NEUES LEBEN Pharmaceutical Distribution",
    description: "Join the NEUES LEBEN team in Uzbekistan. Explore career opportunities in the pharmaceutical industry.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
