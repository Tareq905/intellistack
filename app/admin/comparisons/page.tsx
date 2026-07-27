import Link from 'next/link'
import { Plus, Edit, Trash2, Scale } from 'lucide-react'
import prisma from '@/lib/prisma'

export default async function AdminComparisonsPage() {
  let comparisons: Awaited<ReturnType<typeof prisma.comparison.findMany>> = []
  try {
    comparisons = await prisma.comparison.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Comparisons</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage your side-by-side comparisons</p>
        </div>
        <Link href="/admin/comparisons/new" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />Add Comparison
        </Link>
      </div>

      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-6 py-4 font-medium">Comparison Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {comparisons.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-ink-500">No comparisons found.</td></tr>
              ) : comparisons.map((comp) => (
                <tr key={comp.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-ink-400">
                        <Scale className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-ink-900 dark:text-ink-50">{comp.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${comp.published ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {comp.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/comparisons/${comp.id}/edit`} className="p-2 text-ink-400 hover:text-ink-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-ink-400 hover:text-red-500 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}