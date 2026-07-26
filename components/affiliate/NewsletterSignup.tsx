import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900" : "rounded-3xl border border-ink-100 bg-white p-10 text-center dark:border-ink-800 dark:bg-ink-900"}>
      {!compact && (
        <>
          <p className="eyebrow">Newsletter</p>
          <h2 className="mx-auto mt-3 max-w-md font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">
            The best new AI tools, once a week
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-400">
            No spam, no fluff — just what&apos;s worth trying, reviewed by our editors.
          </p>
        </>
      )}
      <form action={subscribeToNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm text-ink-800 outline-none focus:border-signal-400 sm:max-w-xs dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300 dark:placeholder-ink-500"
        />
        <button type="submit" className="btn-primary">
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-400 dark:text-ink-500">Unsubscribe anytime. Read our Privacy Policy.</p>
    </div>
  );
}
