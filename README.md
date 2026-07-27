# NeuralForge

A production-grade, SEO-optimized affiliate content website for AI tools, SaaS, automation, developer tools, SEO software, email marketing platforms, and productivity software. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and MDX.

## Tech stack

- **Next.js 15** — App Router, React Server Components, Server Actions
- **TypeScript** — strict mode
- **Tailwind CSS** — custom design tokens (see `tailwind.config.ts`)
- **MDX** — filesystem-based blog content (`content/blog/*.mdx`)
- **Cloudflare Pages** — deploy target via `@cloudflare/next-on-pages`

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/                     Routes (App Router)
  actions/                Server actions (newsletter, contact)
  [route]/page.tsx         Static pages
  categories/[slug]/       Dynamic category pages
  reviews/[slug]/          Dynamic review pages
  comparisons/[slug]/      Dynamic comparison pages
  blog/[slug]/             Dynamic MDX blog post pages
  sitemap.ts, robots.ts    SEO infrastructure
  manifest.ts              PWA manifest
  rss.xml/route.ts         RSS feed

components/
  ui/                     Generic UI primitives (Rating, Badge, FAQAccordion)
  layout/                 Header, Footer, LegalLayout
  affiliate/              ProductCard, ReviewCard, ComparisonTable, ProsCons, CTASection, NewsletterSignup, RelatedProducts
  blog/                   PostCard, CategoryFilter, SearchBar, Pagination

content/blog/*.mdx        Blog post source files (frontmatter + MDX body)

lib/
  data/                   Sample structured data (categories, products, reviews, comparisons, authors)
  blog.ts                 MDX loader/parser utilities
  seo.ts                  Metadata + JSON-LD builders
  config.ts               Site-wide constants (nav, footer links, site info)
  utils.ts                 cn(), formatDate(), paginate(), slugify()

types/index.ts             Shared TypeScript types
```

## Content model

All sample data in `lib/data/` is illustrative — replace it with your real products, reviews, and comparisons, or wire these files up to a CMS/database later (the type definitions in `types/index.ts` are designed to map cleanly onto a Postgres schema).

Blog posts are plain `.mdx` files with frontmatter:

```mdx
---
title: "Post title"
excerpt: "One or two sentence summary"
coverImage: "/covers/example.svg"
category: "automation"
tags: ["automation", "workflows"]
author: "sara-chen"        # must match a key in lib/data/authors.ts
publishedAt: "2026-06-18"
featured: true
---

Post body in MDX...
```

## Wiring up real integrations

Two server actions currently log a `TODO` instead of calling a live service:

- `app/actions/newsletter.ts` — connect to your ESP (Resend, Mailchimp, ConvertKit, etc.)
- `app/actions/contact.ts` — connect to email delivery (e.g. Resend) or a helpdesk/CRM

Both already validate input and redirect with a status query param (`?status=success` / `?status=invalid`) that the corresponding pages read and display.

## SEO

- Per-page `generateMetadata` with canonical URLs, Open Graph, and Twitter Card tags (`lib/seo.ts`)
- JSON-LD: Organization (site-wide), Article, Review, BreadcrumbList, FAQPage
- `app/sitemap.ts` auto-includes every category, review, comparison, and blog post
- `app/robots.ts` and `app/rss.xml/route.ts`

## Deploying to Cloudflare Pages

```bash
npm run pages:build     # builds via @cloudflare/next-on-pages
npm run pages:deploy    # deploys the static output with wrangler
```

`wrangler.toml` is pre-configured with `nodejs_compat` and the expected output directory. You'll need to authenticate wrangler (`npx wrangler login`) and create the Pages project once via the Cloudflare dashboard or `wrangler pages project create`.

## Replacing placeholder assets

`public/` and the `/covers`, `/logos`, `/authors` image paths referenced in `lib/data/*` are placeholders (solid-color divs are used in the UI in place of real `<Image>` tags in a few spots). Before launch:

1. Add real logos, cover images, and author photos to `public/`
2. Swap the gradient placeholder `<div>`s in review/comparison/post pages for `next/image`
3. Generate real favicon, `apple-touch-icon.png`, and `icon-192.png` / `icon-512.png`
4. Replace `og/default.png` with a real 1200×630 social share image

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (with Tailwind class sorting) |
| `npm run pages:build` | Build for Cloudflare Pages |
| `npm run pages:deploy` | Build + deploy to Cloudflare Pages |
