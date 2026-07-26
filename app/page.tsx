import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/lib/data/categories";
import { getTrendingProducts } from "@/lib/data/products";
import { reviews } from "@/lib/data/reviews";
import { comparisons } from "@/lib/data/comparisons";
import { getFeaturedPosts } from "@/lib/blog";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { ReviewCard } from "@/components/affiliate/ReviewCard";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterSignup } from "@/components/affiliate/NewsletterSignup";

export const metadata = buildMetadata({
  title: "IntelliStack — AI Projects Built for Real-World Impact",
  description:
    "Explore Tareq's AI engineering portfolio — agentic systems, fine-tuned LLMs, RAG pipelines, and real-time AI tools built to solve real operational problems.",
  path: "/",
});

export default function HomePage() {
  const trendingProducts = getTrendingProducts();
  const latestReviews = reviews.slice(0, 3);
  const latestComparisons = comparisons.slice(0, 3);
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Featured this week"
          title="Projects gaining traction"
          href="/reviews"
          linkLabel="View all projects"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Deep dives"
            title="Project writeups"
            href="/reviews"
            linkLabel="View all writeups"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Head to head"
          title="Latest comparisons"
          href="/comparisons"
          linkLabel="View all comparisons"
        />
        <div className="mt-8 grid gap-4">
          {latestComparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/comparisons/${comparison.slug}`}
              className="card flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:underline dark:text-ink-50">
                  {comparison.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{comparison.excerpt}</p>
              </div>
              <span className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-signal-600">
                Read comparison
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
        <div className="container-page">
          <SectionHeading eyebrow="From the blog" title="Latest posts" href="/blog" linkLabel="Visit the blog" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <NewsletterSignup />
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">AI engineering portfolio</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-950 sm:text-6xl dark:text-ink-50">
          AI projects built to{" "}
          <span className="text-signal-600">solve real problems,</span>{" "}not impress recruiters.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-400">
          I&apos;m Tareq — an AI engineer building agentic systems, fine-tuned LLMs, RAG pipelines, and real-time
          AI tools. Every project here started from a genuine operational problem.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/reviews" className="btn-primary px-6 py-3 text-base">
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn-secondary px-6 py-3 text-base">
            About Tareq
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="AI projects built" value="4+" />
          <Stat label="Training examples" value="52K+" />
          <Stat label="RAG data points" value="7M+" />
          <Stat label="Published on" value="GitHub / HF" />
        </div>
    </section>

  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white py-6 text-center dark:border-ink-800 dark:bg-ink-900">
      <p className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{value}</p>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{label}</p>
    </div>
  );
}

function FeaturedCategories() {
  return (
    <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
      <div className="container-page">
        <SectionHeading eyebrow="Explore" title="Browse by category" href="/categories" linkLabel="View all" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = (Icons[category.icon as keyof typeof Icons] ?? Icons.Sparkles) as Icons.LucideIcon;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="card flex flex-col gap-3 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-50 text-signal-600 dark:bg-signal-900/30 dark:text-signal-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-ink-900 dark:text-ink-50">{category.name}</h3>
                <p className="text-sm text-ink-500 dark:text-ink-400">{category.description}</p>
                <p className="mt-auto text-xs font-medium text-ink-400 dark:text-ink-500">{category.toolCount} projects</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-ink-50">{title}</h2>
      </div>
      <Link href={href} className="flex items-center gap-1 text-sm font-semibold text-signal-600 hover:underline">
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
