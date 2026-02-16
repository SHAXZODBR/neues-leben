import HeroSection from "@/components/hero-section";
import MedicalJournalCTA from "@/components/medical-journal-cta";
import AboutSection from "@/components/about-section";
import ProductsSection from "@/components/products-section";
import MissionSection from "@/components/mission-section";
import ValuesSection from "@/components/values-section";
import TeamSection from "@/components/team-section";
import TestimonialsSection from "@/components/testimonials-section";
import CultureSection from "@/components/culture-section";
import AchievementsSection from "@/components/achievements-section";
import PartnersSection from "@/components/partners-section";
import InfrastructureSection from "@/components/infrastructure-section";
import CoverageSection from "@/components/coverage-section";
import ContactSection from "@/components/contact-section";
import ScrollToTop from "@/components/scroll-to-top";
import { loadProducts } from "@/lib/products-data";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuesleben.uz";

export const metadata: Metadata = {
  title: "NEUES LEBEN | Фармацевтическая Дистрибуция в Узбекистане",
  description:
    "NEUES LEBEN LLC — ведущая фармацевтическая дистрибьюторская компания в Узбекистане. Качественные лекарства, своевременная доставка, надежное партнерство. Pharmaceutical distribution in Uzbekistan.",
  keywords: [
    "NEUES LEBEN", "Нойес Лебен", "neuesleben",
    "фармацевтика Узбекистан", "лекарства Узбекистан", "дистрибуция лекарств Ташкент",
    "фармацевтическая компания Ташкент", "медикаменты", "фармацевтические препараты",
    "pharmaceutical distribution Uzbekistan", "medicine Tashkent",
    "dori vositalari", "farmatsevtika O'zbekiston", "dori taqsimoti Toshkent",
  ],
  openGraph: {
    title: "NEUES LEBEN | Фармацевтическая Дистрибуция в Узбекистане",
    description: "Ведущая фармацевтическая дистрибьюторская компания в Узбекистане. Качество, своевременная доставка, надежное партнерство.",
    url: siteUrl,
    siteName: "NEUES LEBEN",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const revalidate = 3600; // Revalidate every hour

// JSON-LD Structured Data for Organization + LocalBusiness
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "NEUES LEBEN LLC",
        "alternateName": ["Нойес Лебен", "NEUES LEBEN", "neuesleben"],
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/icon.png`,
          "width": 512,
          "height": 512,
        },
        "description": "NEUES LEBEN LLC — фармацевтическая дистрибьюторская компания в Узбекистане. Качественные лекарства, своевременная доставка.",
        "foundingDate": "2018",
        "sameAs": [],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+998-71-123-4567",
            "contactType": "customer service",
            "email": "info@neuesleben.uz",
            "availableLanguage": ["Russian", "Uzbek", "English", "German"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": "NEUES LEBEN LLC",
        "image": `${siteUrl}/icon.png`,
        "url": siteUrl,
        "@isPartOf": { "@id": `${siteUrl}/#organization` },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tashkent",
          "addressRegion": "Tashkent",
          "addressCountry": "UZ",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 41.2995,
          "longitude": 69.2401,
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "NEUES LEBEN",
        "description": "Фармацевтическая дистрибьюторская компания в Узбекистане",
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": ["ru", "en", "uz", "de"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function Home() {
  const products = await loadProducts();

  return (
    <>
      <JsonLd />
      <div className="flex flex-col items-center justify-center">
        <HeroSection />
        <MedicalJournalCTA />
        <AboutSection />
        <ProductsSection products={products} />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        <CultureSection />
        <AchievementsSection />
        <PartnersSection />
        <InfrastructureSection />
        <CoverageSection />
        <TestimonialsSection />
        <ContactSection />
        <ScrollToTop />
      </div>
    </>
  );
}
