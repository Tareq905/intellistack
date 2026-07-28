import prisma from "@/lib/prisma";
import type { Comparison } from "@/types";
import { comparisons as staticComparisons } from "@/lib/data/comparisons";

export type ComparisonDetail = Comparison & {
  content: string;
  summary: string;
  sections: { title: string; content: string; winnerSlug?: string }[];
};

function mapComparison(row: {
  slug: string;
  summary: string;
  content: string;
  createdAt: Date;
  winnerId: string | null;
  toolA: { id: string; slug: string; name: string };
  toolB: { id: string; slug: string; name: string };
  sections: { title: string; content: string; winnerId: string | null }[];
}): ComparisonDetail {
  let winner: string | undefined;
  if (row.winnerId === row.toolA.id) winner = row.toolA.slug;
  else if (row.winnerId === row.toolB.id) winner = row.toolB.slug;

  return {
    slug: row.slug,
    title: `${row.toolA.name} vs ${row.toolB.name}`,
    excerpt: row.summary,
    productSlugs: [row.toolA.slug, row.toolB.slug],
    coverImage: "/covers/default.svg",
    publishedAt: row.createdAt.toISOString().slice(0, 10),
    winner,
    content: row.content,
    summary: row.summary,
    sections: row.sections.map((s) => ({
      title: s.title,
      content: s.content,
      winnerSlug: s.winnerId ?? undefined,
    })),
  };
}

const comparisonInclude = {
  toolA: { select: { slug: true, name: true, id: true } },
  toolB: { select: { slug: true, name: true, id: true } },
  sections: { orderBy: { createdAt: "asc" as const } },
};

export async function getPublishedComparisons(): Promise<Comparison[]> {
  try {
    const rows = await prisma.comparison.findMany({
      where: { published: true },
      include: comparisonInclude,
      orderBy: { createdAt: "desc" },
    });
    if (rows.length === 0) return staticComparisons;
    return rows.map(mapComparison);
  } catch {
    return staticComparisons;
  }
}

export async function getComparisonBySlugFromDb(slug: string): Promise<ComparisonDetail | undefined> {
  try {
    const row = await prisma.comparison.findFirst({
      where: { slug, published: true },
      include: comparisonInclude,
    });
    if (row) return mapComparison(row);
  } catch {
    /* fall through */
  }

  const fallback = staticComparisons.find((c) => c.slug === slug);
  if (!fallback) return undefined;
  return {
    ...fallback,
    content: fallback.excerpt,
    summary: fallback.excerpt,
    sections: [],
  };
}

export async function getComparisonSlugsFromDb(): Promise<string[]> {
  try {
    const rows = await prisma.comparison.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (rows.length > 0) return rows.map((r) => r.slug);
  } catch {
    /* fall through */
  }
  return staticComparisons.map((c) => c.slug);
}
