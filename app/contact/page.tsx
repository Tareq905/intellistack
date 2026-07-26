import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { submitContactForm } from "@/app/actions/contact";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with the IntelliStack editorial team — tool suggestions, corrections, or partnerships.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Get in touch</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          Tool suggestions, corrections, or partnership inquiries — we read every message.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal-600 hover:underline"
        >
          <Mail className="h-4 w-4" />
          {siteConfig.email}
        </a>
      </div>

      <form action={submitContactForm} className="mx-auto mt-10 max-w-lg space-y-4 rounded-2xl border border-ink-100 bg-white p-8 dark:border-ink-800 dark:bg-ink-900">
        {params.status === "success" && (
          <p className="rounded-xl bg-signal-50 p-3 text-sm text-signal-700 dark:bg-signal-900/20 dark:text-signal-300">
            Thanks — your message has been sent. We&apos;ll reply within two business days.
          </p>
        )}
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink-700 dark:text-ink-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-signal-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200 dark:placeholder-ink-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink-700 dark:text-ink-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-signal-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200 dark:placeholder-ink-500"
          />
        </div>
        <div>
          <label htmlFor="topic" className="text-sm font-medium text-ink-700 dark:text-ink-300">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-signal-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200"
          >
            <option>Tool suggestion</option>
            <option>Correction / factual issue</option>
            <option>Partnership</option>
            <option>Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-ink-700 dark:text-ink-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 outline-none focus:border-signal-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200 dark:placeholder-ink-500"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Send message
        </button>
      </form>
    </div>
  );
}
