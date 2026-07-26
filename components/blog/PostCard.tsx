import Link from "next/link";
import type { BlogPostMeta } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-signal-50 to-ink-100 dark:from-signal-900/20 dark:to-ink-800" />
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="accent" className="w-fit capitalize">
          {post.category.replace("-", " ")}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 group-hover:underline dark:text-ink-50">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
          <span>{post.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
