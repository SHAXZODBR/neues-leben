import { loadProducts } from "@/lib/products-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page-client";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all products
export async function generateStaticParams() {
    const products = await loadProducts();
    return products.map((product) => ({
        id: String(product.id),
    }));
}

// Generate metadata for SEO (includes all languages for better indexing)
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const products = await loadProducts();
    const product = products.find((p) => String(p.id) === id);

    if (!product) {
        return {
            title: "Product Not Found | NEUES LEBEN",
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuesleben.uz";

    // Include all language names in keywords for better SEO
    return {
        title: `${product.name.en} (${product.name.ru}) | NEUES LEBEN`,
        description: `${product.description.en} | ${product.description.ru}`,
        keywords: [
            product.name.en,
            product.name.ru,
            product.name.uz,
            product.name.de,
            product.category.en,
            product.category.ru,
            "pharmaceutical",
            "NEUES LEBEN",
            "Uzbekistan",
            "лекарства",
            "dori",
            ...product.features.en,
            ...product.features.ru,
        ],
        openGraph: {
            title: `${product.name.en} (${product.name.ru}) | NEUES LEBEN`,
            description: product.description.en,
            url: `${siteUrl}/products/${product.id}`,
            siteName: "NEUES LEBEN",
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: product.name.en,
                },
            ],
            type: "website",
            locale: "en_US",
            alternateLocale: ["ru_RU", "uz_UZ", "de_DE"],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name.en} | NEUES LEBEN`,
            description: product.description.en,
            images: [product.image],
        },
        alternates: {
            canonical: `${siteUrl}/products/${product.id}`,
            languages: {
                'en': `${siteUrl}/products/${product.id}`,
                'ru': `${siteUrl}/products/${product.id}`,
                'uz': `${siteUrl}/products/${product.id}`,
                'de': `${siteUrl}/products/${product.id}`,
                'x-default': `${siteUrl}/products/${product.id}`,
            },
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products = await loadProducts();
    const product = products.find((p) => String(p.id) === id);

    if (!product) {
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuesleben.uz";

    // JSON-LD structured data with multiple language names
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name.en,
        alternateName: [product.name.ru, product.name.uz, product.name.de],
        description: product.description.en,
        image: product.image.startsWith("http")
            ? product.image
            : `${siteUrl}${product.image}`,
        brand: {
            "@type": "Brand",
            name: "NEUES LEBEN",
        },
        manufacturer: {
            "@type": "Organization",
            name: "NEUES LEBEN LLC",
            url: siteUrl,
        },
        category: product.category.en,
        url: `${siteUrl}/products/${product.id}`,
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ProductPageClient product={product} />
        </>
    );
}
