'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveSeoSettings(formData: FormData) {
  await prisma.seoSetting.upsert({
    where: { id: 'global' },
    update: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      robots: formData.get('robots') as string,
    },
    create: {
      id: 'global',
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      robots: formData.get('robots') as string,
    },
  })
  revalidatePath('/admin/seo')
}

export async function saveSiteSettings(formData: FormData) {
  await prisma.siteSetting.upsert({
    where: { id: 'global' },
    update: {
      siteName: formData.get('siteName') as string,
      footerText: formData.get('footerText') as string,
      affiliateDisclosure: formData.get('affiliateDisclosure') as string,
    },
    create: {
      id: 'global',
      siteName: formData.get('siteName') as string,
      footerText: formData.get('footerText') as string,
      affiliateDisclosure: formData.get('affiliateDisclosure') as string,
    },
  })
  revalidatePath('/admin/settings')
}
