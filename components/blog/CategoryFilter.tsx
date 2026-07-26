import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: { slug: string; name: string }[];
  activeSlug?: string;
  basePath: string;
};

export function CategoryFilter({ categories, activeSlug, basePath }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={basePath}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !activeSlug
            ? "border-ink-900 bg-ink-900 text-white dark:border-white dark:bg-white dark:text-ink-900"
            : "border-ink-200 text-ink-600 hover:border-ink-300 dark:border-ink-700 dark:text-ink-400 dark:hover:border-ink-500"
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`${basePath}?category=${category.slug}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeSlug === category.slug
              ? "border-ink-900 bg-ink-900 text-white dark:border-white dark:bg-white dark:text-ink-900"
              : "border-ink-200 text-ink-600 hover:border-ink-300 dark:border-ink-700 dark:text-ink-400 dark:hover:border-ink-500"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
