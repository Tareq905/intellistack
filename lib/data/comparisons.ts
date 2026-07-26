import type { Comparison } from "@/types";

export const comparisons: Comparison[] = [
  {
    slug: "aurora-vs-otter-ai",
    title: "Aurora Meeting Assistant vs Otter.ai: Real-Time Intel vs Post-Call Transcription",
    excerpt:
      "Aurora feeds salespeople live information during calls while Otter transcribes after. We compared both approaches for real sales teams.",
    productSlugs: ["aurora-meeting-assistant"],
    coverImage: "/covers/aurora-vs-otter.svg",
    publishedAt: "2026-07-12",
    winner: "aurora-meeting-assistant",
  },
  {
    slug: "aurora-vault-vs-langchain",
    title: "Aurora-Vault vs LangChain RAG: Which Gets You to Production Faster?",
    excerpt:
      "LangChain gives you maximum flexibility; Aurora-Vault gets you a working RAG system in minutes. Here's when to use each.",
    productSlugs: ["aurora-vault"],
    coverImage: "/covers/aurora-vault-vs-langchain.svg",
    publishedAt: "2026-07-18",
    winner: "aurora-vault",
  },
  {
    slug: "cybersoc-vs-securegpt",
    title: "CyberSOC AI (Gemma 4) vs General-Purpose LLMs for SOC Work",
    excerpt:
      "Fine-tuned domain models vs prompting GPT-4 for SOC analysis — we tested both on real Sigma rules and EVTX logs to see which is more reliable.",
    productSlugs: ["cybersoc-gemma4"],
    coverImage: "/covers/cybersoc-vs-gpt.svg",
    publishedAt: "2026-07-20",
    winner: "cybersoc-gemma4",
  },
];

export function getComparisonBySlug(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
