"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/80 bg-paper/90 backdrop-blur-sm dark:border-ink-800 dark:bg-ink-950/90">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-sm text-white dark:bg-white dark:text-ink-900">
            IS
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              className="w-full rounded-full border border-ink-200 bg-white/50 py-1.5 pl-9 pr-4 text-sm text-ink-900 outline-none transition-colors focus:border-signal-400 focus:bg-white dark:border-ink-800 dark:bg-ink-900/50 dark:text-ink-100 dark:focus:border-signal-500 dark:focus:bg-ink-900"
            />
          </div>
        </div>


        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/newsletter" className="btn-secondary">
              Newsletter
            </Link>
            <Link href="/categories" className="btn-primary">
              Browse tools
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          
          <ThemeToggle />

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-ink-100 bg-paper transition-[max-height] duration-300 md:hidden dark:border-ink-800 dark:bg-ink-950",
          isOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  );
}
