"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import type { Language } from "@/contexts/language-context";
import { getAvailableLanguages, getLanguageDisplayName } from "@/lib/i18n-helpers";

type PostRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  category: string | null;
  specialty: string | null;
  published: boolean;
  created_at: string | null;
  title_i18n?: Record<string, string> | null;
  summary_i18n?: Record<string, string> | null;
  content_i18n?: Record<string, string> | null;
};

const BUCKET_NAME = "BlogImages";
const CATEGORY_OPTIONS = [
  "Clinical Operations",
  "Cold Chain",
  "Regulatory Affairs",
  "Customer Stories",
  "Pharmacy Practice",
  "Public Health",
  "Supply Chain",
  "Medical Innovation",
] as const;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AdminPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Current language tab
  const [currentLang, setCurrentLang] = useState<Language>("en");

  // Multi-language content
  const [titleI18n, setTitleI18n] = useState<Record<Language, string>>({
    en: "",
    uz: "",
    ru: "",
    de: "",
  });
  const [summaryI18n, setSummaryI18n] = useState<Record<Language, string>>({
    en: "",
    uz: "",
    ru: "",
    de: "",
  });
  const [contentI18n, setContentI18n] = useState<Record<Language, string>>({
    en: "",
    uz: "",
    ru: "",
    de: "",
  });

  // Legacy fields (for backward compatibility and slug generation)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0]);
  const [specialty, setSpecialty] = useState("");
  const [published, setPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const PAGE_SIZE = 30;

  // Update legacy title when English title changes (for slug generation)
  useEffect(() => {
    setTitle(titleI18n.en);
  }, [titleI18n.en]);

  useEffect(() => {
    if (!editingId) {
      setSlug(title ? slugify(title) : "");
    }
  }, [title, editingId]);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

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

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagedPosts = sortedPosts.slice(startIndex, startIndex + PAGE_SIZE);

  async function fetchPosts() {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus(`Error fetching posts: ${error.message}`);
    } else {
      setPosts((data as PostRecord[]) ?? []);
    }
    setLoadingPosts(false);
  }

  async function uploadImageIfNeeded(existingUrl: string | null) {
    if (!file) return existingUrl;

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Validate that English title and content are provided
    if (!titleI18n.en.trim() || !contentI18n.en.trim()) {
      setStatus("English title and content are required.");
      return;
    }

    setSaving(true);
    setStatus("Saving post...");

    try {
      const uploadedUrl = await uploadImageIfNeeded(imageUrl);
      
      // Build i18n objects, only including non-empty values
      const title_i18n: Record<string, string> = {};
      const summary_i18n: Record<string, string> = {};
      const content_i18n: Record<string, string> = {};
      
      (Object.keys(titleI18n) as Language[]).forEach((lang) => {
        if (titleI18n[lang].trim()) title_i18n[lang] = titleI18n[lang];
        if (summaryI18n[lang].trim()) summary_i18n[lang] = summaryI18n[lang];
        if (contentI18n[lang].trim()) content_i18n[lang] = contentI18n[lang];
      });

      const payload = {
        title: titleI18n.en || title, // Fallback to legacy title
        slug: slug || slugify(titleI18n.en || title),
        summary: summaryI18n.en || summary || null,
        content: contentI18n.en || content,
        title_i18n,
        summary_i18n,
        content_i18n,
        image_url: uploadedUrl,
        category: category || CATEGORY_OPTIONS[0],
        specialty: specialty || null,
        published,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        setStatus("Post updated.");
      } else {
        const { error } = await supabase.from("posts").insert([payload]);
        if (error) throw error;
        setStatus("Post published successfully!");
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
    setSpecialty("");
    setPublished(true);
    setFile(null);
    setImageUrl(null);
    setEditingId(null);
    setCurrentLang("en");
  }

  function handleEdit(post: PostRecord) {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary ?? "");
    setContent(post.content);
    
    // Load i18n data if available
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
    
    setCategory(post.category ?? CATEGORY_OPTIONS[0]);
    setSpecialty(post.specialty ?? "");
    setPublished(post.published);
    setImageUrl(post.image_url);
    setStatus("Editing existing post.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(postId: string) {
    const confirmDelete = window.confirm(
      "Delete this post? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      setStatus(`Delete failed: ${error.message}`);
      return;
    }

    setStatus("Post deleted.");
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    if (editingId === postId) {
      resetForm();
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!session) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Restricted</h1>
        <p className="text-muted-foreground mb-6">
          You must be signed in to manage posts.
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

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
            Admin Panel
          </p>
          <h1 className="text-3xl font-bold text-foreground mt-2">
            Manage Blog Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, update, or remove posts powered by Supabase.
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm mb-10"
      >
        {/* Language Tab Selector */}
        <div className="mb-6">
          <label className="text-sm font-semibold mb-2 block">Content Language</label>
          <div className="flex gap-2">
            {(["en", "uz", "ru", "de"] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setCurrentLang(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentLang === lang
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
              className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder={`Article title in ${getLanguageDisplayName(currentLang)}`}
              required={currentLang === "en"}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="auto-generated-from-title"
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
            className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            rows={2}
            placeholder={`Short teaser in ${getLanguageDisplayName(currentLang)}`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">
            Content ({getLanguageDisplayName(currentLang)}) (HTML or Markdown)
            {currentLang === "en" && <span className="text-destructive ml-1">*</span>}
          </label>
          <textarea
            value={contentI18n[currentLang]}
            onChange={(e) =>
              setContentI18n({ ...contentI18n, [currentLang]: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            rows={8}
            placeholder={`<p>Your story in ${getLanguageDisplayName(currentLang)}...</p>`}
            required={currentLang === "en"}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Specialty</label>
            <input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="Cardiology"
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
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
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
            Existing Posts
          </h2>
          <span className="text-sm text-muted-foreground">
            {posts.length} total • Page {safePage} of {totalPages}
          </span>
        </div>

        {loadingPosts ? (
          <p className="text-sm text-muted-foreground">Loading posts…</p>
        ) : sortedPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
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
                        {post.category || "General"}
                      </span>
                      {!post.published && (
                        <span className="text-[10px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                          Draft
                        </span>
                      )}
                      {/* Language badges */}
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
                      href={`/blog/${post.slug}`}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${
                    safePage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                  className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary transition-colors ${
                    safePage === totalPages ? "opacity-50 cursor-not-allowed" : ""
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
