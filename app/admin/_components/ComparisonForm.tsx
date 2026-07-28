'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'
import { createComparison } from '../comparisons/actions'
import type { Tool } from '@prisma/client'

type Props = { tools: Tool[] }
type State = { error?: Record<string, string[]> }

type Section = { title: string; content: string; winnerId: string }

export default function ComparisonForm({ tools }: Props) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => {
      const result = await createComparison(fd)
      return result ?? {}
    },
    {}
  )

  const [sections, setSections] = useState<Section[]>([
    { title: '', content: '', winnerId: '' },
  ])

  const addSection = () =>
    setSections((prev) => [...prev, { title: '', content: '', winnerId: '' }])

  const removeSection = (i: number) =>
    setSections((prev) => prev.filter((_, idx) => idx !== i))

  const updateSection = (i: number, key: keyof Section, value: string) =>
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)))

  const field = (name: string) => state.error?.[name]?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {/* Basic Info */}
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Basic Information</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Slug *</label>
          <input name="slug" required className="admin-input" placeholder="e.g. chatgpt-vs-claude" />
          {field('slug') && <p className="text-xs text-red-500">{field('slug')}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Tool A *</label>
            <select name="toolAId" required className="admin-input">
              <option value="">Select Tool A</option>
              {tools.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {field('toolAId') && <p className="text-xs text-red-500">{field('toolAId')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Tool B *</label>
            <select name="toolBId" required className="admin-input">
              <option value="">Select Tool B</option>
              {tools.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {field('toolBId') && <p className="text-xs text-red-500">{field('toolBId')}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Winner (optional)</label>
          <select name="winnerId" className="admin-input">
            <option value="">No winner / Too close to call</option>
            {tools.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Summary *</label>
          <input name="summary" required className="admin-input" placeholder="One-line summary of the comparison" />
          {field('summary') && <p className="text-xs text-red-500">{field('summary')}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Full Content *</label>
          <textarea name="content" required rows={8} className="admin-input resize-y" placeholder="Full markdown content..." />
          {field('content') && <p className="text-xs text-red-500">{field('content')}</p>}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked className="w-4 h-4 rounded accent-signal-600" />
          <span className="text-sm text-ink-700 dark:text-ink-300">Published</span>
        </label>
      </section>

      {/* Sections */}
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ink-100 dark:border-ink-800">
          <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50">Comparison Sections</h2>
          <button type="button" onClick={addSection} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-signal-600 border border-signal-300 rounded-lg hover:bg-signal-50 dark:hover:bg-signal-900/20 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Section
          </button>
        </div>

        {sections.map((section, i) => (
          <div key={i} className="space-y-3 p-4 border border-ink-100 dark:border-ink-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-600 dark:text-ink-400">Section {i + 1}</span>
              {sections.length > 1 && (
                <button type="button" onClick={() => removeSection(i)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <input
              name="sectionTitle"
              value={section.title}
              onChange={(e) => updateSection(i, 'title', e.target.value)}
              className="admin-input"
              placeholder="Section title (e.g. Pricing, Features)"
            />
            <textarea
              name="sectionContent"
              value={section.content}
              onChange={(e) => updateSection(i, 'content', e.target.value)}
              rows={3}
              className="admin-input resize-y"
              placeholder="Section content..."
            />
            <select
              name="sectionWinnerId"
              value={section.winnerId}
              onChange={(e) => updateSection(i, 'winnerId', e.target.value)}
              className="admin-input"
            >
              <option value="">No section winner</option>
              {tools.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        ))}
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          Create Comparison
        </button>
        <Link href="/admin/comparisons" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}