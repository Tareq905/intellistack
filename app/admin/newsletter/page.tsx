import prisma from '@/lib/prisma'
import { format } from 'date-fns'
import { Mail, UserX } from 'lucide-react'
import { unsubscribeSubscriber } from './actions'

export default async function AdminNewsletterPage() {
  let subscribers: Awaited<ReturnType<typeof prisma.newsletterSubscriber.findMany>> = []
  try {
    subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    // DB not connected
  }
  const active = subscribers.filter((s) => s.status === 'ACTIVE').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Newsletter</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{active} active subscribers</p>
        </div>
      </div>
      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Subscribed</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {subscribers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-ink-500">No subscribers yet.</td></tr>
              ) : subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-ink-400" />
                      <span className="text-ink-900 dark:text-ink-50">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400'}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-500 dark:text-ink-400">{format(sub.createdAt, 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 text-right">
                    {sub.status === 'ACTIVE' && (
                      <form action={unsubscribeSubscriber.bind(null, sub.id)}>
                        <button type="submit" className="p-2 text-ink-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1 text-xs font-medium ml-auto">
                          <UserX className="w-4 h-4" />Unsub
                        </button>
                      </form>
                    )}
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
