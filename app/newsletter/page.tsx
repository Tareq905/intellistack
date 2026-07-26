export const runtime = "edge";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { NewsletterSignup } from "@/components/affiliate/NewsletterSignup";

export const metadata = buildMetadata({
  title: "Newsletter",
  description: "Get the best new AI tools and software reviews delivered to your inbox every week.",
  path: "/newsletter",
});

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow">Newsletter</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">
          The best new AI tools, once a week
        </h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          One weekly email: the tools worth trying, the ones to skip, and why — no sponsored placements disguised as
          picks.
        </p>
      </div>

      {params.status === "success" && (
        <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-xl bg-signal-50 p-4 text-sm text-signal-700 dark:bg-signal-900/20 dark:text-signal-300">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          You&apos;re subscribed. Check your inbox for a confirmation email.
        </div>
      )}
      {params.status === "invalid" && (
        <div className="mx-auto mt-8 max-w-lg rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
          That doesn&apos;t look like a valid email address — please try again.
        </div>
      )}

      <div className="mx-auto mt-10 max-w-lg">
        <NewsletterSignup compact />
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl gap-6 sm:grid-cols-3">
        {[
          { label: "Subscribers", value: "24,000+" },
          { label: "Avg. open rate", value: "48%" },
          { label: "Issues sent", value: "180+" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white py-6 text-center dark:border-ink-800 dark:bg-ink-900">
            <p className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
