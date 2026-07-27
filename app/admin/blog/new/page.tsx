import PostForm from '../../_components/PostForm'
export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">New Blog Post</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Write and publish a new article</p>
      </div>
      <PostForm />
    </div>
  )
}
