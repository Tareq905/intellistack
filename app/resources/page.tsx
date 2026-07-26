import Link from "next/link";
import { BookOpen, Calculator, FileText, ListChecks } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources",
  description: "Free guides, checklists, and frameworks for choosing and adopting AI tools and business software.",
  path: "/resources",
});

const resources = [
  {
    title: "The AI Tool Evaluation Checklist",
    description: "A 20-point checklist we use internally before recommending any AI tool.",
    icon: ListChecks,
    href: "/blog",
  },
  {
    title: "How to Read a Pricing Page Like a Buyer",
    description: "A practical guide to spotting hidden costs and usage-based pricing traps.",
    icon: FileText,
    href: "/blog",
  },
  {
    title: "SaaS Total Cost of Ownership Calculator",
    description: "A simple framework for comparing the real cost of two competing tools over 12 months.",
    icon: Calculator,
    href: "/blog",
  },
  {
    title: "Glossary: AI & Automation Terms",
    description: "Plain-language definitions for the terms that show up across our reviews.",
    icon: BookOpen,
    href: "/blog",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Resources</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">Free guides & frameworks</h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          The frameworks we use ourselves when deciding whether a tool is worth adopting.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {resources.map((resource) => (
          <Link key={resource.title} href={resource.href} className="card flex flex-col gap-3 p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-50 text-signal-600 dark:bg-signal-900/30 dark:text-signal-400">
              <resource.icon className="h-5 w-5" />
            </div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">{resource.title}</h2>
            <p className="text-sm text-ink-500 dark:text-ink-400">{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
