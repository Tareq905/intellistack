
import { notFound } from "next/navigation";
import Script from "next/script";
import { getCategoryBySlugFromDb, getCategorySlugsFromDb } from "@/lib/cms/categories";
import { getProductsByCategoryFromDb } from "@/lib/cms/tools";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getCategorySlugsFromDb();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlugFromDb(slug);
  if (!category) return {};

  return buildMetadata({
    title: `Best ${category.name} in 2026`,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlugFromDb(slug);
  if (!category) notFound();

  const products = await getProductsByCategoryFromDb(slug);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: category.name, path: `/categories/${category.slug}` },
  ]);

  return (
    <div className="container-page py-16">
      <Script
        id="category-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Category</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Best {category.name}</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">{category.description}</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.slug} product={product} />)
        ) : (
          <p className="col-span-full text-center text-ink-500 dark:text-ink-400">
            We&apos;re still finalizing our reviews for this category — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
