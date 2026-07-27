import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PostForm from '../../../_components/PostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Edit Post</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 truncate max-w-lg">{post.title}</p>
      </div>
      <PostForm post={post} />
    </div>
  )
}
