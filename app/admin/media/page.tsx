import prisma from '@/lib/prisma'
import { format } from 'date-fns'
import { ImageIcon, Trash2 } from 'lucide-react'
import { deleteMedia } from './actions'

export default async function AdminMediaPage() {
  let files: Awaited<ReturnType<typeof prisma.mediaFile.findMany>> = []
  try {
    files = await prisma.mediaFile.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    // DB not connected
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-ink-900 dark:text-ink-50">Media Library</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{files.length} files stored</p>
      </div>
      <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl2 p-6 shadow-card">
        <p className="text-sm text-ink-600 dark:text-ink-400">
          Upload files via your Supabase Storage bucket directly in the Supabase dashboard. Files registered here are URL references tracked in the database.
        </p>
      </div>
      {files.length === 0 ? (
        <div className="bg-white dark:bg-ink-900 border-2 border-dashed border-ink-200 dark:border-ink-700 rounded-xl2 p-12 text-center">
          <ImageIcon className="w-10 h-10 text-ink-300 mx-auto mb-3" />
          <p className="text-ink-500 font-medium">No media files yet</p>
          <p className="text-sm text-ink-400 mt-1">Upload files through Supabase Storage and register them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {files.map((file) => (
            <div key={file.id} className="group relative bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl overflow-hidden shadow-card">
              {file.mimeType.startsWith('image/') ? (
                <img src={file.url} alt={file.fileName} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-ink-100 dark:bg-ink-800 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-ink-400" />
                </div>
              )}
              <div className="p-2">
                <p className="text-xs text-ink-600 dark:text-ink-400 truncate">{file.fileName}</p>
                <p className="text-xs text-ink-400">{format(file.createdAt, 'MMM d')}</p>
              </div>
              <form action={deleteMedia.bind(null, file.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="submit" className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
