import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ToolForm from '../../../_components/ToolForm'

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [tool, categories] = await Promise.all([
    prisma.tool.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!tool) notFound()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit: {tool.name}</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Update tool details and settings</p>
      </div>
      <ToolForm categories={categories} tool={tool} />
    </div>
  )
}
