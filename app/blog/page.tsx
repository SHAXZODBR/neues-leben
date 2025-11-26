"use client";

import Link from "next/link";
import { ArrowUpRight, Search, Eye, Quote, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import {
  getAllPosts,
  getPopularPosts,
  getMostCitedPosts,
  getAllCategories,
} from "@/lib/posts";

type PostSummary = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  author_credentials?: string;
  tags?: string[];
  cover_image?: string;
  category?: string;
  specialty?: string;
  reading_time?: string;
  featured?: boolean;
  views?: number;
  citations?: number;
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

export default function BlogIndexPage() {
  const { t, language } = useLanguage();

  // Get data directly from mock
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const popularPosts = getPopularPosts(4);
  const mostCitedPosts = getMostCitedPosts(3);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 12;

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

  const heroPost =
    filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  const secondaryPosts = filteredPosts
    .filter((post) => post.slug !== heroPost?.slug)
    .slice(0, 2);

  const gridPosts = filteredPosts.filter(
    (post) =>
      post.slug !== heroPost?.slug &&
      !secondaryPosts.some((secondary) => secondary.slug === post.slug)
  );

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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
          className="flex w-full max-w-2xl mx-auto items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-sm"
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

      {heroPost && (
        <>
          {/* Featured Article + Secondary */}
          <div className="grid gap-6 lg:grid-cols-3 mb-12">
            <Link
              href={`/blog/${heroPost.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white lg:col-span-2"
            >
              <div className="relative h-80 w-full">
                {heroPost.cover_image && (
                  <img
                    src={heroPost.cover_image || "/placeholder.svg"}
                    alt={heroPost.title}
                    className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="relative p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
                  <span className="px-3 py-1 bg-primary/90 rounded-full font-semibold">
                    {heroPost.category}
                  </span>
                  <span className="text-white/50">•</span>
                  <span className="text-white/70">
                    {formatDate(heroPost.date, language)}
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  {heroPost.title}
                </h2>
                <p className="mt-4 text-base text-slate-200 line-clamp-2">
                  {heroPost.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t("blog.readFullArticle")}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <div className="grid gap-6">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-36 w-full">
                    {post.cover_image && (
                      <img
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {post.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {formatDate(post.date, language)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content + Sidebar */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(320px,1fr)]">
        {/* Articles Grid */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">
            {t("blog.allPublications")}
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
                      {post.category}
                    </button>
                  </div>
                  <h3 className="text-base font-semibold text-foreground line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {formatDate(post.date, language)}
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
                className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${
                  safePage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${
                  safePage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {t("blog.next")} →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Categories */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
              {t("blog.specialties")}
            </p>
            <ul className="space-y-2">
              {categories.slice(0, 8).map((cat) => {
                const count = allPosts.filter((p) => p.category === cat).length;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors ${
                        selectedCategory === cat ? "bg-accent" : ""
                      }`}
                    >
                      <span className="font-medium text-foreground">{cat}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Popular Articles */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                {t("blog.mostRead")}
              </p>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-2xl font-bold text-muted-foreground/50 w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.views?.toLocaleString()} {t("blog.views")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Most Cited */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                {t("blog.mostCited")}
              </p>
              <Quote className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {mostCitedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-3 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {post.citations} {t("blog.citations")}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-5">
            <h3 className="font-bold text-foreground mb-2">
              {t("blog.medicalUpdates")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("blog.newsletterText")}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="you@hospital.org"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t("blog.subscribe")}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}
