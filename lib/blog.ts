import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta } from "@/types";
import { authors } from "./data/authors";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

type RawFrontmatter = {
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: keyof typeof authors;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
};

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as RawFrontmatter;
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: fm.title,
      excerpt: fm.excerpt,
      coverImage: fm.coverImage,
      category: fm.category,
      tags: fm.tags ?? [],
      author: authors[fm.author]!,
      publishedAt: fm.publishedAt,
      updatedAt: fm.updatedAt,
      readingTime: stats.text,
      featured: fm.featured,
    },
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug)?.meta)
    .filter((meta): meta is BlogPostMeta => Boolean(meta))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(current: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== current.slug && post.category === current.category)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
