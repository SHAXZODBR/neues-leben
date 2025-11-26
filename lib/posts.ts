import { MOCK_POSTS } from "./mock-data";

export type PostMeta = {
  id: string
  title: string
  date: string
  excerpt: string
  author?: string
  author_credentials?: string
  tags?: string[]
  cover_image?: string
  category?: string
  specialty?: string
  reading_time?: string
  featured?: boolean
  views?: number
  citations?: number
}

export type PostSummary = PostMeta & {
  slug: string
}

export type Post = PostSummary & {
  content: string
}

// Get all posts
export const getAllPosts = (): PostSummary[] => {
  return MOCK_POSTS.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: post.author,
    author_credentials: post.author_credentials,
    tags: post.tags || [],
    cover_image: post.cover_image,
    category: post.category,
    specialty: post.specialty,
    reading_time: post.reading_time,
    featured: post.featured || false,
    views: post.views || 0,
    citations: post.citations || 0,
  }))
}

// Get single post by slug
export const getPostBySlug = (slug: string): Post | null => {
  const post = MOCK_POSTS.find((p) => p.slug === slug)
  if (!post) return null
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: post.author,
    author_credentials: post.author_credentials,
    tags: post.tags || [],
    cover_image: post.cover_image,
    category: post.category,
    specialty: post.specialty,
    reading_time: post.reading_time,
    featured: post.featured || false,
    views: post.views || 0,
    citations: post.citations || 0,
    content: post.content || "",
  }
}

// Get all post slugs
export const getPostSlugs = (): string[] => {
  return MOCK_POSTS.map((p) => p.slug)
}

// Get featured posts
export const getFeaturedPosts = (limit = 5): PostSummary[] => {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit)
}

// Get popular posts (sorted by views)
export const getPopularPosts = (limit = 5): PostSummary[] => {
  return getAllPosts()
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}

// Get most cited posts
export const getMostCitedPosts = (limit = 5): PostSummary[] => {
  return getAllPosts()
    .sort((a, b) => (b.citations || 0) - (a.citations || 0))
    .slice(0, limit)
}

// Search posts
export const searchPosts = (query: string): PostSummary[] => {
  const lowerQuery = query.toLowerCase()
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.excerpt.toLowerCase().includes(lowerQuery) ||
      p.category?.toLowerCase().includes(lowerQuery)
  )
}

// Get posts by category
export const getPostsByCategory = (category: string): PostSummary[] => {
  return getAllPosts().filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  )
}

// Get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>()
  MOCK_POSTS.forEach((p) => {
    if (p.category) categories.add(p.category)
  })
  return Array.from(categories).sort()
}
