import Link from 'next/link'
import { Plus, Edit, Trash2, Download, Sheet } from 'lucide-react'
import { listAffiliateResearchEntries } from '@/lib/affiliate-research'
import { deleteAffiliateSheetEntryAction } from './actions'

export default async function AdminAffiliateSheetPage() {
  const entries = await listAffiliateResearchEntries()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50 flex items-center gap-2">
            <Sheet className="w-6 h-6 text-signal-600" />
            Affiliate Database
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            Admin-only affiliate research synced directly in the database.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/export-affiliates"
            className="inline-flex items-center gap-2 px-4 py-2 border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 text-sm font-medium rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
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
                    No affiliate entries in the database yet.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
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
                          href={`/admin/affiliate-sheet/${entry.id}/edit`}
                          className="p-2 text-ink-400 hover:text-signal-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={deleteAffiliateSheetEntryAction.bind(null, entry.id)}>
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
