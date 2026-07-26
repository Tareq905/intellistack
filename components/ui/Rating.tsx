import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

export function Rating({ value, max = 5, size = 16, showValue = true, reviewCount, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${value} out of ${max}`}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={filled ? "fill-clay text-clay" : "fill-ink-100 text-ink-100"}
            />
          );
        })}
      </div>
      {showValue && <span className="text-sm font-semibold text-ink-800">{value.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-sm text-ink-400">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
