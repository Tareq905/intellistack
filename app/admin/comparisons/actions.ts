'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const comparisonSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  toolAId: z.string().min(1),
  toolBId: z.string().min(1),
  winnerId: z.string().optional().or(z.literal('')),
  summary: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional(),
})

export async function createComparison(formData: FormData) {
  const sectionTitles = formData.getAll('sectionTitle') as string[]
  const sectionContents = formData.getAll('sectionContent') as string[]
  const sectionWinners = formData.getAll('sectionWinnerId') as string[]

  const parsed = comparisonSchema.safeParse({
    slug: formData.get('slug'),
    toolAId: formData.get('toolAId'),
    toolBId: formData.get('toolBId'),
    winnerId: formData.get('winnerId'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    published: formData.get('published') === 'on',
  })

  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  const { winnerId, ...data } = parsed.data

  const sections = sectionTitles
    .map((title, i) => ({
      title,
      content: sectionContents[i] ?? '',
      winnerId: sectionWinners[i] || null,
    }))
    .filter((s) => s.title && s.content)

  await prisma.comparison.create({
    data: {
      ...data,
      winnerId: winnerId || null,
      published: data.published ?? false,
      sections: { create: sections },
    },
  })

  revalidatePath('/admin/comparisons')
  redirect('/admin/comparisons')
}

export async function deleteComparison(id: string) {
  await prisma.comparison.delete({ where: { id } })
  revalidatePath('/admin/comparisons')
}