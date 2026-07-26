export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">{title}</h1>
        <p className="mt-3 text-sm text-ink-400 dark:text-ink-500">Last updated: {updated}</p>
      </header>
      <div className="prose prose-ink mx-auto mt-12 max-w-2xl [&>h2]:mt-9 [&>h2]:mb-3 [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-ink-900 [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-ink-600 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:text-ink-600 dark:[&>h2]:text-ink-100 dark:[&>p]:text-ink-300 dark:[&>ul]:text-ink-300 dark:[&>p>strong]:text-ink-100 dark:[&>ul>li>strong]:text-ink-100">
        {children}
      </div>
    </div>
  );
}
