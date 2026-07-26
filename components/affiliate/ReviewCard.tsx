import Link from "next/link";
import type { Review } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { formatDate } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Link href={`/reviews/${review.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-ink-50 to-ink-100 dark:from-ink-800 dark:to-ink-900" />
      <div className="flex flex-1 flex-col p-6">
        <Rating value={review.rating} showValue={false} size={14} />
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 group-hover:underline dark:text-ink-50">
          {review.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{review.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
          <span>{review.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
