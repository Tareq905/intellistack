import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getPublishedComparisons } from "@/lib/cms/comparisons";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Software Comparisons",
  description: "Side-by-side comparisons of the leading AI tools and business software, tested head to head.",
  path: "/comparisons",
});

export default async function ComparisonsPage() {
  const comparisons = await getPublishedComparisons();

  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Comparisons</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Head-to-head comparisons</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          We put competing tools through the same real-world tasks so you can see exactly where each one wins.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparisons/${comparison.slug}`}
            className="card group flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900 group-hover:underline dark:text-ink-50">
                {comparison.title}
              </h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{comparison.excerpt}</p>
              <time dateTime={comparison.publishedAt} className="mt-2 block text-xs text-ink-400 dark:text-ink-500">
                {formatDate(comparison.publishedAt)}
              </time>
            </div>
            <span className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-signal-600">
              Read comparison
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
