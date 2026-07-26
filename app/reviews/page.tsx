import { buildMetadata } from "@/lib/seo";
import { reviews } from "@/lib/data/reviews";
import { ReviewCard } from "@/components/affiliate/ReviewCard";

export const metadata = buildMetadata({
  title: "Software & AI Tool Reviews",
  description: "In-depth, independent reviews of AI tools, SaaS, and business software — tested against real workflows.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Reviews</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Independent software reviews</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          Every review is based on hands-on testing against real workflows, not vendor briefings.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.slug} review={review} />
        ))}
      </div>
    </div>
  );
}
