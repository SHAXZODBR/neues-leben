import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ShareButton } from "@/components/share-button";

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

const normalizePost = (post: DbPost): Post => {
  const plainContent = post.content ? post.content : "";
  return {
    id: post.id || post.slug,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    content: plainContent,
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

async function fetchPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return normalizePost(data as DbPost);
}

async function fetchRelatedPosts(
  category: string | null,
  slug: string
): Promise<Post[]> {
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

  const normalized = (data as DbPost[]).map(normalizePost);

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

  return (fallbackData as DbPost[] | null)?.map(normalizePost) ?? [];
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

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

  return {
    title: `${post.title} | Medical Journal`,
    description: post.summary || post.content.slice(0, 140),
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  const allRelated = await fetchRelatedPosts(post.category || null, post.slug);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
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
            {post.category || "Research"}
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
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border/70">
          <img
            src={post.cover_image || "/placeholder.svg"}
            alt={post.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="prose prose-lg prose-slate mx-auto mt-12 max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-ul:text-muted-foreground prose-li:text-muted-foreground"
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
                  {item.cover_image && (
                    <img
                      src={item.cover_image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(item.date)}
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
