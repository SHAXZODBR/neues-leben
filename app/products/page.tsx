import { Metadata } from "next";
import { loadProducts } from "@/lib/products-data";
import ProductsCatalog from "@/components/products-catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuesleben.uz";

export const metadata: Metadata = {
  title: "Products | NEUES LEBEN Pharmaceutical Distribution",
  description: "Browse our complete catalog of pharmaceutical products distributed by NEUES LEBEN in Uzbekistan. Quality medicines and healthcare products.",
  keywords: [
    "pharmaceutical products", "medicine", "drugs", "NEUES LEBEN", "Uzbekistan", "healthcare",
    "лекарства", "фармацевтика Узбекистан", "медикаменты", "аптека", "препараты",
    "dori-darmonlar", "tibbiyot", "O'zbekiston", "dori", "prepatarlar"
  ],
  openGraph: {
    title: "Products | NEUES LEBEN Pharmaceutical Distribution",
    description: "Browse our complete catalog of pharmaceutical products distributed by NEUES LEBEN in Uzbekistan. Quality medicines and healthcare products.",
    url: `${siteUrl}/products`,
    siteName: "NEUES LEBEN",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: `${siteUrl}/products`,
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await loadProducts();

  return <ProductsCatalog initialProducts={products} />;
}
