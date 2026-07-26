import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="rounded-3xl bg-ink-900 px-8 py-14 text-center sm:px-16">
      {eyebrow && <p className="eyebrow text-signal-300">{eyebrow}</p>}
      <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-ink-300">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href={primaryHref} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-100">
          {primaryLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
