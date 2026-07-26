import Link from "next/link";
import * as Icons from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/lib/data/categories";

export const metadata = buildMetadata({
  title: "Software Categories",
  description: "Browse every category of AI tool and business software we cover, from AI automation to SEO platforms.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Categories</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Browse by category</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          Every tool we review is organized into one of eight categories, each with its own testing checklist.
        </p>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = (Icons[category.icon as keyof typeof Icons] ?? Icons.Sparkles) as Icons.LucideIcon;
          return (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="card flex flex-col gap-3 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-50 text-signal-600 dark:bg-signal-900/30 dark:text-signal-400">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">{category.name}</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">{category.description}</p>
              <p className="mt-auto text-xs font-medium text-ink-400 dark:text-ink-500">{category.toolCount} tools reviewed</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
