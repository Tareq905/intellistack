'use client'
import { useActionState } from 'react'
import Link from 'next/link'
import { createAffiliateLink, updateAffiliateLink } from '../affiliates/actions'
import type { AffiliateLink } from '@prisma/client'

type Props = { link?: AffiliateLink }
type State = { error?: Record<string, string[]> }

export default function AffiliateLinkForm({ link }: Props) {
  const action = link ? updateAffiliateLink.bind(null, link.id) : createAffiliateLink
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => { const r = await action(fd); return r ?? {} },
    {}
  )
  const field = (name: string) => state.error?.[name]?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Tool Name *</label>
            <input name="toolName" defaultValue={link?.toolName} required className="admin-input" placeholder="ChatGPT" />
            {field('toolName') && <p className="text-xs text-red-500">{field('toolName')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Platform *</label>
            <input name="platform" defaultValue={link?.platform} required className="admin-input" placeholder="ShareASale" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Slug *</label>
            <input name="slug" defaultValue={link?.slug} required className="admin-input" placeholder="chatgpt-aff" />
            {field('slug') && <p className="text-xs text-red-500">{field('slug')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Status *</label>
            <select name="status" defaultValue={link?.status ?? 'ACTIVE'} className="admin-input">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Affiliate URL *</label>
          <input name="affiliateUrl" type="url" defaultValue={link?.affiliateUrl} required className="admin-input" placeholder="https://..." />
          {field('affiliateUrl') && <p className="text-xs text-red-500">{field('affiliateUrl')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Fallback URL</label>
          <input name="fallbackUrl" type="url" defaultValue={link?.fallbackUrl ?? ''} className="admin-input" placeholder="https://..." />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Notes</label>
          <textarea name="notes" defaultValue={link?.notes ?? ''} rows={3} className="admin-input resize-none" placeholder="Commission rate, terms, etc." />
        </div>
      </section>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {link ? 'Update Link' : 'Create Link'}
        </button>
        <Link href="/admin/affiliates" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">Cancel</Link>
      </div>
    </form>
  )
}
