"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/contexts/language-context";
import { getAvailableLanguages, getLanguageDisplayName } from "@/lib/i18n-helpers";

type ContentBlock = {
    type: "text" | "image" | "video";
    value: string; // HTML text, image URL, or video URL
    caption?: string;
};

type NewsRecord = {
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

const BUCKET_NAME = "NewsImages";
const CATEGORY_OPTIONS = [
    "Company Update",
    "Event",
    "Partnership",
    "Achievement",
    "Press Release",
    "Community",
] as const;

const CATEGORY_ICONS: Record<string, string> = {
    "Company Update": "📢",
    "Event": "🎉",
    "Partnership": "🤝",
    "Achievement": "🏆",
    "Press Release": "📰",
    "Community": "🌍",
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function NewsAdminPage() {
    const { session, supabase } = useSupabase();
    const router = useRouter();

    const [posts, setPosts] = useState<NewsRecord[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [currentLang, setCurrentLang] = useState<Language>("en");

    const [titleI18n, setTitleI18n] = useState<Record<Language, string>>({
        en: "", uz: "", ru: "", de: "",
    });
    const [summaryI18n, setSummaryI18n] = useState<Record<Language, string>>({
        en: "", uz: "", ru: "", de: "",
    });
    const [contentI18n, setContentI18n] = useState<Record<Language, string>>({
        en: "", uz: "", ru: "", de: "",
    });

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0]);
    const [videoUrl, setVideoUrl] = useState("");
    const [published, setPublished] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Content blocks for rich content
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
    const [blockFile, setBlockFile] = useState<File | null>(null);
    const [blockUploading, setBlockUploading] = useState(false);

    const PAGE_SIZE = 30;

    useEffect(() => {
        setTitle(titleI18n.en);
    }, [titleI18n.en]);

    useEffect(() => {
        if (!editingId) {
            setSlug(title ? slugify(title) : "");
        }
    }, [title, editingId]);

    useEffect(() => {
        async function checkUser() {
            if (!supabase) return;
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push("/login?returnUrl=/admin/news");
                } else {
                    fetchPosts();
                }
            } catch (err) {
                console.error("Auth error:", err);
                router.push("/login?returnUrl=/admin/news");
            } finally {
                setAuthLoading(false);
            }
        }
        checkUser();
    }, [supabase, router]);

    const [currentPage, setCurrentPage] = useState(1);

    const sortedPosts = useMemo(
        () =>
            [...posts].sort((a, b) => {
                const dateA = new Date(a.created_at ?? 0).getTime();
                const dateB = new Date(b.created_at ?? 0).getTime();
                return dateB - dateA;
            }),
        [posts]
    );

    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const startIndex = (safePage - 1) * PAGE_SIZE;
    const pagedPosts = sortedPosts.slice(startIndex, startIndex + PAGE_SIZE);

    async function fetchPosts() {
        if (!supabase) {
            setStatus("Error: Supabase client not initialized.");
            setLoadingPosts(false);
            return;
        }
        setLoadingPosts(true);
        const { data, error } = await supabase
            .from("company_news")
            .select("id, title, slug, summary, content, image_url, video_url, category, published, created_at, title_i18n, summary_i18n, content_i18n, content_blocks")
            .order("created_at", { ascending: false });

        if (error) {
            setStatus(`Error fetching news: ${error.message}`);
        } else {
            setPosts(data || []);
        }
        setLoadingPosts(false);
    }

    async function uploadImageFile(fileToUpload: File): Promise<string> {
        if (!supabase) throw new Error("Supabase client not initialized");
        const ext = fileToUpload.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, fileToUpload);

        if (error) throw new Error(error.message);
        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
        return data.publicUrl;
    }

    async function uploadImageIfNeeded(existingUrl: string | null) {
        if (!file) return existingUrl;
        return await uploadImageFile(file);
    }

    // Content block management
    function addTextBlock() {
        setContentBlocks([...contentBlocks, { type: "text", value: "" }]);
    }

    function addVideoBlock() {
        setContentBlocks([...contentBlocks, { type: "video", value: "", caption: "" }]);
    }

    async function handleAddImageBlock() {
        if (!blockFile) {
            setStatus("Please select an image file first.");
            return;
        }
        setBlockUploading(true);
        try {
            const url = await uploadImageFile(blockFile);
            setContentBlocks([...contentBlocks, { type: "image", value: url, caption: "" }]);
            setBlockFile(null);
            setStatus("Image uploaded and added as content block.");
        } catch (err) {
            setStatus(`Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
        setBlockUploading(false);
    }

    function removeBlock(index: number) {
        setContentBlocks(contentBlocks.filter((_, i) => i !== index));
    }

    function moveBlock(index: number, direction: "up" | "down") {
        const newBlocks = [...contentBlocks];
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newBlocks.length) return;
        [newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]];
        setContentBlocks(newBlocks);
    }

    function updateBlock(index: number, updates: Partial<ContentBlock>) {
        setContentBlocks(contentBlocks.map((block, i) => i === index ? { ...block, ...updates } : block));
    }

    // Build content HTML from blocks for backwards compatibility
    function buildContentFromBlocks(): string {
        if (contentBlocks.length === 0) return contentI18n.en || content;
        return contentBlocks.map((block) => {
            if (block.type === "text") return block.value;
            if (block.type === "image") {
                return `<figure><img src="${block.value}" alt="${block.caption || ""}" style="max-width:100%;border-radius:12px;margin:1rem 0" />${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}</figure>`;
            }
            if (block.type === "video") {
                const ytMatch = block.value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (ytMatch) {
                    return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1rem 0"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" style="position:absolute;top:0;left:0;width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div>${block.caption ? `<p><em>${block.caption}</em></p>` : ""}`;
                }
                return `<video src="${block.value}" controls style="max-width:100%;border-radius:12px;margin:1rem 0"></video>${block.caption ? `<p><em>${block.caption}</em></p>` : ""}`;
            }
            return "";
        }).join("\n");
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!titleI18n.en.trim() && !contentBlocks.length && !contentI18n.en.trim()) {
            setStatus("English title and content are required.");
            return;
        }

        setSaving(true);
        setStatus("Saving news post...");

        try {
            if (!supabase) throw new Error("Supabase client not initialized.");

            const { data: existingPosts, error: checkError } = await supabase
                .from("company_news")
                .select("id")
                .eq("slug", slug || slugify(titleI18n.en || title));

            if (checkError) {
                console.warn("Slug check encountered an error:", checkError);
            } else if (existingPosts && existingPosts.length > 0) {
                const conflict = existingPosts.find((p: any) => p.id !== editingId);
                if (conflict) {
                    setStatus("Error: This slug (URL) is already in use. Please use a unique title.");
                    setSaving(false);
                    return;
                }
            }

            const title_i18n: Record<string, string> = {};
            const summary_i18n: Record<string, string> = {};
            const content_i18n: Record<string, string> = {};

            (Object.keys(titleI18n) as Language[]).forEach((lang) => {
                if (titleI18n[lang].trim()) title_i18n[lang] = titleI18n[lang];
                if (summaryI18n[lang].trim()) summary_i18n[lang] = summaryI18n[lang];
                if (contentI18n[lang].trim()) content_i18n[lang] = contentI18n[lang];
            });

            setStatus("Uploading image...");
            const uploadedUrl = await uploadImageIfNeeded(imageUrl);

            // Build content from blocks if blocks exist
            const finalContent = contentBlocks.length > 0 ? buildContentFromBlocks() : (contentI18n.en || content);

            // If blocks have content, use that as the English content too
            if (contentBlocks.length > 0) {
                content_i18n.en = finalContent;
            }

            const payload: any = {
                title: titleI18n.en || title,
                slug: slug || slugify(titleI18n.en || title),
                summary: summaryI18n.en || summary || null,
                content: finalContent,
                title_i18n,
                summary_i18n,
                content_i18n,
                image_url: uploadedUrl,
                video_url: videoUrl || null,
                category: category || CATEGORY_OPTIONS[0],
                published,
                content_blocks: contentBlocks.length > 0 ? contentBlocks : null,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("company_news")
                    .update(payload)
                    .eq("id", editingId)
                    .select("id");
                if (error) {
                    throw error;
                }
                setStatus("News post updated.");
            } else {
                const { error } = await supabase
                    .from("company_news")
                    .insert([payload])
                    .select("id");
                if (error) {
                    throw new Error(`Publishing failed: ${error.message} (Code: ${error.code}).`);
                }
                setStatus("News post published successfully!");
            }

            resetForm();
            fetchPosts();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error";
            setStatus(`Error: ${message}`);
        } finally {
            setSaving(false);
        }
    }

    function resetForm() {
        setTitle("");
        setSlug("");
        setSummary("");
        setContent("");
        setTitleI18n({ en: "", uz: "", ru: "", de: "" });
        setSummaryI18n({ en: "", uz: "", ru: "", de: "" });
        setContentI18n({ en: "", uz: "", ru: "", de: "" });
        setCategory(CATEGORY_OPTIONS[0]);
        setVideoUrl("");
        setPublished(true);
        setFile(null);
        setImageUrl(null);
        setEditingId(null);
        setCurrentLang("en");
        setContentBlocks([]);
        setBlockFile(null);
    }

    function handleEdit(post: NewsRecord) {
        setEditingId(post.id);
        setTitle(post.title);
        setSlug(post.slug);
        setSummary(post.summary ?? "");
        setContent(post.content);
        setVideoUrl(post.video_url ?? "");

        if (post.title_i18n) {
            setTitleI18n({
                en: post.title_i18n.en || "",
                uz: post.title_i18n.uz || "",
                ru: post.title_i18n.ru || "",
                de: post.title_i18n.de || "",
            });
        } else {
            setTitleI18n({ en: post.title, uz: "", ru: "", de: "" });
        }

        if (post.summary_i18n) {
            setSummaryI18n({
                en: post.summary_i18n.en || "",
                uz: post.summary_i18n.uz || "",
                ru: post.summary_i18n.ru || "",
                de: post.summary_i18n.de || "",
            });
        } else {
            setSummaryI18n({ en: post.summary || "", uz: "", ru: "", de: "" });
        }

        if (post.content_i18n) {
            setContentI18n({
                en: post.content_i18n.en || "",
                uz: post.content_i18n.uz || "",
                ru: post.content_i18n.ru || "",
                de: post.content_i18n.de || "",
            });
        } else {
            setContentI18n({ en: post.content, uz: "", ru: "", de: "" });
        }

        setContentBlocks(post.content_blocks || []);
        setCategory(post.category ?? CATEGORY_OPTIONS[0]);
        setPublished(post.published);
        setImageUrl(post.image_url);
        setStatus("Editing existing news post.");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleDelete(postId: string) {
        const confirmDelete = window.confirm(
            "Delete this news post? This action cannot be undone."
        );
        if (!confirmDelete) return;

        if (!supabase) return;
        const { error } = await supabase.from("company_news").delete().eq("id", postId);
        if (error) {
            setStatus(`Delete failed: ${error.message}`);
            return;
        }

        setStatus("News post deleted.");
        setPosts((prev) => prev.filter((post) => post.id !== postId));
        if (editingId === postId) {
            resetForm();
        }
    }

    async function handleSignOut() {
        if (supabase) await supabase.auth.signOut();
        router.push("/login");
    }

    if (!session) {
        return (
            <section className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Restricted</h1>
                <p className="text-muted-foreground mb-6">
                    You must be signed in to manage news posts.
                </p>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
                >
                    Go to Login
                </Link>
            </section>
        );
    }

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg" />
                    <p className="text-sm font-medium text-muted-foreground animate-pulse">
                        Authenticating...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-5xl px-4 py-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                        Admin Panel
                    </p>
                    <h1 className="text-3xl font-bold text-foreground mt-2">
                        Manage Company News
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Create rich news posts with multiple photos, videos, and text sections.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin"
                        className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                    >
                        Blog Admin
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                    >
                        Sign out
                    </button>
                </div>
            </div>

            <form
                onSubmit={handleSave}
                className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm mb-10"
            >
                {/* Language Tab Selector */}
                <div className="mb-2">
                    <label className="text-sm font-semibold mb-2 block">Content Language</label>
                    <div className="flex gap-2">
                        {(["en", "uz", "ru", "de"] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setCurrentLang(lang)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${currentLang === lang
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                {getLanguageDisplayName(lang)}
                                {(titleI18n[lang] || contentI18n[lang]) && (
                                    <span className="ml-1 text-xs">●</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Switch between languages to add translations. English is required.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">
                            Title ({getLanguageDisplayName(currentLang)})
                            {currentLang === "en" && <span className="text-destructive ml-1">*</span>}
                        </label>
                        <input
                            value={titleI18n[currentLang]}
                            onChange={(e) =>
                                setTitleI18n({ ...titleI18n, [currentLang]: e.target.value })
                            }
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
                            placeholder={`News title in ${getLanguageDisplayName(currentLang)}`}
                            required={currentLang === "en"}
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Slug</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
                            placeholder="auto-generated-from-title"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">
                        Summary ({getLanguageDisplayName(currentLang)})
                    </label>
                    <textarea
                        value={summaryI18n[currentLang]}
                        onChange={(e) =>
                            setSummaryI18n({ ...summaryI18n, [currentLang]: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
                        rows={2}
                        placeholder={`Short summary in ${getLanguageDisplayName(currentLang)}`}
                    />
                </div>

                {/* ── Rich Content Builder ── */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-semibold block">
                                Content Builder
                            </label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Add multiple text sections, images, and videos. Drag to reorder.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={addTextBlock}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 text-xs font-semibold hover:bg-blue-500/20 transition-colors"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                + Text
                            </button>
                            <button
                                type="button"
                                onClick={addVideoBlock}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1.5 text-xs font-semibold hover:bg-purple-500/20 transition-colors"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                + Video
                            </button>
                        </div>
                    </div>

                    {/* Image Upload Button */}
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border bg-muted/30">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setBlockFile(e.target.files?.[0] ?? null)}
                            className="text-sm text-muted-foreground flex-1"
                        />
                        <button
                            type="button"
                            onClick={handleAddImageBlock}
                            disabled={!blockFile || blockUploading}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {blockUploading ? "Uploading..." : "+ Upload Image"}
                        </button>
                    </div>

                    {/* Content Blocks */}
                    {contentBlocks.length > 0 && (
                        <div className="space-y-3">
                            {contentBlocks.map((block, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl border p-4 transition-colors ${block.type === "text" ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20" :
                                        block.type === "image" ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" :
                                            "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-bold uppercase tracking-wider ${block.type === "text" ? "text-blue-600 dark:text-blue-400" :
                                                block.type === "image" ? "text-emerald-600 dark:text-emerald-400" :
                                                    "text-purple-600 dark:text-purple-400"
                                                }`}>
                                                {block.type === "text" ? "📝 Text Block" :
                                                    block.type === "image" ? "🖼️ Image" :
                                                        "🎬 Video"}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground bg-background/50 rounded px-1.5 py-0.5">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => moveBlock(index, "up")}
                                                disabled={index === 0}
                                                className="p-1 rounded hover:bg-background/50 disabled:opacity-30 transition-colors"
                                                title="Move up"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => moveBlock(index, "down")}
                                                disabled={index === contentBlocks.length - 1}
                                                className="p-1 rounded hover:bg-background/50 disabled:opacity-30 transition-colors"
                                                title="Move down"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeBlock(index)}
                                                className="p-1 rounded text-destructive hover:bg-destructive/10 transition-colors"
                                                title="Remove block"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {block.type === "text" && (
                                        <textarea
                                            value={block.value}
                                            onChange={(e) => updateBlock(index, { value: e.target.value })}
                                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-sm"
                                            rows={5}
                                            placeholder="<p>Write your content here... (HTML supported)</p>"
                                        />
                                    )}

                                    {block.type === "image" && (
                                        <div className="space-y-2">
                                            {block.value && (
                                                <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-border">
                                                    <Image
                                                        src={block.value}
                                                        alt={block.caption || "Content image"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <input
                                                value={block.caption || ""}
                                                onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                                className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary text-sm"
                                                placeholder="Image caption (optional)"
                                            />
                                        </div>
                                    )}

                                    {block.type === "video" && (
                                        <div className="space-y-2">
                                            <input
                                                value={block.value}
                                                onChange={(e) => updateBlock(index, { value: e.target.value })}
                                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-sm"
                                                placeholder="YouTube URL or direct video link"
                                            />
                                            <input
                                                value={block.caption || ""}
                                                onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                                className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary text-sm"
                                                placeholder="Video caption (optional)"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {contentBlocks.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">
                            No content blocks yet. Use the buttons above to add text, images, or videos.
                            Alternatively, write HTML directly in Content below.
                        </p>
                    )}
                </div>

                {/* ── Fallback Content Textarea ── */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">
                        Content ({getLanguageDisplayName(currentLang)}) — {contentBlocks.length > 0 ? "Override / Translation" : "HTML or Markdown"}
                        {currentLang === "en" && contentBlocks.length === 0 && <span className="text-destructive ml-1">*</span>}
                    </label>
                    <textarea
                        value={contentI18n[currentLang]}
                        onChange={(e) =>
                            setContentI18n({ ...contentI18n, [currentLang]: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary text-sm"
                        rows={6}
                        placeholder={contentBlocks.length > 0
                            ? `Translation in ${getLanguageDisplayName(currentLang)} (optional, blocks are used for English)`
                            : `<p>Your news content in ${getLanguageDisplayName(currentLang)}...</p>`
                        }
                        required={currentLang === "en" && contentBlocks.length === 0}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
                        >
                            {CATEGORY_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {CATEGORY_ICONS[option]} {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold">Cover Video URL (YouTube or direct link)</label>
                        <input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
                            placeholder="https://www.youtube.com/watch?v=..."
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            id="published"
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <label
                            htmlFor="published"
                            className="text-sm font-medium text-foreground"
                        >
                            Published
                        </label>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            className="text-sm text-muted-foreground"
                        />
                        {imageUrl && !file && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Keeping existing image.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                    >
                        {saving ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>

                {status && <p className="text-sm text-muted-foreground">{status}</p>}
            </form>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                        Existing News Posts
                    </h2>
                    <span className="text-sm text-muted-foreground">
                        {posts.length} total • Page {safePage} of {totalPages}
                    </span>
                </div>

                {loadingPosts ? (
                    <p className="text-sm text-muted-foreground">Loading news…</p>
                ) : sortedPosts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No news posts yet.</p>
                ) : (
                    <>
                        <div className="space-y-2">
                            {pagedPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="rounded-lg border border-border/70 bg-background p-3 flex items-center justify-between gap-3 hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                                                {CATEGORY_ICONS[post.category || ""] || "📢"} {post.category || "General"}
                                            </span>
                                            {!post.published && (
                                                <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                                                    Draft
                                                </span>
                                            )}
                                            {post.video_url && (
                                                <span className="text-[10px] rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-blue-700 dark:text-blue-300">
                                                    📹 Video
                                                </span>
                                            )}
                                            {post.content_blocks && post.content_blocks.length > 0 && (
                                                <span className="text-[10px] rounded-full bg-purple-100 dark:bg-purple-900 px-2 py-0.5 text-purple-700 dark:text-purple-300">
                                                    📋 {post.content_blocks.length} blocks
                                                </span>
                                            )}
                                            <div className="flex gap-1">
                                                {getAvailableLanguages(post).map((lang) => (
                                                    <span
                                                        key={lang}
                                                        className="text-[9px] rounded bg-primary/10 text-primary px-1.5 py-0.5 font-semibold"
                                                    >
                                                        {getLanguageDisplayName(lang)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-foreground truncate">
                                            {post.title}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {post.created_at
                                                ? new Date(post.created_at).toLocaleDateString()
                                                : "No date"}
                                        </p>
                                    </div>

                                    <div className="flex flex-shrink-0 gap-1">
                                        <Link
                                            href={`/news/${post.slug}`}
                                            className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="inline-flex items-center rounded-full border border-destructive px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                                    disabled={safePage === 1}
                                    className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${safePage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    ← Previous
                                </button>

                                <span className="text-sm text-muted-foreground">
                                    Page {safePage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                                    disabled={safePage === totalPages}
                                    className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${safePage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
