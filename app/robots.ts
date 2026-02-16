import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neuesleben.uz";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/dashboard-cms-2024/", "/api/", "/login/"],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
