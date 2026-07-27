
import { notFound } from "next/navigation";
import Script from "next/script";
import { reviews, getReviewBySlug } from "@/lib/data/reviews";
import { getProductBySlug, getProductsByCategory } from "@/lib/data/products";
import { Rating } from "@/components/ui/Rating";
import { ProsCons } from "@/components/affiliate/ProsCons";
import { RelatedProducts } from "@/components/affiliate/RelatedProducts";
import { CTASection } from "@/components/affiliate/CTASection";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, productReviewJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  return buildMetadata({
    title: review.title,
    description: review.excerpt,
    path: `/reviews/${review.slug}`,
    image: review.coverImage,
    type: "article",
    publishedTime: review.publishedAt,
    modifiedTime: review.updatedAt,
    authors: [review.author.name],
  });
}

export default async function ReviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const product = getProductBySlug(review.productSlug);
  const alternatives = product
    ? getProductsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 3)
    : [];

  const jsonLd = [
    articleJsonLd({
      title: review.title,
      description: review.excerpt,
      path: `/reviews/${review.slug}`,
      image: review.coverImage,
      authorName: review.author.name,
      publishedAt: review.publishedAt,
      updatedAt: review.updatedAt,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews" },
      { name: review.title, path: `/reviews/${review.slug}` },
    ]),
    productReviewJsonLd({
      productName: product?.name ?? review.title,
      reviewBody: review.verdict,
      rating: review.rating,
      authorName: review.author.name,
      publishedAt: review.publishedAt,
    }),
  ];

  return (
    <article className="container-page py-16">
      <Script
        id="review-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Review</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">{review.title}</h1>
        <div className="mt-5 flex items-center justify-center gap-3 text-sm text-ink-500 dark:text-ink-400">
          <span>By {review.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
          {review.updatedAt && (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(review.updatedAt)}</span>
            </>
          )}
        </div>
        <Rating value={review.rating} className="mt-5 justify-center" size={20} />
      </header>

      <div className="mx-auto mt-10 aspect-[16/7] max-w-4xl rounded-3xl bg-gradient-to-br from-ink-50 to-ink-100 dark:from-ink-800 dark:to-ink-900" />

      <div className="mx-auto mt-12 max-w-2xl">
        <p className="text-lg leading-relaxed text-ink-600 dark:text-ink-300">{review.excerpt}</p>

        <div className="mt-8 rounded-2xl border border-signal-100 bg-signal-50 p-6 dark:border-signal-800/50 dark:bg-signal-900/20">
          <p className="eyebrow">Verdict</p>
          <p className="mt-2 text-ink-700 dark:text-ink-200">{review.verdict}</p>
        </div>

        <div className="mt-10">
          <ProsCons pros={review.pros} cons={review.cons} />
        </div>

        {product && (
          <div className="mt-10">
            <CTASection
              eyebrow={product.pricing}
              title={`Try ${product.name}`}
              description={product.tagline}
              primaryHref={product.affiliateUrl}
              primaryLabel="Visit official site"
            />
          </div>
        )}
      </div>

      {alternatives.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <RelatedProducts title="Best alternatives" products={alternatives} />
        </div>
      )}
    </article>
  );
}
