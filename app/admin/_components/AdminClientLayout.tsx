'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Box,
  FolderTree,
  Scale,
  FileText,
  Mail,
  Image as ImageIcon,
  Link as LinkIcon,
  Search,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from '../actions'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'AI Tools', href: '/admin/tools', icon: Box },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Comparisons', href: '/admin/comparisons', icon: Scale },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Affiliate Links', href: '/admin/affiliates', icon: LinkIcon },
  { name: 'SEO', href: '/admin/seo', icon: Search },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-ink-900 border-b border-ink-200 dark:border-ink-800">
        <span className="flex items-center font-display font-bold text-lg tracking-tight text-ink-900 dark:text-ink-50">
          <span className="relative flex h-2.5 w-2.5 mr-1.5 mb-0.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-60"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-500"></span>
          </span>
          Quantas
        </span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white dark:bg-ink-900 border-r border-ink-200 dark:border-ink-800 flex-shrink-0 md:min-h-screen flex flex-col sticky top-0`}
      >
        <div className="p-6 hidden md:block border-b border-ink-200 dark:border-ink-800">
          <span className="flex items-center font-display font-bold text-xl tracking-tight text-ink-900 dark:text-ink-50">
            <span className="relative flex h-2.5 w-2.5 mr-1.5 mb-0.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-60"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-500"></span>
            </span>
            Quantas
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-signal-50 text-signal-700 dark:bg-signal-900/30 dark:text-signal-400'
                    : 'text-ink-600 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-ink-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-signal-600 dark:text-signal-500' : 'text-ink-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-ink-200 dark:border-ink-800">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
