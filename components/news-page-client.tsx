"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { createClient } from "@/lib/supabase/client";

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

const NEWS_CATEGORIES = [
    "Company Update",
    "Event",
    "Partnership",
    "Achievement",
    "Press Release",
    "Community",
];

const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
    "Company Update": { en: "Company Update", uz: "Kompaniya yangiligi", ru: "Обновление компании", de: "Firmennews" },
    "Event": { en: "Event", uz: "Tadbir", ru: "Мероприятие", de: "Veranstaltung" },
    "Partnership": { en: "Partnership", uz: "Hamkorlik", ru: "Партнёрство", de: "Partnerschaft" },
    "Achievement": { en: "Achievement", uz: "Yutuq", ru: "Достижение", de: "Erfolg" },
    "Press Release": { en: "Press Release", uz: "Matbuot xabari", ru: "Пресс-релиз", de: "Pressemitteilung" },
    "Community": { en: "Community", uz: "Jamiyat", ru: "Сообщество", de: "Gemeinschaft" },
};

const CATEGORY_ICONS: Record<string, string> = {
    "Company Update": "📢",
    "Event": "🎉",
    "Partnership": "🤝",
    "Achievement": "🏆",
    "Press Release": "📰",
    "Community": "🌍",
};

function translateCategory(category: string, language: string): string {
    return CATEGORY_TRANSLATIONS[category]?.[language] || category;
}


const POSTS_PER_PAGE = 9;

function getYouTubeThumbnail(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function formatDate(dateStr: string | null, language: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const localeMap: Record<string, string> = {
        en: "en-US",
        uz: "uz-UZ",
        ru: "ru-RU",
        de: "de-DE",
    };
    return date.toLocaleDateString(localeMap[language] || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function NewsPageClient() {
    const { language, t } = useLanguage();
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const supabase = createClient();
            if (!supabase) throw new Error("Supabase not configured");

            const { data, error: fetchError } = await supabase
                .from("company_news")
                .select("*")
                .eq("published", true)
                .order("created_at", { ascending: false });

            if (fetchError) throw fetchError;
            setPosts(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load news");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const localTitle = getLocalizedField(post.title_i18n, language) || post.title;
            const localSummary = getLocalizedField(post.summary_i18n, language) || post.summary || "";

            const matchesSearch =
                !searchQuery ||
                localTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                localSummary.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                !selectedCategory || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory, language]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const pagedPosts = filteredPosts.slice(
        (safePage - 1) * POSTS_PER_PAGE,
        safePage * POSTS_PER_PAGE
    );

    // Featured post is the first post on page 1
    const featuredPost = safePage === 1 && pagedPosts.length > 0 ? pagedPosts[0] : null;
    const gridPosts = safePage === 1 ? pagedPosts.slice(1) : pagedPosts;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    function getPostImage(post: NewsPost): string | null {
        if (post.image_url) return post.image_url;
        if (post.video_url) return getYouTubeThumbnail(post.video_url);
        return null;
    }

    return (
        <section className="min-h-screen">
            {/* ── Hero Section ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 dark:from-black dark:via-primary/30 dark:to-black">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                    <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
                    <div className="absolute top-1/4 left-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px] animate-pulse" style={{ animationDelay: "4s" }} />
                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28 md:py-32">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 mb-6">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-medium tracking-widest uppercase text-white/80">
                                {t("news.badge")}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                            {t("news.title")}
                        </h1>
                        <p className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed mb-10">
                            {t("news.subtitle")}
                        </p>

                        {/* Search Bar in Hero */}
                        <div className="w-full max-w-xl">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/50 via-blue-500/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity blur" />
                                <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                                    <svg className="ml-4 h-5 w-5 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t("news.searchPlaceholder")}
                                        className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/40 outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="mr-4 text-white/40 hover:text-white transition-colors"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" className="fill-background" />
                    </svg>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
                {/* ── Category Filter ── */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${!selectedCategory
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-muted/50 dark:bg-white/5 text-muted-foreground hover:bg-muted dark:hover:bg-white/10 border border-transparent hover:border-border/50"
                                    }`}
                            >
                                {t("news.allCategories")}
                            </button>
                            {NEWS_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${selectedCategory === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "bg-muted/50 dark:bg-white/5 text-muted-foreground hover:bg-muted dark:hover:bg-white/10 border border-transparent hover:border-border/50"
                                        }`}
                                >
                                    <span>{CATEGORY_ICONS[cat]}</span>
                                    {translateCategory(cat, language)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {t("news.showingArticles").replace("{count}", String(filteredPosts.length))}
                    </p>
                </div>

                {/* ── Content ── */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full border-2 border-muted" />
                            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        </div>
                        <span className="text-sm text-muted-foreground">{t("news.loading")}</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="rounded-2xl bg-destructive/5 border border-destructive/10 p-8 text-center max-w-md">
                            <svg className="h-10 w-10 text-destructive/60 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <p className="text-destructive text-sm mb-4">{error}</p>
                            <button
                                onClick={fetchPosts}
                                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                            >
                                {t("news.tryAgain")}
                            </button>
                        </div>
                    </div>
                ) : pagedPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-3">
                        <div className="rounded-2xl bg-muted/30 dark:bg-white/5 border border-border/50 p-10 text-center max-w-md">
                            <svg className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <p className="text-muted-foreground text-sm">{t("news.noResults")}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* ── Featured Post (first post, page 1 only) ── */}
                        {featuredPost && (() => {
                            const localTitle = getLocalizedField(featuredPost.title_i18n, language) || featuredPost.title;
                            const localSummary = getLocalizedField(featuredPost.summary_i18n, language) || featuredPost.summary || "";
                            const postImage = getPostImage(featuredPost);

                            return (
                                <Link
                                    href={`/news/${featuredPost.slug}`}
                                    className="group relative block mb-12 rounded-3xl overflow-hidden border border-border/50 dark:border-white/5 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                                            {postImage ? (
                                                <Image
                                                    src={postImage}
                                                    alt={localTitle}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full min-h-[260px] bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5">
                                                    <svg className="h-16 w-16 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {featuredPost.video_url && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="rounded-full bg-black/40 backdrop-blur-sm p-4 group-hover:bg-primary/80 transition-colors duration-300">
                                                        <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Gradient Overlay on Mobile */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                                                    {CATEGORY_ICONS[featuredPost.category || ""] || "📢"} {translateCategory(featuredPost.category || "News", language)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDate(featuredPost.created_at, language)}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                                                {localTitle}
                                            </h2>
                                            {localSummary && (
                                                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                                                    {localSummary}
                                                </p>
                                            )}
                                            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                                                <span>{t("news.readMore")}</span>
                                                <svg className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* ── Grid Posts ── */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {gridPosts.map((post) => {
                                const localTitle = getLocalizedField(post.title_i18n, language) || post.title;
                                const localSummary = getLocalizedField(post.summary_i18n, language) || post.summary || "";
                                const postImage = getPostImage(post);

                                return (
                                    <Link
                                        key={post.id}
                                        href={`/news/${post.slug}`}
                                        className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/50 dark:border-white/5 bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
                                    >
                                        {/* Card Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-muted dark:bg-white/5">
                                            {postImage ? (
                                                <Image
                                                    src={postImage}
                                                    alt={localTitle}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5">
                                                    <svg className="h-10 w-10 text-primary/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {post.video_url && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="rounded-full bg-black/40 backdrop-blur-sm p-3 group-hover:bg-primary/80 transition-colors duration-300">
                                                        <svg className="h-5 w-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Subtle gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Card Content */}
                                        <div className="flex flex-col flex-1 p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/5 dark:bg-primary/15 rounded-md px-2 py-0.5">
                                                    {CATEGORY_ICONS[post.category || ""] || "📢"} {translateCategory(post.category || "News", language)}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground">
                                                    {formatDate(post.created_at, language)}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                                                {localTitle}
                                            </h3>
                                            {localSummary && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
                                                    {localSummary}
                                                </p>
                                            )}
                                            <div className="mt-4 pt-3 border-t border-border/30 dark:border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                                                    {t("news.readMore")}
                                                    <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="mt-14 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                            disabled={safePage === 1}
                            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${safePage === 1
                                ? "opacity-40 cursor-not-allowed border-border/30"
                                : "border-border/50 hover:border-primary hover:text-primary hover:bg-primary/5"
                                }`}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {t("news.previous")}
                        </button>

                        {/* Page numbers */}
                        <div className="flex items-center gap-1 mx-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => page === 1 || page === totalPages || Math.abs(page - safePage) <= 1)
                                .map((page, idx, arr) => (
                                    <span key={page} className="flex items-center">
                                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                                            <span className="text-muted-foreground px-1">···</span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(page)}
                                            className={`h-9 w-9 rounded-lg text-sm font-semibold transition-all duration-300 ${page === safePage
                                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                                : "text-muted-foreground hover:bg-muted dark:hover:bg-white/5"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    </span>
                                ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                            disabled={safePage === totalPages}
                            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${safePage === totalPages
                                ? "opacity-40 cursor-not-allowed border-border/30"
                                : "border-border/50 hover:border-primary hover:text-primary hover:bg-primary/5"
                                }`}
                        >
                            {t("news.next")}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
