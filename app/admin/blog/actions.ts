'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal('')),
  authorId: z.string().uuid().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export async function createPost(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { coverImage, authorId, ...data } = parsed.data
  await prisma.post.create({
    data: { ...data, coverImage: coverImage || null, authorId: authorId || '00000000-0000-0000-0000-000000000000' },
  })
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function updatePost(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { coverImage, ...data } = parsed.data
  await prisma.post.update({ where: { id }, data: { ...data, coverImage: coverImage || null } })
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } })
  revalidatePath('/admin/blog')
}
