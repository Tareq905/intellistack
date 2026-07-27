'use client'

import { useActionState } from 'react'
import { login } from './actions'
import { AlertCircle, Lock } from 'lucide-react'

// Define a simple Action State type for the useActionState hook
type ActionState = {
  error?: string
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => {
      const result = await login(formData)
      return result || { error: undefined }
    },
    { error: undefined }
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-ink-900 rounded-xl2 shadow-soft border border-ink-200 dark:border-ink-800 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-signal-50 dark:bg-signal-900 rounded-full flex items-center justify-center mb-4 text-signal-600 dark:text-signal-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="flex items-center text-2xl font-display font-bold tracking-tight text-ink-900 dark:text-ink-50">
            <span className="relative flex h-3 w-3 mr-2 mb-0.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-60"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-signal-500"></span>
            </span>
            Quantas
          </h1>
          <p className="text-sm text-ink-500 mt-1">
            Sign in to access the dashboard
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{state.error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-ink-700 dark:text-ink-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-signal-500/20 focus:border-signal-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-ink-700 dark:text-ink-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-signal-500/20 focus:border-signal-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-signal-600 hover:bg-signal-700 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-signal-500 focus:ring-offset-2 dark:focus:ring-offset-ink-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
