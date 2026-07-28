import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import AffiliateSheetForm from '../../../_components/AffiliateSheetForm'
import { getAffiliateSheetEntry } from '@/lib/google-sheets/affiliate-database'
import { isGoogleSheetsConfigured } from '@/lib/google-sheets/config'

export default async function EditAffiliateSheetEntryPage({
  params,
}: {
  params: Promise<{ row: string }>
}) {
  if (!isGoogleSheetsConfigured()) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit Affiliate Entry</h1>
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Configure Google Sheets credentials in <code className="font-mono">.env.local</code> first.
          </p>
        </div>
        <Link href="/admin/affiliate-sheet" className="text-sm font-medium text-signal-600 hover:underline">
          ← Back to Affiliate Sheet
        </Link>
      </div>
    )
  }

  const { row } = await params
  const rowNumber = Number(row)
  if (!Number.isInteger(rowNumber) || rowNumber < 2) notFound()

  let entry: Awaited<ReturnType<typeof getAffiliateSheetEntry>> = null
  try {
    entry = await getAffiliateSheetEntry(rowNumber)
  } catch {
    notFound()
  }
  if (!entry) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit Affiliate Entry</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
          Updating row {rowNumber} in your Google Sheet.
        </p>
      </div>
      <AffiliateSheetForm entry={entry} />
    </div>
  )
}
