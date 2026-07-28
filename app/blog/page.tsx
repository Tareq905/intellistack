
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { getCategoriesFromDb } from "@/lib/cms/categories";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";
import { Pagination } from "@/components/blog/Pagination";
import { paginate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Guides, comparisons, and analysis on AI tools, automation, developer tools, and SaaS.",
  path: "/blog",
});

const PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const allPosts = await getAllPosts();
  const categories = await getCategoriesFromDb();

  let filtered = allPosts;
  if (params.category) {
    filtered = filtered.filter((post) => post.category === params.category);
  }
  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  const page = Number(params.page ?? "1");
  const { items, currentPage, totalPages } = paginate(filtered, page, PER_PAGE);

  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Guides & analysis</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          Practical writing on AI tools, automation, developer tooling, and the software stacks behind them.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={null}>
          <CategoryFilter categories={categories} activeSlug={params.category} basePath="/blog" />
        </Suspense>
        <Suspense fallback={null}>
          <SearchBar basePath="/blog" />
        </Suspense>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.length > 0 ? (
          items.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-full text-center text-ink-500 dark:text-ink-400">No articles match your search yet.</p>
        )}
      </div>

      <div className="mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
      </div>
    </div>
  );
}
