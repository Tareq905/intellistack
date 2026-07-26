import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-50 font-display text-lg font-semibold text-ink-700 dark:bg-ink-800 dark:text-ink-300">
          {product.name.charAt(0)}
        </div>
        <Badge variant="outline">{product.pricing}</Badge>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
        <Link href={`/reviews/${product.slug}-review`} className="hover:underline">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{product.tagline}</p>

      <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-4" />

      <p className="mt-4 text-sm text-ink-500 dark:text-ink-400">
        <span className="font-medium text-ink-700 dark:text-ink-300">Best for:</span> {product.bestFor}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="btn-primary flex-1"
        >
          Visit site
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link href={`/reviews/${product.slug}-review`} className="btn-secondary">
          Read review
        </Link>
      </div>
    </div>
  );
}
