import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CategoryForm from '../../../_components/CategoryForm'

const prismaClient = prisma

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await prismaClient.category.findUnique({ where: { id } })
  if (!category) notFound()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit: {category.name}</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Update category details</p>
      </div>
      <CategoryForm category={category} />
    </div>
  )
}
