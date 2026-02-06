"use client";

import Link from "next/link";
import { ArrowUpRight, Search, Eye, Quote, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { MedicalDisclaimerModal } from "@/components/medical-disclaimer-modal";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { getCategoryTranslation } from "@/lib/category-translations";


type PostSummary = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string | null;
  author_credentials?: string | null;
  cover_image?: string | null;
  category?: string | null;
  specialty?: string | null;
  reading_time?: string | null;
  featured?: boolean | null;
  views?: number | null;
  citations?: number | null;
};

type DbPost = {
  id: string | null;
  slug: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  image_url?: string | null;
  created_at?: string | null;
  author?: string | null;
  author_credentials?: string | null;
  category?: string | null;
  specialty?: string | null;
  reading_time?: string | null;
  featured?: boolean | null;
  views?: number | null;
  citations?: number | null;
  title_i18n?: Record<string, string> | null;
  summary_i18n?: Record<string, string> | null;
  content_i18n?: Record<string, string> | null;
};

const normalizePost = (post: DbPost, language: string): PostSummary => {
  // Get localized fields with fallback to English
  const localizedTitle = getLocalizedField(post.title_i18n, language as any, "en") || post.title;
  const localizedSummary = getLocalizedField(post.summary_i18n, language as any, "en") || post.summary || "";
  const localizedContent = getLocalizedField(post.content_i18n, language as any, "en") || post.content || "";

  const plainContent = localizedContent ? localizedContent.replace(/<[^>]*>/g, "") : "";
  const excerptSource = localizedSummary || plainContent;
  const id = post.id || post.slug;

  return {
    id,
    slug: post.slug,
    title: localizedTitle,
    date: post.created_at || new Date().toISOString(),
    excerpt: excerptSource
      ? `${excerptSource.slice(0, 180)}${excerptSource.length > 180 ? "…" : ""}`
      : "",
    author: post.author,
    author_credentials: post.author_credentials,
    cover_image: post.image_url,
    category: post.category || null,
    specialty: post.specialty,
    reading_time: post.reading_time,
    featured: post.featured,
    views: post.views,
    citations: post.citations,
  };
};

const formatDate = (isoDate: string, language: string) => {
  const localeMap: Record<string, string> = {
    en: "en-US",
    uz: "uz-UZ",
    ru: "ru-RU",
    de: "de-DE",
  };
  return new Date(isoDate).toLocaleDateString(localeMap[language] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogPageClient() {
  const { t, language } = useLanguage();

  // Create supabase client inside component
  const supabase = useMemo(() => createClient(), []);

  const [allPosts, setAllPosts] = useState<PostSummary[]>([]);
  const [popularPosts, setPopularPosts] = useState<PostSummary[]>([]);
  const [mostCitedPosts, setMostCitedPosts] = useState<PostSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Medical disclaimer modal state
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const PAGE_SIZE = 12;

  // Track post clicks
  const trackPostClick = useCallback(async (postId: string) => {
    if (!supabase) return;
    try {
      await supabase.rpc('increment_post_views', { post_id: postId });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  }, [supabase]);

  // Check if user has already confirmed
  useEffect(() => {
    const confirmed = sessionStorage.getItem("medical_professional_confirmed");
    if (confirmed === "true") {
      setIsConfirmed(true);
    } else {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDisclaimerConfirm = () => {
    setIsConfirmed(true);
    setShowDisclaimer(false);
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("Database connection not available");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const normalized = (data as DbPost[] | null)?.map((post) => normalizePost(post, language)) ?? [];
    setAllPosts(normalized);

    const uniqueCategories = Array.from(
      new Set(
        normalized
          .map((post) => post.category)
          .filter((cat): cat is string => Boolean(cat) && cat !== "General")
      )
    ).sort(); // Sort alphabetically
    setCategories(uniqueCategories);

    const byViews = [...normalized].sort(
      (a, b) => (b.views ?? 0) - (a.views ?? 0)
    );
    setPopularPosts(byViews.slice(0, 4));

    const byCitations = [...normalized].sort(
      (a, b) => (b.citations ?? 0) - (a.citations ?? 0)
    );
    setMostCitedPosts(byCitations.slice(0, 3));

    setLoading(false);
  }, [language]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6">
            {/* Animated Icon */}
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl animate-spin" style={{ animationDuration: '3s' }} />
              <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-8">
                <div className="animate-bounce">
                  <svg className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '2s' }}>
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {t("blog.loading")}
              </h2>
              <div className="flex items-center justify-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0s' }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto relative">
              <div className="absolute inset-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          {t("nav.blog")}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">
          {t("blog.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{error}</p>
        <button
          onClick={fetchPosts}
          className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
        >
          {t("blog.tryAgain")}
        </button>
      </section>
    );
  }

  // Filter posts
  let filteredPosts = allPosts;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredPosts = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  } else if (selectedCategory) {
    filteredPosts = allPosts.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (!allPosts.length) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          {t("nav.blog")}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">
          {t("blog.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("blog.subtitle")}</p>
      </section>
    );
  }

  // When filtering is active, show all posts in grid. Otherwise use hero/secondary layout
  const isFiltering = !!(searchQuery || selectedCategory);

  const gridPosts = isFiltering ? filteredPosts : (() => {
    const heroPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
    const secondaryPosts = filteredPosts
      .filter((post) => post.slug !== heroPost?.slug)
      .slice(0, 2);

    return filteredPosts.filter(
      (post) =>
        post.slug !== heroPost?.slug &&
        !secondaryPosts.some((secondary) => secondary.slug === post.slug)
    );
  })();

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagedPosts = gridPosts.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <>
      <MedicalDisclaimerModal
        isOpen={showDisclaimer}
        onConfirm={handleDisclaimerConfirm}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 via-background to-background rounded-3xl shadow-sm">
        {/* Hero Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bookmark className="h-4 w-4" />
            {t("blog.peerReviewed")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4 text-balance">
            {t("blog.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("blog.subtitle")}
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl mx-auto items-center gap-2 rounded-full border border-border bg-card/90 px-5 py-3 shadow-md backdrop-blur"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("blog.search")}
            </button>
          </form>

          {/* Archive Link */}
          <div className="mt-5">
            <Link
              href="/blog/archive"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              {t("blog.browseArchive")}
            </Link>
          </div>

          {(searchQuery || selectedCategory) && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">
                {t("blog.showingArticles").replace(
                  "{count}",
                  String(filteredPosts.length)
                )}
                {selectedCategory && (
                  <>
                    {" "}
                    {t("blog.inCategory")}{" "}
                    <span className="font-semibold text-primary">
                      {selectedCategory}
                    </span>
                  </>
                )}
                {searchQuery && (
                  <>
                    {" "}
                    {t("blog.matching")}{" "}
                    <span className="font-semibold">"{searchQuery}"</span>
                  </>
                )}
              </p>
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {t("blog.specialties")}
            </h2>
            {selectedCategory && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:border-primary"
                }`}
            >
              {t("blog.allCategories")}
            </button>
            {categories.map((cat) => {
              const count = allPosts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary"
                    }`}
                >
                  {getCategoryTranslation(cat, language)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Featured Post - Only show when not filtering */}
        {!isFiltering && filteredPosts.length > 0 && (() => {
          const heroPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
          return (
            <article className="mb-12 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg transition hover:shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Hero Image */}
                <div className="relative h-64 lg:h-full min-h-[400px]">
                  {heroPost.cover_image && (
                    <img
                      src={heroPost.cover_image}
                      alt={heroPost.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Bookmark className="h-3 w-3" />
                      Featured
                    </span>
                  </div>
                </div>

                {/* Hero Content */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(heroPost.category || "");
                    }}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline mb-3"
                  >
                    {heroPost.category ? getCategoryTranslation(heroPost.category, language) : ""}
                  </button>

                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                    <Link
                      href={`/blog/${heroPost.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {heroPost.title}
                    </Link>
                  </h2>

                  <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                    {heroPost.excerpt}
                  </p>

                  {/* Author & Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    {heroPost.author && (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {heroPost.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{heroPost.author}</p>
                          {heroPost.author_credentials && (
                            <p className="text-xs">{heroPost.author_credentials}</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      {heroPost.reading_time && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {heroPost.reading_time}
                        </span>
                      )}
                      {heroPost.views !== null && heroPost.views !== undefined && heroPost.views > 0 && (
                        <span>{heroPost.views.toLocaleString()} clicks</span>
                      )}
                      {heroPost.citations !== null && heroPost.citations !== undefined && heroPost.citations > 0 && (
                        <span className="flex items-center gap-1">
                          <Quote className="h-4 w-4" />
                          {heroPost.citations} citations
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${heroPost.slug}`}
                    onClick={() => trackPostClick(heroPost.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors w-fit"
                  >
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })()}

        {/* Articles Grid - 3 Columns */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">
            {selectedCategory ? `${selectedCategory} Articles` : t("blog.allPublications")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagedPosts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  {post.cover_image && (
                    <img
                      src={post.cover_image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(post.category || "");
                      }}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
                    >
                      {post.category ? getCategoryTranslation(post.category, language) : ""}
                    </button>
                  </div>
                  <h3 className="text-base font-semibold text-foreground line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => trackPostClick(post.id)}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(post.date, language)}</span>
                    {post.views !== null && post.views !== undefined && post.views > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${safePage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                ← {t("blog.previous")}
              </button>

              <span className="text-sm text-muted-foreground">
                {t("blog.page")} {safePage} {t("blog.of")} {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, safePage + 1))
                }
                disabled={safePage === totalPages}
                className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${safePage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {t("blog.next")} →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
