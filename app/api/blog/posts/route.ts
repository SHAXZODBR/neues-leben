import { NextResponse } from "next/server";
import {
  getAllPosts,
  getPopularPosts,
  getMostCitedPosts,
  getAllCategories,
} from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const popularPosts = getPopularPosts(4);
  const mostCitedPosts = getMostCitedPosts(3);
  const categories = getAllCategories();

  return NextResponse.json({
    posts,
    popularPosts,
    mostCitedPosts,
    categories,
  });
}
