import Link from 'next/link'
import { Plus, Edit, Trash2, FileText } from 'lucide-react'
import prisma from '@/lib/prisma'
import { deletePost } from './actions'
import { format } from 'date-fns'

const statusColors: Record<string, string> = {
  PUBLISHED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  DRAFT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  SCHEDULED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
}

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = []
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Blog Posts</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage your editorial content</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />New Post
        </Link>
      </div>
      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {posts.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-ink-500">No posts yet. Create your first article.</td></tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-ink-400 flex-shrink-0" />
                      <span className="font-medium text-ink-900 dark:text-ink-50 truncate max-w-xs">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[post.status]}`}>{post.status}</span>
                  </td>
                  <td className="px-6 py-4 text-ink-500 dark:text-ink-400">{format(post.createdAt, 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-2 text-ink-400 hover:text-signal-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deletePost.bind(null, post.id)}>
                        <button type="submit" className="p-2 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
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
