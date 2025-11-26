"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Eye, BookOpen, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getAllPosts } from "@/lib/posts";
import DoctorVerificationModal from "./doctor-verification-modal";

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

export default function FeaturedArticlesSection() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  // Get data directly from mock
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  const handleArticleClick = (slug?: string) => {
    setPendingSlug(slug || null);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    sessionStorage.setItem("blogVerified", "true");
    if (pendingSlug) {
      router.push(`/blog/${pendingSlug}`);
    } else {
      router.push("/blog");
    }
  };

  const stats = [
    { value: "12K+", label: t("blog.views"), icon: Eye },
    { value: "500+", label: t("blog.articles"), icon: BookOpen },
    { value: "50+", label: t("blog.specialties"), icon: Stethoscope },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3">
            {t("nav.blog")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("blog.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Articles Grid */}
        {featuredPosts.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Main Featured Article */}
            {featuredPosts[0] && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 group cursor-pointer"
                onClick={() => handleArticleClick(featuredPosts[0].slug)}
              >
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                  <img
                    src={featuredPosts[0].cover_image || "/placeholder.svg"}
                    alt={featuredPosts[0].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/90 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {featuredPosts[0].category}
                      </span>
                      <span className="text-xs text-white/60">•</span>
                      <span className="text-xs text-white/80">
                        {formatDate(featuredPosts[0].date, language)}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2">
                      {featuredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPosts[0].reading_time}
                        </span>
                      </div>
                      <span className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        {t("blog.readFullArticle")}{" "}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Side Featured Articles */}
            <div className="flex flex-col gap-6">
              {featuredPosts.slice(1, 3).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group cursor-pointer flex-1"
                  onClick={() => handleArticleClick(post.slug)}
                >
                  <div className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="relative h-40">
                      <img
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.date, language)}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Recent Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground">
              {t("blog.allPublications")}
            </h3>
            <button
              onClick={() => handleArticleClick()}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              {t("blog.browseArchive")} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.slice(0, 6).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group cursor-pointer rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
                onClick={() => handleArticleClick(post.slug)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {post.category}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.reading_time}
                  </span>
                  <span>{formatDate(post.date, language)}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-left">
              <h4 className="font-bold text-foreground mb-1">
                {t("blog.medicalUpdates")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("blog.newsletterText")}
              </p>
            </div>
            <button
              onClick={() => handleArticleClick()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {t("blog.browseArchive")}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Verification Modal */}
      <DoctorVerificationModal
        isOpen={showModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </section>
  );
}
