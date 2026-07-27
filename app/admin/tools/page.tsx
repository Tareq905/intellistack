import Link from 'next/link'
import { Plus, Edit, Trash2, Box } from 'lucide-react'
import prisma from '@/lib/prisma'
import { deleteTool } from './actions'

export default async function AdminToolsPage() {
  let tools: Awaited<ReturnType<typeof prisma.tool.findMany<{ include: { category: true } }>>> = []
  try {
    tools = await prisma.tool.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">AI Tools</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage your AI tool directory</p>
        </div>
        <Link href="/admin/tools/new" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-signal-600 hover:bg-signal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />Add Tool
        </Link>
      </div>

      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800">
              <tr>
                <th className="px-6 py-4 font-medium">Tool Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Pricing</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {tools.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-ink-500">No tools found. Click &ldquo;Add Tool&rdquo; to get started.</td></tr>
              ) : tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-ink-50/50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {tool.logoUrl ? (
                        <img src={tool.logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-ink-400">
                          <Box className="w-4 h-4" />
                        </div>
                      )}
                      <span className="font-medium text-ink-900 dark:text-ink-50">{tool.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-600 dark:text-ink-300">{tool.category.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tool.published ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {tool.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-600 dark:text-ink-300">{tool.pricingModel}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/tools/${tool.id}/edit`} className="p-2 text-ink-400 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-md hover:bg-ink-100 dark:hover:bg-ink-800">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteTool.bind(null, tool.id)}>
                        <button type="submit" className="p-2 text-ink-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
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