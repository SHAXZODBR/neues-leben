"use client";

import Link from "next/link";
import { CalendarDays, FileText, ArrowLeft, Search } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

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
};

const normalizePost = (post: DbPost): PostSummary => {
  const plainContent = post.content ? post.content.replace(/<[^>]*>/g, "") : "";
  const excerptSource = post.summary || plainContent;
  const id = post.id || post.slug;

  return {
    id,
    slug: post.slug,
    title: post.title,
    date: post.created_at || new Date().toISOString(),
    excerpt: excerptSource
      ? `${excerptSource.slice(0, 180)}${excerptSource.length > 180 ? "…" : ""
      }`
      : "",
    author: post.author,
    author_credentials: post.author_credentials,
    cover_image: post.image_url,
    category: post.category || "General",
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
    month: "short",
    day: "numeric",
  });
};

const getMonthName = (date: Date, language: string) => {
  const localeMap: Record<string, string> = {
    en: "en-US",
    uz: "uz-UZ",
    ru: "ru-RU",
    de: "de-DE",
  };
  return date.toLocaleDateString(localeMap[language] || "en-US", {
    month: "long",
  });
};

export default function BlogArchivePage() {
  const { t, language } = useLanguage();

  // Create supabase client inside component
  const supabase = useMemo(() => createClient(), []);

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      .select("id, title, slug, summary, content, image_url, category, specialty, published, created_at, featured, views, citations, author, author_credentials, reading_time")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const normalized = (data as DbPost[] | null)?.map(normalizePost) ?? [];
    setPosts(normalized);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">
            {t("blog.loading")}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
          {t("blog.completeArchive")}
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t("blog.allPublicationsArchive")}
        </h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button
          onClick={fetchPosts}
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
        >
          {t("blog.tryAgain")}
        </button>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
          {t("blog.completeArchive")}
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t("blog.allPublicationsArchive")}
        </h1>
        <p className="text-muted-foreground">{t("blog.subtitle")}</p>
      </section>
    );
  }

  // Group by year and month
  const grouped = posts.reduce<Record<string, Record<string, typeof posts>>>(
    (acc, post) => {
      const date = new Date(post.date);
      const year = date.getFullYear().toString();
      const month = getMonthName(date, language);

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(post);
      return acc;
    },
    {}
  );

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const totalArticles = posts.length;
  const totalCategories = new Set(
    posts.map((p) => p.category).filter((cat): cat is string => Boolean(cat))
  ).size;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("blog.backToJournal")}
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">
              {t("blog.completeArchive")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("blog.allPublicationsArchive")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("blog.archiveDescription")}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{totalArticles}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("blog.articles")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {totalCategories}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("blog.specialties")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{years.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("blog.years")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Archive */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        {years.map((year) => (
          <div key={year} className="mb-12">
            {/* Year Header */}
            <div className="relative flex items-center gap-4 mb-8">
              <div className="w-8 md:w-16 h-8 md:h-10 rounded-full bg-primary flex items-center justify-center z-10">
                <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {year}
              </h2>
              <span className="text-sm text-muted-foreground">
                ({Object.values(grouped[year]).flat().length}{" "}
                {t("blog.articles").toLowerCase()})
              </span>
            </div>

            {/* Months */}
            {Object.entries(grouped[year])
              .sort((a, b) => {
                const dateA =
                  posts.find(
                    (p) => getMonthName(new Date(p.date), language) === a[0]
                  )?.date || "";
                const dateB =
                  posts.find(
                    (p) => getMonthName(new Date(p.date), language) === b[0]
                  )?.date || "";
                return new Date(dateB).getTime() - new Date(dateA).getTime();
              })
              .map(([month, monthPosts]) => (
                <div
                  key={`${year}-${month}`}
                  className="relative ml-4 md:ml-8 mb-8"
                >
                  {/* Month indicator */}
                  <div className="absolute -left-4 md:-left-8 top-2 w-2 h-2 rounded-full bg-primary/50" />

                  <div className="pl-6 md:pl-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      {month}
                      <span className="text-xs text-muted-foreground font-normal">
                        ({monthPosts.length}{" "}
                        {monthPosts.length === 1
                          ? t("blog.article")
                          : t("blog.articles").toLowerCase()}
                        )
                      </span>
                    </h3>

                    <div className="space-y-3">
                      {monthPosts.map((post) => (
                        <article
                          key={post.slug}
                          className="group flex gap-4 p-4 rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-sm transition-all"
                        >
                          {/* Thumbnail */}
                          {post.cover_image && (
                            <div className="hidden sm:block w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <img
                                src={post.cover_image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                                {post.category}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" />
                                {formatDate(post.date, language)}
                              </span>
                            </div>

                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:underline"
                              >
                                {post.title}
                              </Link>
                            </h4>

                            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                              {post.excerpt}
                            </p>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all self-center"
                          >
                            <FileText className="h-4 w-4" />
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {t("blog.lookingForResearch")}
        </h3>
        <p className="text-muted-foreground mb-6">{t("blog.useSearch")}</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          <Search className="h-4 w-4" />
          {t("blog.searchArticles")}
        </Link>
      </div>
    </section>
  );
}
