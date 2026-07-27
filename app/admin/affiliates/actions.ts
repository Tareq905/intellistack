'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const affiliateSchema = z.object({
  platform: z.string().min(1),
  toolName: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  affiliateUrl: z.string().url(),
  fallbackUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
  notes: z.string().optional(),
})

export async function createAffiliateLink(formData: FormData) {
  const parsed = affiliateSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { fallbackUrl, ...data } = parsed.data
  await prisma.affiliateLink.create({ data: { ...data, fallbackUrl: fallbackUrl || null } })
  revalidatePath('/admin/affiliates')
  redirect('/admin/affiliates')
}

export async function updateAffiliateLink(id: string, formData: FormData) {
  const parsed = affiliateSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { fallbackUrl, ...data } = parsed.data
  await prisma.affiliateLink.update({ where: { id }, data: { ...data, fallbackUrl: fallbackUrl || null } })
  revalidatePath('/admin/affiliates')
  redirect('/admin/affiliates')
}

export async function deleteAffiliateLink(id: string) {
  await prisma.affiliateLink.delete({ where: { id } })
  revalidatePath('/admin/affiliates')
}
