import prisma from '@/lib/prisma'
import { saveSeoSettings } from '../settings/actions'

export default async function AdminSeoPage() {
  let settings = null
  try {
    settings = await prisma.seoSetting.findUnique({ where: { id: 'global' } })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">SEO Settings</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Configure global SEO and metadata settings</p>
      </div>
      <form action={saveSeoSettings} className="space-y-6 max-w-2xl">
        <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
          <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Global Metadata</h2>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Default Site Title</label>
            <input name="title" defaultValue={settings?.title ?? 'Quantas — Best AI Tool Reviews'} className="admin-input" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Default Meta Description</label>
            <textarea name="description" defaultValue={settings?.description ?? ''} rows={3} className="admin-input resize-none" placeholder="Max 160 characters..." maxLength={160} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Robots Directive</label>
            <input name="robots" defaultValue={settings?.robots ?? 'index, follow'} className="admin-input" placeholder="index, follow" />
          </div>
        </section>
        <button type="submit" className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          Save SEO Settings
        </button>
      </form>
    </div>
  )
}
