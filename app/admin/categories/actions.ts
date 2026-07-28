'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePublicContent } from '@/lib/revalidate-public'

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  icon: z.string().optional(),
})

export async function createCategory(formData: FormData) {
  const parsed = categorySchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  await prisma.category.create({ data: parsed.data })
  revalidatePath('/admin/categories')
  revalidatePublicContent({ categories: true, tools: true })
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const parsed = categorySchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  await prisma.category.update({ where: { id }, data: parsed.data })
  revalidatePath('/admin/categories')
  revalidatePublicContent({ categories: true, tools: true })
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/categories')
  revalidatePublicContent({ categories: true, tools: true })
}
