'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const toolSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  categoryId: z.string().uuid('Invalid category'),
  shortDescription: z.string().min(1),
  fullReview: z.string().min(1),
  rating: z.coerce.number().min(0).max(5),
  pricingModel: z.enum(['FREE', 'FREEMIUM', 'PAID', 'ENTERPRISE']),
  isFree: z.coerce.boolean().optional().default(false),
  officialWebsite: z.string().url().optional().or(z.literal('')),
  affiliateUrl: z.string().url().optional().or(z.literal('')),
  logoUrl: z.string().url().optional().or(z.literal('')),
  published: z.coerce.boolean().optional().default(false),
  featured: z.coerce.boolean().optional().default(false),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export async function createTool(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = toolSchema.safeParse({
    ...raw,
    isFree: raw.isFree === 'on',
    published: raw.published === 'on',
    featured: raw.featured === 'on',
  })
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { officialWebsite, affiliateUrl, logoUrl, ...data } = parsed.data
  await prisma.tool.create({
    data: { ...data, officialWebsite: officialWebsite || null, affiliateUrl: affiliateUrl || null, logoUrl: logoUrl || null },
  })
  revalidatePath('/admin/tools')
  redirect('/admin/tools')
}

export async function updateTool(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = toolSchema.safeParse({
    ...raw,
    isFree: raw.isFree === 'on',
    published: raw.published === 'on',
    featured: raw.featured === 'on',
  })
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { officialWebsite, affiliateUrl, logoUrl, ...data } = parsed.data
  await prisma.tool.update({
    where: { id },
    data: { ...data, officialWebsite: officialWebsite || null, affiliateUrl: affiliateUrl || null, logoUrl: logoUrl || null },
  })
  revalidatePath('/admin/tools')
  redirect('/admin/tools')
}

export async function deleteTool(id: string) {
  await prisma.tool.delete({ where: { id } })
  revalidatePath('/admin/tools')
}
