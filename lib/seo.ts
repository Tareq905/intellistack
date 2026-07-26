import type { Metadata } from "next";
import { siteConfig } from "./config";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitter,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin, siteConfig.links.github],
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  path: string;
  image: string;
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    image: [`${siteConfig.url}${args.image}`],
    author: { "@type": "Person", name: args.authorName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
    },
    datePublished: args.publishedAt,
    dateModified: args.updatedAt ?? args.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${args.path}` },
  };
}

export function productReviewJsonLd(args: {
  productName: string;
  reviewBody: string;
  rating: number;
  authorName: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: args.productName },
    reviewRating: {
      "@type": "Rating",
      ratingValue: args.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: args.authorName },
    reviewBody: args.reviewBody,
    datePublished: args.publishedAt,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
