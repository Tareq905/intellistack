import Link from 'next/link'
import { Box, TrendingUp, FileText, Mail, Link as LinkIcon, AlertTriangle } from 'lucide-react'
import prisma from '@/lib/prisma'

async function getStats() {
  try {
    const [toolsCount, postsCount, subscribersCount, linksCount] = await Promise.all([
      prisma.tool.count(),
      prisma.post.count(),
      prisma.newsletterSubscriber.count(),
      prisma.affiliateLink.count(),
    ])
    return { toolsCount, postsCount, subscribersCount, linksCount, dbConnected: true }
  } catch {
    return { toolsCount: 0, postsCount: 0, subscribersCount: 0, linksCount: 0, dbConnected: false }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { name: 'Total AI Tools', value: stats.toolsCount, icon: Box, trend: 'Manage tools', href: '/admin/tools' },
    { name: 'Blog Posts', value: stats.postsCount, icon: FileText, trend: 'Manage posts', href: '/admin/blog' },
    { name: 'Newsletter Subs', value: stats.subscribersCount, icon: Mail, trend: 'View subscribers', href: '/admin/newsletter' },
    { name: 'Affiliate Links', value: stats.linksCount, icon: LinkIcon, trend: 'Manage links', href: '/admin/affiliates' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-semibold text-ink-900 dark:text-ink-50">Dashboard</h1>
        <p className="mt-2 text-ink-600 dark:text-ink-400">Welcome back. Here&apos;s what&apos;s happening with Quantas today.</p>
      </div>

      {/* DB not connected warning */}
      {!stats.dbConnected && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Database not connected</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
              Stats are unavailable. Add your Supabase credentials to{' '}
              <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code>{' '}
              to enable full functionality.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.name}
              href={card.href}
              className="bg-white dark:bg-ink-900 overflow-hidden rounded-xl2 border border-ink-200 dark:border-ink-800 p-6 shadow-card hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-signal-50 dark:bg-signal-900/30 text-signal-600 dark:text-signal-400">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-ink-500 dark:text-ink-400 truncate">{card.name}</dt>
                    <dd className="text-2xl font-semibold text-ink-900 dark:text-ink-50">
                      {stats.dbConnected ? card.value : '—'}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1.5" />
                <span className="text-green-600 dark:text-green-400 font-medium">{card.trend}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white dark:bg-ink-900 rounded-xl2 border border-ink-200 dark:border-ink-800 shadow-card">
        <div className="px-6 py-5 border-b border-ink-200 dark:border-ink-800">
          <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">Quick Links</h3>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Add Tool', href: '/admin/tools/new' },
            { label: 'New Post', href: '/admin/blog/new' },
            { label: 'Add Category', href: '/admin/categories/new' },
            { label: 'Add Affiliate Link', href: '/admin/affiliates/new' },
            { label: 'Affiliate Sheet', href: '/admin/affiliate-sheet' },
            { label: 'SEO Settings', href: '/admin/seo' },
            { label: 'Site Settings', href: '/admin/settings' },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="text-sm font-medium text-signal-600 dark:text-signal-400 hover:underline px-3 py-2 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
              → {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
