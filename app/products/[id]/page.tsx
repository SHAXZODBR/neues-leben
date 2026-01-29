import { loadProducts, Product } from "@/lib/products-data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all products
export async function generateStaticParams() {
    const products = await loadProducts();
    return products.map((product) => ({
        id: String(product.id),
    }));
}

// Generate metadata for SEO
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

    return {
        title: `${product.name.en} | NEUES LEBEN Pharmaceutical`,
        description: product.description.en,
        keywords: [
            product.name.en,
            product.name.ru,
            product.category.en,
            "pharmaceutical",
            "NEUES LEBEN",
            "Uzbekistan",
            ...product.features.en,
        ],
        openGraph: {
            title: `${product.name.en} | NEUES LEBEN`,
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
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name.en} | NEUES LEBEN`,
            description: product.description.en,
            images: [product.image],
        },
        alternates: {
            canonical: `${siteUrl}/products/${product.id}`,
        },
    };
}

// Auto-format plain text medical info into clean HTML
function formatMedicalText(text: string): string {
    if (!text) return "";

    const lines = text.split("\n");
    let html = "";
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (!line) {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            continue;
        }

        // Check if line starts with bullet point markers
        const bulletMatch = line.match(/^[•\-\*—]\s*/);
        if (bulletMatch) {
            if (!inList) {
                html += '<ul class="list-disc pl-6 my-4 space-y-2">';
                inList = true;
            }
            const content = line.substring(bulletMatch[0].length).trim();
            html += `<li class="text-gray-700 dark:text-gray-300">${content}</li>`;
        }
        // Check if line is a section header (ends with colon and is short)
        else if (line.endsWith(":") && line.length < 80) {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += `<h3 class="font-bold text-emerald-600 dark:text-emerald-400 mt-6 mb-3 text-lg">${line}</h3>`;
        }
        // Regular paragraph
        else {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += `<p class="my-3 text-gray-700 dark:text-gray-300 leading-relaxed">${line}</p>`;
        }
    }

    if (inList) {
        html += "</ul>";
    }

    return html;
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
    const medicalInfo = product.medicalInfo?.en || "";
    const formattedMedicalInfo = formatMedicalText(medicalInfo);

    // JSON-LD structured data for product
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name.en,
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

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative py-12 bg-gradient-to-br from-primary/10 via-background to-primary/5">
                    <div className="container px-4 md:px-6">
                        {/* Back Button */}
                        <Link href="/products">
                            <Button variant="ghost" className="mb-6 gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Products
                            </Button>
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Product Image */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                                <div className="relative w-full aspect-square flex items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name.en}
                                        width={600}
                                        height={600}
                                        className="object-contain w-full h-full drop-shadow-xl"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-2">
                                        {product.category.en}
                                    </p>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                        {product.name.en}
                                    </h1>
                                    <p className="text-lg text-muted-foreground mt-2">
                                        {product.name.ru}
                                    </p>
                                </div>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {product.description.en}
                                </p>

                                {/* Features */}
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground mb-4">
                                        Key Features
                                    </h2>
                                    <ul className="space-y-2">
                                        {product.features.en.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-3 text-muted-foreground"
                                            >
                                                <span className="text-primary mt-1 flex-shrink-0">
                                                    •
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contact CTA */}
                                <div className="pt-4">
                                    <Link href="/#contact">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Contact for Inquiries
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Medical Information Section */}
                {formattedMedicalInfo && (
                    <section className="py-16">
                        <div className="container px-4 md:px-6">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                                    Product Information
                                </h2>
                                <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                                    <div
                                        className="prose prose-lg max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: formattedMedicalInfo }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Fallback: Show description if no medical info */}
                {!formattedMedicalInfo && (
                    <section className="py-16">
                        <div className="container px-4 md:px-6">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                                    Product Details
                                </h2>
                                <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {product.description.en}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
