import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { categories } from "@/lib/data/categories";
import { reviews } from "@/lib/data/reviews";
import { comparisons } from "@/lib/data/comparisons";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/resources",
    "/categories",
    "/blog",
    "/reviews",
    "/comparisons",
    "/newsletter",
    "/privacy-policy",
    "/terms-and-conditions",
    "/affiliate-disclosure",
    "/disclaimer",
    "/cookie-policy",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${siteConfig.url}/reviews/${review.slug}`,
    lastModified: new Date(review.updatedAt ?? review.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${siteConfig.url}/comparisons/${comparison.slug}`,
    lastModified: new Date(comparison.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...reviewRoutes, ...comparisonRoutes, ...postRoutes];
}
