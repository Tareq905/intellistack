import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getCategorySlugsFromDb } from "@/lib/cms/categories";
import { getPublishedReviews, getPublishedToolSlugs } from "@/lib/cms/tools";
import { getPublishedComparisons, getComparisonSlugsFromDb } from "@/lib/cms/comparisons";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const [reviews, comparisons, posts, categorySlugs, reviewSlugs, comparisonSlugs] = await Promise.all([
    getPublishedReviews(),
    getPublishedComparisons(),
    getAllPosts(),
    getCategorySlugsFromDb(),
    getPublishedToolSlugs(),
    getComparisonSlugsFromDb(),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${siteConfig.url}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = reviewSlugs.map((slug) => {
    const review = reviews.find((r) => r.slug === slug);
    return {
      url: `${siteConfig.url}/reviews/${slug}`,
      lastModified: new Date(review?.updatedAt ?? review?.publishedAt ?? Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const comparisonRoutes: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => {
    const comparison = comparisons.find((c) => c.slug === slug);
    return {
      url: `${siteConfig.url}/comparisons/${slug}`,
      lastModified: new Date(comparison?.publishedAt ?? Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...reviewRoutes, ...comparisonRoutes, ...postRoutes];
}
