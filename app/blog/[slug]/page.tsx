export const runtime = "edge";
import { notFound } from "next/navigation";
import Script from "next/script";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { mdxComponents } from "@/mdx-components";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterSignup } from "@/components/affiliate/NewsletterSignup";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${post.meta.slug}`,
    image: post.meta.coverImage,
    type: "article",
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt,
    authors: [post.meta.author.name],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  const related = getRelatedPosts(post.meta);

  const jsonLd = [
    articleJsonLd({
      title: post.meta.title,
      description: post.meta.excerpt,
      path: `/blog/${post.meta.slug}`,
      image: post.meta.coverImage,
      authorName: post.meta.author.name,
      publishedAt: post.meta.publishedAt,
      updatedAt: post.meta.updatedAt,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.meta.title, path: `/blog/${post.meta.slug}` },
    ]),
  ];

  return (
    <article className="container-page py-16">
      <Script
        id="post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-2xl text-center">
        <Badge variant="accent" className="capitalize">
          {post.meta.category.replace("-", " ")}
        </Badge>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink-950 dark:text-ink-50">{post.meta.title}</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">{post.meta.excerpt}</p>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-ink-500 dark:text-ink-400">
          <span>{post.meta.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.meta.publishedAt}>{formatDate(post.meta.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.meta.readingTime}</span>
        </div>
      </header>

      <div className="mx-auto mt-10 aspect-[16/7] max-w-4xl rounded-3xl bg-gradient-to-br from-signal-50 to-ink-100 dark:from-signal-900/20 dark:to-ink-800" />

      <div className="prose prose-ink mx-auto mt-12 max-w-2xl dark:prose-invert">{content}</div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
        <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">About {post.meta.author.name}</p>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{post.meta.author.bio}</p>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Related articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-16 max-w-2xl">
        <NewsletterSignup compact />
      </div>
    </article>
  );
}
