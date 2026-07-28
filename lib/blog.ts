import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, Tag } from "@prisma/client";
import prisma from "@/lib/prisma";
import type { BlogPostMeta } from "@/types";
import { authors } from "./data/authors";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const defaultAuthor = authors.tareq!;

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

type PostWithTags = Post & { postTags: { tag: Tag }[] };

function mdxPostToMeta(slug: string, fm: RawFrontmatter, content: string): BlogPostMeta {
  const stats = readingTime(content);
  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    coverImage: fm.coverImage,
    category: fm.category,
    tags: fm.tags ?? [],
    author: authors[fm.author] ?? defaultAuthor,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    readingTime: stats.text,
    featured: fm.featured,
  };
}

function dbPostToMeta(post: PostWithTags): BlogPostMeta {
  const stats = readingTime(post.content);
  const tags = post.postTags.map((pt) => pt.tag.name);
  const category = tags[0]?.toLowerCase().replace(/\s+/g, "-") ?? "general";

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    coverImage: post.coverImage ?? "",
    category,
    tags,
    author: defaultAuthor,
    publishedAt: (post.publishedAt ?? post.createdAt).toISOString().slice(0, 10),
    updatedAt: post.updatedAt.toISOString().slice(0, 10),
    readingTime: stats.text,
    featured: false,
  };
}

function getMdxSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getMdxPostBySlug(slug: string): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as RawFrontmatter;

  return {
    meta: mdxPostToMeta(slug, fm, content),
    content,
  };
}

async function getDbPosts(): Promise<{ meta: BlogPostMeta; content: string }[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      include: { postTags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
    });
    return posts.map((post) => ({
      meta: dbPostToMeta(post),
      content: post.content,
    }));
  } catch {
    return [];
  }
}

async function getAllPostEntries(): Promise<{ meta: BlogPostMeta; content: string }[]> {
  const dbPosts = await getDbPosts();
  const bySlug = new Map<string, { meta: BlogPostMeta; content: string }>();

  for (const slug of getMdxSlugs()) {
    const mdx = getMdxPostBySlug(slug);
    if (mdx) bySlug.set(slug, mdx);
  }
  for (const post of dbPosts) {
    bySlug.set(post.meta.slug, post);
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime(),
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const entries = await getAllPostEntries();
  return entries.map((e) => e.meta.slug);
}

export async function getPostBySlug(slug: string): Promise<{ meta: BlogPostMeta; content: string } | null> {
  try {
    const post = await prisma.post.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { postTags: { include: { tag: true } } },
    });
    if (post) {
      return { meta: dbPostToMeta(post), content: post.content };
    }
  } catch {
    /* fall through to MDX */
  }
  return getMdxPostBySlug(slug);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const entries = await getAllPostEntries();
  return entries.map((e) => e.meta);
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  const featured = posts.filter((post) => post.featured);
  return featured.length > 0 ? featured : posts.slice(0, 3);
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(current: BlogPostMeta, limit = 3): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.slug !== current.slug && post.category === current.category).slice(0, limit);
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  const posts = await getAllPosts();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
