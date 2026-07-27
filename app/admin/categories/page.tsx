import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import prisma from '@/lib/prisma'
import { deleteCategory } from './actions'

export default async function AdminCategoriesPage() {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany<{ include: { _count: { select: { tools: true } } } }>>> = []
  try {
    categories = await prisma.category.findMany({
      include: { _count: { select: { tools: true } } },
      orderBy: { name: 'asc' },
    })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Categories</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage tool categories</p>
        </div>
        <Link href="/admin/categories/new" className="inline-flex items-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />Add Category
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-ink-500">No categories yet.</div>
        ) : categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-5 shadow-card flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-ink-900 dark:text-ink-50">{cat.name}</h3>
              <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{cat.description ?? 'No description'}</p>
              <span className="mt-3 inline-block text-xs text-signal-600 dark:text-signal-400 font-medium">{cat._count.tools} tools</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link href={`/admin/categories/${cat.id}/edit`} className="p-2 text-ink-400 hover:text-signal-600 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                <Edit className="w-4 h-4" />
              </Link>
              <form action={deleteCategory.bind(null, cat.id)}>
                <button type="submit" className="p-2 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
