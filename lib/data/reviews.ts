import type { Review } from "@/types";
import { authors } from "./authors";

export const reviews: Review[] = [
  {
    slug: "project-management-agent-review",
    productSlug: "project-management-agent",
    title: "AI Project Management Agent Review: Full Automation for PM Workflows",
    excerpt:
      "We tested this agent across real project data — RAIDD analysis, meeting summaries, and email drafting. Here's what it does well and where it still needs work.",
    rating: 4.8,
    author: authors["tareq"]!,
    publishedAt: "2026-07-01",
    coverImage: "/covers/pm-agent-review.svg",
    verdict:
      "A genuinely useful agentic PM tool that handles RAIDD analysis, meeting summaries, and email drafting automatically — a strong foundation for any team looking to automate project reporting.",
    pros: [
      "Fully automated RAIDD analysis with structured output",
      "Meeting summaries delivered via push notifications",
      "AI email reply generation from raw message text",
    ],
    cons: ["Requires project data setup before first use", "Best suited for teams already using structured project data"],
  },
  {
    slug: "aurora-meeting-assistant-review",
    productSlug: "aurora-meeting-assistant",
    title: "Aurora Meeting Assistant Review: Real-Time AI Support During Sales Calls",
    excerpt:
      "We tested Aurora across live mock client calls. The real-time voice-to-context pipeline is impressive — here's the full breakdown.",
    rating: 4.7,
    author: authors["tareq"]!,
    publishedAt: "2026-07-10",
    coverImage: "/covers/aurora-review.svg",
    verdict:
      "Aurora's combination of Deepgram speech-to-text and a deterministic agentic framework delivers reliable, real-time meeting support that doesn't hallucinate under pressure.",
    pros: [
      "Real-time voice listening via Deepgram STT",
      "Chrome extension — no extra app installation required",
      "Cognitive deterministic framework keeps responses grounded",
    ],
    cons: ["Requires Deepgram API key setup", "Currently Chrome-only"],
  },
  {
    slug: "aurora-vault-review",
    productSlug: "aurora-vault",
    title: "Aurora-Vault Review: The Fastest Way to Bootstrap a RAG Pipeline",
    excerpt:
      "We used Aurora-Vault to spin up a RAG system from scratch. With 7M+ data points pre-packaged, setup time dropped from days to minutes.",
    rating: 4.6,
    author: authors["tareq"]!,
    publishedAt: "2026-07-15",
    coverImage: "/covers/aurora-vault-review.svg",
    verdict:
      "Aurora-Vault removes the most painful part of RAG development — sourcing and structuring data. If you're building retrieval-based AI, this package saves serious time.",
    pros: [
      "7 million curated data points included out of the box",
      "Dramatically reduces RAG pipeline boilerplate",
      "One pip install, immediately useful",
    ],
    cons: ["Large dataset footprint requires adequate disk space", "Focused specifically on RAG use cases"],
  },
];

export function getReviewBySlug(slug: string) {
  return reviews.find((r) => r.slug === slug);
}

export function getReviewsByProduct(productSlug: string) {
  return reviews.filter((r) => r.productSlug === productSlug);
}
