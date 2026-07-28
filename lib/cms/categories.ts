import prisma from "@/lib/prisma";
import type { Category } from "@/types";
import { categories as staticCategories } from "@/lib/data/categories";

export async function getCategoriesFromDb(): Promise<Category[]> {
  try {
    const rows = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            tools: { where: { published: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });
    if (rows.length === 0) return staticCategories;

    return rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      description: row.description ?? "",
      icon: row.icon ?? "Sparkles",
      toolCount: row._count.tools,
    }));
  } catch {
    return staticCategories;
  }
}

export async function getCategoryBySlugFromDb(slug: string): Promise<Category | undefined> {
  const categories = await getCategoriesFromDb();
  return categories.find((c) => c.slug === slug);
}

export async function getCategorySlugsFromDb(): Promise<string[]> {
  const categories = await getCategoriesFromDb();
  return categories.map((c) => c.slug);
}
