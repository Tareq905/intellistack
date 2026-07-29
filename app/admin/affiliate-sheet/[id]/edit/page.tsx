import { notFound } from 'next/navigation'
import AffiliateSheetForm from '../../../_components/AffiliateSheetForm'
import { getAffiliateResearchEntry } from '@/lib/affiliate-research'

export default async function EditAffiliateSheetEntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let entry: Awaited<ReturnType<typeof getAffiliateResearchEntry>> = null
  try {
    entry = await getAffiliateResearchEntry(id)
  } catch {
    notFound()
  }
  if (!entry) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit Affiliate Entry</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
          Updating entry {entry.toolName} in your database.
        </p>
      </div>
      <AffiliateSheetForm entry={entry} />
    </div>
  )
}
