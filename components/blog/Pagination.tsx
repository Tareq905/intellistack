import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
        aria-disabled={currentPage === 1}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-400",
          currentPage === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium",
            page === currentPage
              ? "border-ink-900 bg-ink-900 text-white dark:border-white dark:bg-white dark:text-ink-900"
              : "border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-400"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-400",
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
