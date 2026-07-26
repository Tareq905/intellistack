import Link from "next/link";
import { Twitter, Linkedin, Github, Smile } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-sm text-white dark:bg-white dark:text-ink-900">
              IS
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">{siteConfig.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.links.huggingface}
              aria-label="HuggingFace"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-500 hover:border-ink-300 hover:text-ink-800 dark:border-ink-800 dark:text-ink-400 dark:hover:border-ink-600 dark:hover:text-ink-200"
            >
              <Smile className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-500 hover:border-ink-300 hover:text-ink-800 dark:border-ink-800 dark:text-ink-400 dark:hover:border-ink-600 dark:hover:text-ink-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.github}
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-500 hover:border-ink-300 hover:text-ink-800 dark:border-ink-800 dark:text-ink-400 dark:hover:border-ink-600 dark:hover:text-ink-200"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterColumn title="Company" links={siteConfig.footerLinks.company} />
        <FooterColumn title="Resources" links={siteConfig.footerLinks.resources} />
        <FooterColumn title="Legal" links={siteConfig.footerLinks.legal} />
      </div>

      <div className="border-t border-ink-100 py-6 dark:border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-ink-400 sm:flex-row dark:text-ink-500">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>Some links on this site are affiliate links. See our Affiliate Disclosure.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
