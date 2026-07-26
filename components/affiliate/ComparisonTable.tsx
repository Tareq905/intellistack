import { Check, Minus } from "lucide-react";
import type { Product } from "@/types";
import { Rating } from "@/components/ui/Rating";

type Row = {
  label: string;
  values: (string | boolean)[];
};

export function ComparisonTable({ products, rows }: { products: Product[]; rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-100 dark:border-ink-800">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-ink-50/60 dark:border-ink-800 dark:bg-ink-800/40">
            <th className="p-4 text-left font-medium text-ink-500 dark:text-ink-400">&nbsp;</th>
            {products.map((product) => (
              <th key={product.slug} className="p-4 text-left">
                <div className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">{product.name}</div>
                <Rating value={product.rating} size={12} className="mt-1" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-ink-100 last:border-0 dark:border-ink-800">
              <td className="p-4 font-medium text-ink-700 dark:text-ink-300">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className="p-4 text-ink-600 dark:text-ink-300">
                  {typeof value === "boolean" ? (
                    value ? (
                      <Check className="h-4 w-4 text-signal-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-ink-300" />
                    )
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4" />
            {products.map((product) => (
              <td key={product.slug} className="p-4">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="btn-primary"
                >
                  Visit site
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
