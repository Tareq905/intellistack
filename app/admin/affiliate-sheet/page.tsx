import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink, AlertTriangle, Sheet } from 'lucide-react'
import { listAffiliateSheetEntries } from '@/lib/google-sheets/affiliate-database'
import { AFFILIATE_SHEET_URL, isGoogleSheetsConfigured } from '@/lib/google-sheets/config'
import { deleteAffiliateSheetEntryAction } from './actions'

export default async function AdminAffiliateSheetPage() {
  const configured = isGoogleSheetsConfigured()
  let entries: Awaited<ReturnType<typeof listAffiliateSheetEntries>> = []
  let loadError: string | null = null

  if (configured) {
    try {
      entries = await listAffiliateSheetEntries()
    } catch (error) {
      loadError = (error as Error).message
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50 flex items-center gap-2">
            <Sheet className="w-6 h-6 text-signal-600" />
            Affiliate Database (Google Sheet)
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            Admin-only affiliate research synced directly to your Google Sheet. No frontend connection.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={AFFILIATE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 text-sm font-medium rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Sheet
          </a>
          <Link
            href="/admin/affiliate-sheet/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </Link>
        </div>
      </div>

      {!configured && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-800 dark:text-amber-300 space-y-2">
            <p className="font-semibold">Google Sheets credentials not configured</p>
            <p>Add these to <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code>:</p>
            <ul className="list-disc pl-5 space-y-1 text-amber-700 dark:text-amber-400">
              <li><code>GOOGLE_SERVICE_ACCOUNT_EMAIL</code></li>
              <li><code>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code></li>
              <li>Optional: <code>GOOGLE_SHEETS_AFFILIATE_ID</code> (defaults to your sheet)</li>
              <li>Optional: <code>GOOGLE_SHEETS_AFFILIATE_TAB</code> (default: Affiliate Tools)</li>
            </ul>
            <p>Then share the sheet with the service account email as <strong>Editor</strong>.</p>
          </div>
        </div>
      )}

      {loadError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20 p-4">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">Could not load Google Sheet</p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-0.5">{loadError}</p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[900px]">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Affiliate URL</th>
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Notes</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-ink-500">
                    {configured ? 'No affiliate entries in the sheet yet.' : 'Configure Google credentials to sync with your sheet.'}
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.rowNumber} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink-900 dark:text-ink-50">{entry.toolName}</div>
                      {entry.officialWebsite && (
                        <a href={entry.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-xs text-signal-600 hover:underline">
                          Official site
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{entry.category || '—'}</td>
                    <td className="px-4 py-3">
                      {entry.affiliateUrl ? (
                        <a href={entry.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-signal-600 hover:underline truncate block max-w-[200px]">
                          {entry.affiliateUrl.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">{entry.affiliateProgram || '—'}</td>
                    <td className="px-4 py-3 text-ink-500 max-w-[180px] truncate">{entry.notes || '—'}</td>
                    <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{entry.lastUpdated || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/affiliate-sheet/${entry.rowNumber}/edit`}
                          className="p-2 text-ink-400 hover:text-signal-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={deleteAffiliateSheetEntryAction.bind(null, entry.rowNumber)}>
                          <button type="submit" className="p-2 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
