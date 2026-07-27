import prisma from '@/lib/prisma'
import ComparisonForm from '../../_components/ComparisonForm'

export default async function NewComparisonPage() {
  const tools = await prisma.tool.findMany({ orderBy: { name: 'asc' } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">New Comparison</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Create a new side-by-side comparison</p>
      </div>
      <ComparisonForm tools={tools} />
    </div>
  )
}