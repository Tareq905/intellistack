import type { PricingModel, Tool } from "@prisma/client";
import prisma from "@/lib/prisma";
import type { PricingTier, Product, Review } from "@/types";
import { authors } from "@/lib/data/authors";
import { products as staticProducts } from "@/lib/data/products";
import { reviews as staticReviews } from "@/lib/data/reviews";

const defaultAuthor = authors.tareq!;

export type ToolWithDetails = Tool & {
  category: { slug: string; name: string };
  pros: { text: string }[];
  cons: { text: string }[];
};

const publishedToolInclude = {
  category: { select: { slug: true, name: true } },
  pros: { select: { text: true }, orderBy: { createdAt: "asc" as const } },
  cons: { select: { text: true }, orderBy: { createdAt: "asc" as const } },
};

function mapPricing(model: PricingModel): PricingTier {
  const map: Record<PricingModel, PricingTier> = {
    FREE: "Free",
    FREEMIUM: "Freemium",
    PAID: "Paid",
    ENTERPRISE: "Enterprise",
  };
  return map[model];
}

export function toolToProduct(tool: ToolWithDetails): Product {
  return {
    slug: tool.slug,
    name: tool.name,
    tagline: tool.shortDescription,
    logo: tool.logoUrl ?? "/logos/default.svg",
    category: tool.category.slug,
    rating: Number(tool.rating),
    reviewCount: 0,
    pricing: mapPricing(tool.pricingModel),
    pros: tool.pros.map((p) => p.text),
    cons: tool.cons.map((c) => c.text),
    bestFor: tool.shortDescription,
    affiliateUrl: tool.affiliateUrl ?? tool.officialWebsite ?? "#",
    featured: tool.featured,
    trending: tool.featured,
  };
}

export function toolToReview(tool: ToolWithDetails): Review {
  const date = tool.createdAt.toISOString().slice(0, 10);
  return {
    slug: tool.slug,
    productSlug: tool.slug,
    title: tool.seoTitle ?? `${tool.name} Review`,
    excerpt: tool.shortDescription,
    rating: Number(tool.rating),
    author: defaultAuthor,
    publishedAt: date,
    updatedAt: tool.updatedAt.toISOString().slice(0, 10),
    coverImage: tool.coverImageUrl ?? tool.logoUrl ?? "/covers/default.svg",
    verdict: tool.shortDescription,
    pros: tool.pros.length > 0 ? tool.pros.map((p) => p.text) : [],
    cons: tool.cons.length > 0 ? tool.cons.map((c) => c.text) : [],
  };
}

async function fetchPublishedTools(): Promise<ToolWithDetails[]> {
  return prisma.tool.findMany({
    where: { published: true },
    include: publishedToolInclude,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const tools = await fetchPublishedTools();
    if (tools.length === 0) return staticProducts;
    return tools.map(toolToProduct);
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlugFromDb(slug: string): Promise<Product | undefined> {
  try {
    const tool = await prisma.tool.findFirst({
      where: { slug, published: true },
      include: publishedToolInclude,
    });
    if (tool) return toolToProduct(tool);
  } catch {
    /* fall through */
  }
  return staticProducts.find((p) => p.slug === slug);
}

export async function getProductsByCategoryFromDb(categorySlug: string): Promise<Product[]> {
  const all = await getPublishedProducts();
  return all.filter((p) => p.category === categorySlug);
}

export async function getFeaturedProductsFromDb(): Promise<Product[]> {
  const all = await getPublishedProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

export async function getTrendingProductsFromDb(): Promise<Product[]> {
  const all = await getPublishedProducts();
  const trending = all.filter((p) => p.trending);
  return trending.length > 0 ? trending : all.slice(0, 6);
}

export async function getPublishedReviews(): Promise<Review[]> {
  try {
    const tools = await fetchPublishedTools();
    if (tools.length === 0) return staticReviews;
    return tools.map(toolToReview);
  } catch {
    return staticReviews;
  }
}

export async function getReviewBySlugFromDb(slug: string): Promise<(Review & { fullReview: string }) | undefined> {
  try {
    const tool = await prisma.tool.findFirst({
      where: { slug, published: true },
      include: publishedToolInclude,
    });
    if (tool) {
      return { ...toolToReview(tool), fullReview: tool.fullReview };
    }
  } catch {
    /* fall through */
  }
  const review = staticReviews.find((r) => r.slug === slug);
  if (!review) return undefined;
  const product = staticProducts.find((p) => p.slug === review.productSlug);
  return { ...review, fullReview: product?.tagline ?? review.verdict };
}

export async function getPublishedToolSlugs(): Promise<string[]> {
  try {
    const tools = await prisma.tool.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (tools.length > 0) return tools.map((t) => t.slug);
  } catch {
    /* fall through */
  }
  return staticReviews.map((r) => r.slug);
}
