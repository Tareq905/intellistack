'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createPost, updatePost } from '../blog/actions'
import type { Post } from '@prisma/client'

type Props = { post?: Post }
type State = { error?: Record<string, string[]> }

export default function PostForm({ post }: Props) {
  const action = post ? updatePost.bind(null, post.id) : createPost
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, fd) => { const r = await action(fd); return r ?? {} },
    {}
  )
  const field = (name: string) => state.error?.[name]?.[0]

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">Post Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Title *</label>
            <input name="title" defaultValue={post?.title} required className="admin-input" placeholder="Best AI Tools in 2025..." />
            {field('title') && <p className="text-xs text-red-500">{field('title')}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Slug *</label>
            <input name="slug" defaultValue={post?.slug} required className="admin-input" placeholder="best-ai-tools-2025" />
            {field('slug') && <p className="text-xs text-red-500">{field('slug')}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Status *</label>
            <select name="status" defaultValue={post?.status ?? 'PUBLISHED'} required className="admin-input">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Cover Image URL</label>
            <input name="coverImage" type="url" defaultValue={post?.coverImage ?? ''} className="admin-input" placeholder="https://..." />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Excerpt</label>
          <textarea name="excerpt" defaultValue={post?.excerpt ?? ''} rows={2} className="admin-input resize-none" placeholder="Brief summary for previews..." />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Content (Markdown) *</label>
          <textarea name="content" defaultValue={post?.content} required rows={16} className="admin-input font-mono text-sm resize-y" placeholder="# Your markdown content here..." />
          {field('content') && <p className="text-xs text-red-500">{field('content')}</p>}
        </div>
      </section>
      <section className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-ink-900 dark:text-ink-50 pb-2 border-b border-ink-100 dark:border-ink-800">SEO</h2>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">SEO Title</label>
          <input name="seoTitle" defaultValue={post?.seoTitle ?? ''} className="admin-input" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink-700 dark:text-ink-300">Meta Description</label>
          <textarea name="metaDescription" defaultValue={post?.metaDescription ?? ''} rows={2} className="admin-input resize-none" maxLength={160} />
        </div>
      </section>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="px-6 py-2.5 bg-signal-600 hover:bg-signal-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          {isPending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {post ? 'Update Post' : 'Create Post'}
        </button>
        <Link href="/admin/blog" className="px-6 py-2.5 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 text-sm font-medium rounded-lg transition-colors">Cancel</Link>
      </div>
    </form>
  )
}
