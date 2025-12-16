import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BlogShareButton } from "@/components/blog-share-button";
import { BlogVerificationCheck } from "@/components/blog-verification-check";
import { cookies } from "next/headers";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { getCategoryTranslation } from "@/lib/category-translations";

const supabase = createClient();

type BlogPostPageProps = {
  params: { slug: string };
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

type Post = {
  id: string;
  slug: string;
  title: string;
  summary?: string | null;
  content: string;
  image_url?: string | null;
  created_at: string;
  author?: string | null;
  author_credentials?: string | null;
  category?: string | null;
  specialty?: string | null;
  reading_time?: string | null;
  featured?: boolean | null;
  views?: number | null;
  citations?: number | null;
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const normalizePost = (post: DbPost, language: string = "en"): Post => {
  // Get localized fields with fallback to English
  const localizedTitle = getLocalizedField(post.title_i18n, language as any, "en") || post.title;
  const localizedSummary = getLocalizedField(post.summary_i18n, language as any, "en") || post.summary;
  const localizedContent = getLocalizedField(post.content_i18n, language as any, "en") || post.content || "";

  return {
    id: post.id || post.slug,
    slug: post.slug,
    title: localizedTitle,
    summary: localizedSummary,
    content: localizedContent,
    image_url: post.image_url,
    created_at: post.created_at || new Date().toISOString(),
    author: post.author,
    author_credentials: post.author_credentials,
    category: post.category || "General",
    specialty: post.specialty,
    reading_time: post.reading_time,
    featured: post.featured,
    views: post.views,
    citations: post.citations,
  };
};

// Get language from cookies
async function getLanguageFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language");
  return languageCookie?.value || "en";
}

async function fetchPost(slug: string): Promise<Post | null> {
  const language = await getLanguageFromCookies();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return normalizePost(data as DbPost, language);
}

async function fetchRelatedPosts(
  category: string | null,
  slug: string
): Promise<Post[]> {
  const language = await getLanguageFromCookies();

  const query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(6);

  if (category) {
    query.eq("category", category);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  const normalized = (data as DbPost[]).map((post) => normalizePost(post, language));

  if (normalized.length >= 3 || category === null) {
    return normalized.slice(0, 3);
  }

  // fallback to latest posts if not enough in same category
  const { data: fallbackData } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3);

  return (fallbackData as DbPost[] | null)?.map((post) => normalizePost(post, language)) ?? [];
}


// Enable ISR (Incremental Static Regeneration) - cache pages and revalidate every 60 seconds
export const revalidate = 60;

// Pre-generate static pages for all published posts at build time
export async function generateStaticParams() {
  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  return (data || []).map((post) => ({
    slug: post.slug,
  }));
}


export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const post = await fetchPost(params.slug);

  if (!post) {
    return {
      title: "Post not found | Medical Journal",
      description: "The requested article could not be found.",
    };
  }

  const description = post.summary || post.content.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: `${post.title} | Neues Leben Medical Journal`,
    description,
    keywords: [
      post.category || "",
      post.specialty || "",
      "medical research",
      "clinical insights",
      "healthcare",
    ].filter(Boolean),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.created_at,
      authors: post.author ? [post.author] : undefined,
      images: post.image_url
        ? [
          {
            url: post.image_url,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  const allRelated = await fetchRelatedPosts(post.category || null, post.slug);
  const currentLanguage = await getLanguageFromCookies();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <BlogVerificationCheck />
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Journal
      </Link>

      {/* Article Header */}
      <header className="mt-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            {post.category ? getCategoryTranslation(post.category, currentLanguage as any) : "Research"}
          </span>
          {post.specialty && (
            <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              {post.specialty}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {post.summary}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(post.created_at)}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <BlogShareButton
              title={post.title}
              url={`https://neues-leben.uz/blog/${post.slug}`}
            />
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.image_url && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border/70">
          <img
            src={post.image_url || "/placeholder.svg"}
            alt={post.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="prose prose-lg prose-slate mx-auto mt-12 max-w-3xl dark:prose-invert 
                   prose-headings:text-foreground prose-headings:font-bold
                   prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                   prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                   prose-strong:text-foreground prose-strong:font-semibold
                   prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-6
                   prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
                   prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                   prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                   prose-ul:my-6 prose-ul:text-muted-foreground
                   prose-ol:my-6 prose-ol:text-muted-foreground
                   prose-li:text-muted-foreground prose-li:my-2
                   prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:my-6
                   prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                   prose-pre:bg-muted prose-pre:border prose-pre:border-border
                   prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                   prose-hr:border-border prose-hr:my-8
                   break-words"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Articles */}
      {allRelated.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Related Research
            </p>
            <Link
              href="/blog/archive"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View Archive →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {allRelated.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="relative h-32 w-full">
                  {item.image_url && (
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                    {item.category ? getCategoryTranslation(item.category, currentLanguage as any) : ""}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
