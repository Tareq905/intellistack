'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createAffiliateSheetEntry, updateAffiliateSheetEntryAction } from '../affiliate-sheet/actions'
import type { AffiliateResearchEntry } from '@/lib/affiliate-research'

type Props = { entry?: AffiliateResearchEntry }
type State = { error?: Record<string, string[]> }

export default function AffiliateSheetForm({ entry }: Props) {
  const action = entry
    ? updateAffiliateSheetEntryAction.bind(null, entry.id)
    : createAffiliateSheetEntry
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => { const r = await action(fd); return r ?? {} },
    {},
  )
  const field = (name: string) => state.error?.[name]?.[0]
  const formError = state.error?._form?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-4xl">
      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          {formError}
        </div>
      )}

      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">
          Tool Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Tool Name *</label>
            <input name="toolName" defaultValue={entry?.toolName} required className="admin-input" placeholder="Hostinger" />
            {field('toolName') && <p className="text-xs text-red-500">{field('toolName')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Official Website</label>
            <input name="officialWebsite" type="url" defaultValue={entry?.officialWebsite} className="admin-input" placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Category</label>
            <input name="category" defaultValue={entry?.category} className="admin-input" placeholder="Web Hosting" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Free/Paid</label>
            <input name="freePaid" defaultValue={entry?.freePaid} className="admin-input" placeholder="Freemium" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Starting Price</label>
            <input name="startingPrice" defaultValue={entry?.startingPrice} className="admin-input" placeholder="$9/mo" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">
          Affiliate Program
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Affiliate Program</label>
            <input name="affiliateProgram" defaultValue={entry?.affiliateProgram ?? 'Yes'} className="admin-input" placeholder="Yes" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Affiliate URL</label>
            <input name="affiliateUrl" type="url" defaultValue={entry?.affiliateUrl} className="admin-input" placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Affiliate Network</label>
            <input name="affiliateNetwork" defaultValue={entry?.affiliateNetwork} className="admin-input" placeholder="Impact, ShareASale..." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Commission</label>
            <input name="commission" defaultValue={entry?.commission} className="admin-input" placeholder="30%" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Cookie Duration</label>
            <input name="cookieDuration" defaultValue={entry?.cookieDuration} className="admin-input" placeholder="90 days" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Minimum Payout</label>
            <input name="minimumPayout" defaultValue={entry?.minimumPayout} className="admin-input" placeholder="$50" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">
          Research & Notes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Pros</label>
            <textarea name="pros" defaultValue={entry?.pros} rows={2} className="admin-input resize-none" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Cons</label>
            <textarea name="cons" defaultValue={entry?.cons} rows={2} className="admin-input resize-none" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Notes</label>
            <textarea name="notes" defaultValue={entry?.notes} rows={2} className="admin-input resize-none" placeholder="Priority: ★★★★★" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Keyword</label>
            <input name="keyword" defaultValue={entry?.keyword} className="admin-input" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Search Volume</label>
            <input name="searchVolume" defaultValue={entry?.searchVolume} className="admin-input" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Keyword Difficulty</label>
            <input name="keywordDifficulty" defaultValue={entry?.keywordDifficulty} className="admin-input" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Research Date</label>
            <input name="researchDate" defaultValue={entry?.researchDate} className="admin-input" placeholder="7/27/2026" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">
          Content Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Review Status</label>
            <input name="reviewStatus" defaultValue={entry?.reviewStatus} className="admin-input" placeholder="Not started" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Comparison Status</label>
            <input name="comparisonStatus" defaultValue={entry?.comparisonStatus} className="admin-input" placeholder="Not started" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Best Tools Status</label>
            <input name="bestToolsStatus" defaultValue={entry?.bestToolsStatus} className="admin-input" placeholder="Not started" />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {entry ? 'Update Entry' : 'Add Entry'}
        </button>
        <Link href="/admin/affiliate-sheet" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
