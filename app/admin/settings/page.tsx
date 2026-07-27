import prisma from '@/lib/prisma'
import { saveSiteSettings } from './actions'

export default async function AdminSettingsPage() {
  let settings = null
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: 'global' } })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Site Settings</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Configure global site preferences</p>
      </div>
      <form action={saveSiteSettings} className="space-y-6 max-w-2xl">
        <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">General</h2>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Site Name</label>
            <input name="siteName" defaultValue={settings?.siteName ?? 'Quantas'} className="admin-input" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Footer Text</label>
            <textarea name="footerText" defaultValue={settings?.footerText ?? ''} rows={2} className="admin-input resize-none" placeholder="© 2025 Quantas. All rights reserved." />
          </div>
        </section>
        <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Affiliate Disclosure</h2>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Disclosure Text</label>
            <textarea name="affiliateDisclosure" defaultValue={settings?.affiliateDisclosure ?? ''} rows={4} className="admin-input resize-none" placeholder="Some links on our site are affiliate links..." />
          </div>
        </section>
        <button type="submit" className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          Save Settings
        </button>
      </form>
    </div>
  )
}
