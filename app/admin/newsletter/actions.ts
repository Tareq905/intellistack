'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function unsubscribeSubscriber(id: string) {
  await prisma.newsletterSubscriber.update({ where: { id }, data: { status: 'UNSUBSCRIBED' } })
  revalidatePath('/admin/newsletter')
}

export async function addSubscriber(formData: FormData) {
  const email = formData.get('email') as string
  if (!email) return { error: 'Email is required' }
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { status: 'ACTIVE' },
    create: { email, status: 'ACTIVE' },
  })
  revalidatePath('/admin/newsletter')
}
