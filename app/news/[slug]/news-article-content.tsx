"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Maximize2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { Lightbox } from "@/components/ui/lightbox";

type ContentBlock = {
    type: "text" | "image" | "video";
    value: string;
    caption?: string;
};

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
    content_blocks?: ContentBlock[] | null;
};

function getYouTubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts|live)\/|\S*?[?&]v=)|youtu\.be\/|^)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
}

function getYouTubeThumbnail(url: string): string | null {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts|live)\/|\S*?[?&]v=)|youtu\.be\/|^)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function NewsArticleContent({
    post,
    relatedPosts,
}: {
    post: NewsPost;
    relatedPosts: NewsPost[];
}) {
    const { language, t } = useLanguage();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const localTitle =
        getLocalizedField(post.title_i18n, language) || post.title;
    const localSummary =
        getLocalizedField(post.summary_i18n, language) || post.summary || "";
    const localContent =
        getLocalizedField(post.content_i18n, language) || post.content;

    const youtubeEmbedUrl = post.video_url
        ? getYouTubeEmbedUrl(post.video_url)
        : null;

    // Extract all media for the gallery
    const galleryMedia = useMemo(() => {
        const media: { type: "image" | "video"; url: string; caption?: string }[] = [];
        const seenUrls = new Set<string>();

        const addUniqueMedia = (type: "image" | "video", url: string, caption?: string) => {
            if (!url || seenUrls.has(url)) return;
            seenUrls.add(url);
            media.push({ type, url, caption });
        };

        // Add cover image if it exists
        if (post.image_url) {
            addUniqueMedia("image", post.image_url);
        }

        // Add cover video if it exists
        if (post.video_url) {
            addUniqueMedia("video", post.video_url);
        }

        // Add media from content blocks
        if (post.content_blocks) {
            post.content_blocks.forEach(block => {
                if (block.type === "image") {
                    addUniqueMedia("image", block.value, block.caption);
                } else if (block.type === "video") {
                    const embedUrl = getYouTubeEmbedUrl(block.value);
                    addUniqueMedia("video", embedUrl || block.value, block.caption);
                }
            });
        }

        return media;
    }, [post]);

    const imageOnlyMedia = useMemo(() => galleryMedia.filter(m => m.type === "image"), [galleryMedia]);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <article className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20">
            <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                media={galleryMedia}
                initialIndex={lightboxIndex}
            />

            {/* Header */}
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-4">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 mb-6"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("news.backToNews")}
                    </Link>

                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                            {post.category || "News"}
                        </span>
                        {post.created_at && (
                            <span className="text-xs text-muted-foreground">
                                {new Date(post.created_at).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                        {localTitle}
                    </h1>

                    {localSummary && (
                        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                            {localSummary}
                        </p>
                    )}
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
                {/* Image Gallery Grid */}
                {imageOnlyMedia.length > 0 && (
                    <div className="mb-12">
                        {imageOnlyMedia.length === 1 ? (
                            <div
                                className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl cursor-zoom-in group"
                                onClick={() => openLightbox(galleryMedia.findIndex(m => m.url === imageOnlyMedia[0].url))}
                            >
                                <Image
                                    src={imageOnlyMedia[0].url}
                                    alt={localTitle}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 896px) 100vw, 896px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={48} />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 h-[300px] md:h-[500px]">
                                <div
                                    className="col-span-2 row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-xl cursor-zoom-in group"
                                    onClick={() => openLightbox(galleryMedia.findIndex(m => m.url === imageOnlyMedia[0].url))}
                                >
                                    <Image
                                        src={imageOnlyMedia[0].url}
                                        alt=""
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 896px) 100vw, 600px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                                    </div>
                                </div>
                                {imageOnlyMedia.length >= 2 && (
                                    <div
                                        className="relative rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-lg cursor-zoom-in group"
                                        onClick={() => openLightbox(galleryMedia.findIndex(m => m.url === imageOnlyMedia[1].url))}
                                    >
                                        <Image
                                            src={imageOnlyMedia[1].url}
                                            alt=""
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="300px"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                )}
                                {imageOnlyMedia.length >= 3 && (
                                    <div
                                        className={`relative rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-lg cursor-pointer group ${imageOnlyMedia.length > 3 ? "" : "cursor-zoom-in"}`}
                                        onClick={() => openLightbox(galleryMedia.findIndex(m => m.url === imageOnlyMedia[2].url))}
                                    >
                                        <Image
                                            src={imageOnlyMedia[2].url}
                                            alt=""
                                            fill
                                            className={`object-cover transition-all duration-700 group-hover:scale-105 ${imageOnlyMedia.length > 3 ? "blur-[1px] brightness-[0.4]" : ""}`}
                                            sizes="300px"
                                        />
                                        {imageOnlyMedia.length > 3 ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/20 group-hover:bg-black/40 transition-colors">
                                                <span className="text-2xl md:text-3xl font-bold">+{imageOnlyMedia.length - 2}</span>
                                                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-80">{t("news.morePhotos")}</span>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Cover Video (if not in gallery or specifically requested) */}
                {!post.content_blocks && youtubeEmbedUrl && (
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-border shadow-2xl">
                        <iframe
                            src={youtubeEmbedUrl}
                            title={localTitle}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Article Content */}
                {post.content_blocks && post.content_blocks.length > 0 ? (
                    <div className="space-y-10">
                        {post.content_blocks.map((block, index) => {
                            if (block.type === "text") {
                                return (
                                    <div
                                        key={index}
                                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: block.value }}
                                    />
                                );
                            }
                            if (block.type === "image") {
                                // Skip images already shown in the top gallery grid as requested by user
                                if (imageOnlyMedia.some(m => m.url === block.value)) {
                                    return null;
                                }

                                return (
                                    <figure key={index} className="space-y-3 group">
                                        <div
                                            className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-lg cursor-zoom-in"
                                            onClick={() => openLightbox(galleryMedia.findIndex(m => m.url === block.value))}
                                        >
                                            <Image
                                                src={block.value}
                                                alt={block.caption || ""}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 896px) 100vw, 896px"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center text-sm text-muted-foreground italic font-medium">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            if (block.type === "video") {
                                const embedUrl = getYouTubeEmbedUrl(block.value);
                                return (
                                    <div key={index} className="space-y-3">
                                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-xl bg-black">
                                            {embedUrl ? (
                                                <iframe
                                                    src={embedUrl}
                                                    className="absolute inset-0 w-full h-full"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <video
                                                    src={block.value}
                                                    controls
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        {block.caption && (
                                            <p className="text-center text-sm text-muted-foreground italic font-medium">
                                                {block.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-3xl leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: localContent }}
                    />
                )}

                {/* Share Section */}
                <div className="mt-16 pt-10 border-t border-border">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-foreground">
                                {t("news.share")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Spread the word about our updates.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(localTitle)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full border border-border bg-background p-3 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(localTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full border border-border bg-background p-3 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-foreground">
                                {t("news.relatedNews")}
                            </h2>
                            <Link href="/news" className="text-sm font-semibold text-primary hover:underline">
                                View all news →
                            </Link>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {relatedPosts.map((related) => {
                                const relTitle =
                                    getLocalizedField(related.title_i18n, language) ||
                                    related.title;
                                const relImage =
                                    related.image_url ||
                                    (related.video_url
                                        ? getYouTubeThumbnail(related.video_url)
                                        : null);

                                return (
                                    <Link
                                        key={related.id}
                                        href={`/news/${related.slug}`}
                                        className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl flex flex-col"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                            {relImage ? (
                                                <Image
                                                    src={relImage}
                                                    alt={relTitle}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    sizes="(max-width: 640px) 100vw, 33vw"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <svg
                                                        className="h-10 w-10 text-muted-foreground/30"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1}
                                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <p className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-2">
                                                {relTitle}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                                    {related.created_at
                                                        ? new Date(related.created_at).toLocaleDateString()
                                                        : ""}
                                                </span>
                                                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
