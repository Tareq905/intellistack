export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  toolCount: number;
};

export type PricingTier = "Free" | "Freemium" | "Paid" | "Enterprise";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  category: string; // Category slug
  rating: number; // 0-5
  reviewCount: number;
  pricing: PricingTier;
  startingPrice?: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateUrl: string;
  featured?: boolean;
  trending?: boolean;
};

export type Review = {
  slug: string;
  productSlug: string;
  title: string;
  excerpt: string;
  rating: number;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  verdict: string;
  pros: string[];
  cons: string[];
};

export type Comparison = {
  slug: string;
  title: string;
  excerpt: string;
  productSlugs: string[];
  coverImage: string;
  publishedAt: string;
  winner?: string;
};

export type Author = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};
