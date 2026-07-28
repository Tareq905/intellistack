import { revalidatePath } from "next/cache";

/** Invalidate public pages after CMS changes in admin. */
export function revalidatePublicContent(options?: {
  blog?: boolean;
  tools?: boolean;
  categories?: boolean;
  comparisons?: boolean;
}) {
  const all = !options;
  if (all || options?.blog) {
    revalidatePath("/blog");
    revalidatePath("/rss.xml");
    revalidatePath("/sitemap.xml");
  }
  if (all || options?.tools) {
    revalidatePath("/");
    revalidatePath("/reviews");
    revalidatePath("/categories");
    revalidatePath("/sitemap.xml");
  }
  if (all || options?.categories) {
    revalidatePath("/categories");
    revalidatePath("/");
  }
  if (all || options?.comparisons) {
    revalidatePath("/comparisons");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  }
  if (all) {
    revalidatePath("/sitemap.xml");
  }
}
