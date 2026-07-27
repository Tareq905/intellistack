'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteMedia(id: string) {
  await prisma.mediaFile.delete({ where: { id } })
  revalidatePath('/admin/media')
}
