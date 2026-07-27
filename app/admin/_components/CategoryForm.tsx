'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createCategory, updateCategory } from '../categories/actions'
import type { Category } from '@prisma/client'

type Props = { category?: Category }
type State = { error?: Record<string, string[]> }

export default function CategoryForm({ category }: Props) {
  const action = category ? updateCategory.bind(null, category.id) : createCategory
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => { const r = await action(fd); return r ?? {} },
    {}
  )
  const field = (name: string) => state.error?.[name]?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Name *</label>
          <input name="name" defaultValue={category?.name} required className="admin-input" placeholder="AI Chatbots" />
          {field('name') && <p className="text-xs text-red-500">{field('name')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Slug *</label>
          <input name="slug" defaultValue={category?.slug} required className="admin-input" placeholder="ai-chatbots" />
          {field('slug') && <p className="text-xs text-red-500">{field('slug')}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Description</label>
          <textarea name="description" defaultValue={category?.description ?? ''} rows={3} className="admin-input resize-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Icon (Lucide icon name)</label>
          <input name="icon" defaultValue={category?.icon ?? ''} className="admin-input" placeholder="MessageSquare" />
        </div>
      </section>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {category ? 'Update Category' : 'Create Category'}
        </button>
        <Link href="/admin/categories" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">Cancel</Link>
      </div>
    </form>
  )
}
