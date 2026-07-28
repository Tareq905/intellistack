
import { notFound } from "next/navigation";
import Script from "next/script";
import { evaluate } from "next-mdx-remote-client/rsc";
import {
  getComparisonBySlugFromDb,
  getComparisonSlugsFromDb,
} from "@/lib/cms/comparisons";
import {
  getProductBySlugFromDb,
  getProductsByCategoryFromDb,
} from "@/lib/cms/tools";
import { mdxComponents } from "@/mdx-components";
import { ComparisonTable } from "@/components/affiliate/ComparisonTable";
import { RelatedProducts } from "@/components/affiliate/RelatedProducts";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getComparisonSlugsFromDb();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = await getComparisonBySlugFromDb(slug);
  if (!comparison) return {};

  return buildMetadata({
    title: comparison.title,
    description: comparison.excerpt,
    path: `/comparisons/${comparison.slug}`,
    image: comparison.coverImage,
    type: "article",
    publishedTime: comparison.publishedAt,
  });
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = await getComparisonBySlugFromDb(slug);
  if (!comparison) notFound();

  const products = (
    await Promise.all(comparison.productSlugs.map((s) => getProductBySlugFromDb(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const primary = products[0];
  const alternatives = primary
    ? (await getProductsByCategoryFromDb(primary.category))
        .filter((p) => !comparison.productSlugs.includes(p.slug))
        .slice(0, 3)
    : [];

  const { content: bodyContent } = await evaluate({
    source: comparison.content,
    components: mdxComponents,
  });

  const faqs = primary
    ? [
        {
          question: `Which is cheaper, ${primary.name} or its alternatives?`,
          answer: `${primary.name} starts at ${primary.startingPrice ?? "a variable price"}. Pricing varies by plan and usage, so check each vendor's current pricing page before deciding.`,
        },
        {
          question: `Is ${primary.name} good for small teams?`,
          answer: `${primary.name} is best suited for: ${primary.bestFor}.`,
        },
      ]
    : [];

  const jsonLd = [
    articleJsonLd({
      title: comparison.title,
      description: comparison.excerpt,
      path: `/comparisons/${comparison.slug}`,
      image: comparison.coverImage,
      authorName: "Quantas Editorial",
      publishedAt: comparison.publishedAt,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Comparisons", path: "/comparisons" },
      { name: comparison.title, path: `/comparisons/${comparison.slug}` },
    ]),
    ...(faqs.length > 0 ? [faqJsonLd(faqs)] : []),
  ];

  return (
    <article className="container-page py-16">
      <Script
        id="comparison-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Comparison</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">{comparison.title}</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">{comparison.excerpt}</p>
        <time dateTime={comparison.publishedAt} className="mt-4 block text-xs text-ink-400 dark:text-ink-500">
          Published {formatDate(comparison.publishedAt)}
        </time>
      </header>

      <div className="mx-auto mt-12 max-w-4xl">
        {products.length >= 2 && (
          <ComparisonTable
            products={products}
            rows={[
              { label: "Starting price", values: products.map((p) => p.startingPrice ?? "Contact sales") },
              { label: "Pricing model", values: products.map((p) => p.pricing) },
              { label: "Best for", values: products.map((p) => p.bestFor) },
              { label: "Free plan", values: products.map((p) => p.pricing === "Freemium" || p.pricing === "Free") },
            ]}
          />
        )}

        <div className="prose prose-ink mx-auto mt-10 dark:prose-invert">{bodyContent}</div>

        {comparison.sections.length > 0 && (
          <div className="mt-12 space-y-8">
            {comparison.sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">{section.title}</h2>
                <p className="mt-3 text-ink-600 dark:text-ink-300 whitespace-pre-wrap">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {comparison.winner && primary && (
          <div className="mt-8 rounded-2xl border border-signal-100 bg-signal-50 p-6 text-center dark:border-signal-800/50 dark:bg-signal-900/20">
            <p className="eyebrow">Our pick</p>
            <p className="mt-2 text-ink-700 dark:text-ink-200">
              For most teams,{" "}
              <strong className="text-ink-900 dark:text-white">
                {products.find((p) => p.slug === comparison.winner)?.name ?? primary.name}
              </strong>{" "}
              is the stronger choice — see the full review for details on where it falls short.
            </p>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Frequently asked questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        )}
      </div>

      {alternatives.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <RelatedProducts title="Other tools worth considering" products={alternatives} />
        </div>
      )}
    </article>
  );
}
