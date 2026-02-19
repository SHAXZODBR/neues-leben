import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewsArticleContent from "./news-article-content";

type NewsPost = {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    content: string;
    image_url: string | null;
    video_url: string | null;
    category: string | null;
    published: boolean;
    created_at: string | null;
    title_i18n?: Record<string, string> | null;
    summary_i18n?: Record<string, string> | null;
    content_i18n?: Record<string, string> | null;
};

async function fetchPost(slug: string): Promise<NewsPost | null> {
    const supabase = await createClient();
    if (!supabase) return null;

    // First try by slug
    const { data: bySlug, error: slugError } = await supabase
        .from("company_news")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (!slugError && bySlug) return bySlug;

    // Fallback try by ID (if slug looks like a UUID)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-12a-f]{12}$/i.test(slug);
    if (isUuid) {
        const { data: byId, error: idError } = await supabase
            .from("company_news")
            .select("*")
            .eq("id", slug)
            .eq("published", true)
            .single();
        if (!idError && byId) return byId;
    }

    return null;
}

async function fetchRelatedPosts(
    currentId: string,
    category: string | null
): Promise<NewsPost[]> {
    const supabase = await createClient();
    if (!supabase) return [];
    let query = supabase
        .from("company_news")
        .select("id, title, slug, summary, image_url, video_url, category, created_at, title_i18n, summary_i18n")
        .eq("published", true)
        .neq("id", currentId)
        .order("created_at", { ascending: false })
        .limit(3);

    if (category) {
        query = query.eq("category", category);
    }

    const { data } = await query;
    return (data as NewsPost[]) || [];
}

export async function generateStaticParams() {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase
        .from("company_news")
        .select("slug")
        .eq("published", true);

    return (data || []).map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchPost(slug);
    if (!post) {
        return { title: "News Not Found | NEUES LEBEN" };
    }
    return {
        title: `${post.title} | NEUES LEBEN News`,
        description: post.summary || post.title,
        openGraph: {
            title: post.title,
            description: post.summary || post.title,
            type: "article",
            ...(post.image_url && { images: [{ url: post.image_url }] }),
        },
        alternates: {
            canonical: `https://www.neuesleben.uz/news/${slug}`,
        },
    };
}

export const revalidate = 60;

export default async function NewsArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await fetchPost(slug);
    if (!post) notFound();

    const relatedPosts = await fetchRelatedPosts(post.id, post.category);

    return <NewsArticleContent post={post} relatedPosts={relatedPosts} />;
}
