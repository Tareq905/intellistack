import { Check, X } from "lucide-react";

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
        <h4 className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">Pros</h4>
        <ul className="mt-4 space-y-3">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-600 dark:text-signal-400" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
        <h4 className="font-display text-base font-semibold text-ink-900 dark:text-ink-50">Cons</h4>
        <ul className="mt-4 space-y-3">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
              <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-300 dark:text-ink-600" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
