'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createTool, updateTool } from '../tools/actions'
import type { Category, Tool } from '@prisma/client'

type Props = {
  categories: Category[]
  tool?: Tool
}

type State = { error?: Record<string, string[]> }

export default function ToolForm({ categories, tool }: Props) {
  const action = tool ? updateTool.bind(null, tool.id) : createTool
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => {
      const result = await action(fd)
      return result ?? {}
    },
    {}
  )

  const field = (name: string) => state.error?.[name]?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {/* Basic Info */}
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Basic Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Tool Name *</label>
            <input name="name" defaultValue={tool?.name} required className="admin-input" placeholder="e.g. ChatGPT" />
            {field('name') && <p className="text-xs text-red-500">{field('name')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Slug *</label>
            <input name="slug" defaultValue={tool?.slug} required className="admin-input" placeholder="e.g. chatgpt" />
            {field('slug') && <p className="text-xs text-red-500">{field('slug')}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Category *</label>
            <select name="categoryId" defaultValue={tool?.categoryId} required className="admin-input">
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {field('categoryId') && <p className="text-xs text-red-500">{field('categoryId')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Rating (0-5) *</label>
            <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={tool?.rating?.toString() ?? '4.5'} required className="admin-input" />
            {field('rating') && <p className="text-xs text-red-500">{field('rating')}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Short Description *</label>
          <input name="shortDescription" defaultValue={tool?.shortDescription} required className="admin-input" placeholder="Brief one-liner about the tool" />
          {field('shortDescription') && <p className="text-xs text-red-500">{field('shortDescription')}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Full Review *</label>
          <textarea name="fullReview" defaultValue={tool?.fullReview} required rows={10} className="admin-input resize-y" placeholder="Full markdown/rich-text review content..." />
          {field('fullReview') && <p className="text-xs text-red-500">{field('fullReview')}</p>}
        </div>
      </section>

      {/* Pricing & Links */}
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Pricing & Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Pricing Model *</label>
            <select name="pricingModel" defaultValue={tool?.pricingModel ?? 'FREEMIUM'} required className="admin-input">
              <option value="FREE">Free</option>
              <option value="FREEMIUM">Freemium</option>
              <option value="PAID">Paid</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Logo URL</label>
            <input name="logoUrl" defaultValue={tool?.logoUrl ?? ''} className="admin-input" placeholder="https://..." />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Official Website</label>
            <input name="officialWebsite" type="url" defaultValue={tool?.officialWebsite ?? ''} className="admin-input" placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Affiliate URL</label>
            <input name="affiliateUrl" type="url" defaultValue={tool?.affiliateUrl ?? ''} className="admin-input" placeholder="https://..." />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFree" defaultChecked={tool?.isFree ?? false} className="w-4 h-4 rounded accent-signal-600" />
            <span className="text-sm text-ink-700 dark:text-ink-300">Has Free Tier</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked={tool?.published ?? false} className="w-4 h-4 rounded accent-signal-600" />
            <span className="text-sm text-ink-700 dark:text-ink-300">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={tool?.featured ?? false} className="w-4 h-4 rounded accent-signal-600" />
            <span className="text-sm text-ink-700 dark:text-ink-300">Featured</span>
          </label>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">SEO</h2>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">SEO Title</label>
          <input name="seoTitle" defaultValue={tool?.seoTitle ?? ''} className="admin-input" placeholder="Leave blank to use tool name" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Meta Description</label>
          <textarea name="metaDescription" defaultValue={tool?.metaDescription ?? ''} rows={2} className="admin-input resize-none" placeholder="Max 160 chars..." maxLength={160} />
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {tool ? 'Update Tool' : 'Create Tool'}
        </button>
        <Link href="/admin/tools" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
