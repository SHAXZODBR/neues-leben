import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Share2, Calendar } from "lucide-react"
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/posts"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found | Medical Journal",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${post.title} | Medical Journal`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-foreground">Article not found</h1>
        <p className="mt-3 text-muted-foreground">The article you're looking for doesn't exist.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" />
          Back to Journal
        </Link>
      </section>
    )
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3)

  const allRelated =
    relatedPosts.length > 0 ? relatedPosts : allPosts.filter((item) => item.slug !== post.slug).slice(0, 3)

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

        <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

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

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Keywords</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {allRelated.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Related Research</p>
            <Link href="/blog/archive" className="text-sm font-semibold text-primary hover:underline">
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
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">{item.category}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(item.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
