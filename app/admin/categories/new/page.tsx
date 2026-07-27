import CategoryForm from '../../_components/CategoryForm'
export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">New Category</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Add a new tool category</p>
      </div>
      <CategoryForm />
    </div>
  )
}
