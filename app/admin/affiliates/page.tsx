import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import prisma from '@/lib/prisma'
import { deleteAffiliateLink } from './actions'

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  INACTIVE: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export default async function AdminAffiliatesPage() {
  let links: Awaited<ReturnType<typeof prisma.affiliateLink.findMany>> = []
  try {
    links = await prisma.affiliateLink.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Affiliate Links</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage all affiliate and referral links</p>
        </div>
        <Link href="/admin/affiliates/new" className="inline-flex items-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />Add Link
        </Link>
      </div>
      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-6 py-4 font-medium">Tool / Platform</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {links.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-ink-500">No affiliate links yet.</td></tr>
              ) : links.map((link) => (
                <tr key={link.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-ink-900 dark:text-ink-50">{link.toolName}</div>
                    <div className="text-xs text-ink-500">{link.platform}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded">{link.slug}</code>
                      <a href={link.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-signal-600 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[link.status]}`}>{link.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/affiliates/${link.id}/edit`} className="p-2 text-ink-400 hover:text-signal-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteAffiliateLink.bind(null, link.id)}>
                        <button type="submit" className="p-2 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
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
