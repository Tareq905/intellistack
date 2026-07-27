import prisma from '@/lib/prisma'
import ToolForm from '../../_components/ToolForm'

export default async function NewToolPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">New AI Tool</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Add a new tool to the directory</p>
      </div>
      <ToolForm categories={categories} />
    </div>
  )
}
