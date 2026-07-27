import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AffiliateLinkForm from '../../../_components/AffiliateLinkForm'

export default async function EditAffiliatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const link = await prisma.affiliateLink.findUnique({ where: { id } })
  if (!link) notFound()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit: {link.toolName}</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Update affiliate link details</p>
      </div>
      <AffiliateLinkForm link={link} />
    </div>
  )
}
