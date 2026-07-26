import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function RelatedProducts({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
