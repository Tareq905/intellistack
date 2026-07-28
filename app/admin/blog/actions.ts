'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePublicContent } from '@/lib/revalidate-public'

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

function publishedAtForStatus(status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED') {
  return status === 'PUBLISHED' ? new Date() : null
}

export async function createPost(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { coverImage, authorId, status, ...data } = parsed.data
  await prisma.post.create({
    data: {
      ...data,
      status,
      coverImage: coverImage || null,
      authorId: authorId || '00000000-0000-0000-0000-000000000000',
      publishedAt: publishedAtForStatus(status),
    },
  })
  revalidatePath('/admin/blog')
  revalidatePublicContent({ blog: true })
  revalidatePath(`/blog/${parsed.data.slug}`)
  redirect('/admin/blog')
}

export async function updatePost(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  const { coverImage, status, ...data } = parsed.data
  const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } })
  await prisma.post.update({
    where: { id },
    data: {
      ...data,
      status,
      coverImage: coverImage || null,
      publishedAt:
        status === 'PUBLISHED' ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt ?? null,
    },
  })
  revalidatePath('/admin/blog')
  revalidatePublicContent({ blog: true })
  revalidatePath(`/blog/${parsed.data.slug}`)
  redirect('/admin/blog')
}

export async function deletePost(id: string) {
  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } })
  await prisma.post.delete({ where: { id } })
  revalidatePath('/admin/blog')
  revalidatePublicContent({ blog: true })
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`)
}
