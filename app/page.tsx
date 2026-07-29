import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight, ArrowRight, TestTube, Briefcase, Timer, ShieldCheck, Star } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getCategoriesFromDb } from "@/lib/cms/categories";
import { getTrendingProductsFromDb, getPublishedReviews } from "@/lib/cms/tools";
import { getPublishedComparisons } from "@/lib/cms/comparisons";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { ReviewCard } from "@/components/affiliate/ReviewCard";
import { NewsletterSignup } from "@/components/affiliate/NewsletterSignup";
import type { Category } from "@/types";

export const metadata = buildMetadata({
  title: "Quantas",
  description:
    "We test AI tools, compare them side-by-side, and publish honest reviews so you can confidently choose the right software for your workflow.",
  path: "/",
});

export default async function HomePage() {
  const [categories, trendingProducts, reviews, comparisons] = await Promise.all([
    getCategoriesFromDb(),
    getTrendingProductsFromDb(),
    getPublishedReviews(),
    getPublishedComparisons(),
  ]);
  const latestReviews = reviews.slice(0, 3);
  const latestComparisons = comparisons.slice(0, 3);

  return (
    <>
      <Hero />
      
      <TrendingAITools />

      <FeaturedCategories categories={categories} />

      <HowWeTest />

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Featured AI Tools"
          title="Tools gaining traction"
          href="/reviews"
          linkLabel="View all tools"
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
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="In-depth Reviews"
          title="Expert tool reviews"
          href="/reviews"
          linkLabel="View all reviews"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestReviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
        <div className="container-page">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Independent AI Tool Reviews</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-950 sm:text-6xl dark:text-ink-50">
          Discover the Best AI Tools That <span className="text-signal-600">Actually Save Time</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-400">
          We test AI tools, compare them side-by-side, and publish honest reviews so you can confidently choose the right software for your workflow.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/categories" className="btn-primary px-6 py-3 text-base">
            Explore AI Tools
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/comparisons" className="btn-secondary px-6 py-3 text-base">
            See Comparisons
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="AI Tools Reviewed" value="150+" />
        <Stat label="Comparisons Published" value="40+" />
        <Stat label="Expert Reviews" value="Weekly" />
        <Stat label="Testing" value="Independent" />
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

function TrendingAITools() {
  const tools = [
    { name: "ChatGPT", category: "AI Chatbot", rating: "4.9", description: "The industry standard conversational AI model by OpenAI." },
    { name: "Claude", category: "AI Chatbot", rating: "4.9", description: "Advanced reasoning and natural writing by Anthropic." },
    { name: "Gemini", category: "AI Chatbot", rating: "4.7", description: "Google's most capable and general AI model." },
    { name: "Cursor", category: "AI Code Editor", rating: "4.9", description: "The AI-first code editor built to accelerate development." },
    { name: "Perplexity", category: "AI Search", rating: "4.8", description: "AI-powered search engine delivering fast, accurate answers." },
    { name: "Lovable", category: "AI App Builder", rating: "4.6", description: "Create production-ready web apps through conversation." },
    { name: "Bolt.new", category: "AI App Builder", rating: "4.7", description: "In-browser full-stack AI development environment." },
    { name: "n8n", category: "AI Automation", rating: "4.8", description: "Fair-code workflow automation tool with advanced AI nodes." },
    { name: "Windsurf", category: "AI Code Editor", rating: "4.8", description: "Intelligent AI coding assistant and editor environment." },
  ];

  return (
    <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
      <div className="container-page">
        <SectionHeading eyebrow="Trending Now" title="Trending AI Tools" href="/categories" linkLabel="View all tools" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.name} className="card flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 font-display font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink-900 dark:text-ink-50">{tool.name}</h3>
                    <p className="text-xs font-medium text-ink-500 dark:text-ink-400">{tool.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-signal-50 px-2 py-0.5 text-xs font-semibold text-signal-700 dark:bg-signal-900/30 dark:text-signal-400">
                  <Star className="h-3 w-3 fill-current" />
                  {tool.rating}
                </div>
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-300">{tool.description}</p>
              <div className="mt-auto flex items-center gap-2 pt-2">
                <Link href={`/reviews/${tool.name.toLowerCase().replace('.', '')}`} className="btn-primary flex-1 py-2 text-xs">
                  Read Review
                </Link>
                <Link href={`/comparisons`} className="btn-secondary flex-1 py-2 text-xs">
                  Compare
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeTest() {
  const steps = [
    {
      icon: TestTube,
      title: "Hands-on Testing",
      description: "We personally test every feature of the tools we review.",
    },
    {
      icon: Briefcase,
      title: "Real Workflow Evaluation",
      description: "Tools are assessed in actual professional and creative workflows.",
    },
    {
      icon: Timer,
      title: "Performance Benchmarking",
      description: "We measure speed, accuracy, and reliability objectively.",
    },
    {
      icon: ShieldCheck,
      title: "Independent Reviews",
      description: "Our editorial independence ensures honest, unbiased recommendations.",
    },
  ];

  return (
    <section className="border-y border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-900/50">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-950 dark:text-ink-50">How We Test AI Tools</h2>
          <p className="mt-4 text-ink-500 dark:text-ink-400">
            Our rigorous evaluation process ensures you get reliable recommendations.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="card flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-50 text-signal-600 dark:bg-signal-900/30 dark:text-signal-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-ink-50">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Explore" title="Browse by category" href="/categories" linkLabel="View all categories" />
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
                <p className="mt-auto text-xs font-medium text-ink-400 dark:text-ink-500">{category.toolCount} tools</p>
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
