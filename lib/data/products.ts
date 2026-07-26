import type { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "project-management-agent",
    name: "AI Project Management Agent",
    tagline: "Autonomous AI agent that summarizes projects, analyzes RAIDD, and auto-generates email replies",
    logo: "/logos/pm-agent.svg",
    category: "ai-tools",
    rating: 4.8,
    reviewCount: 31,
    pricing: "Free",
    startingPrice: "Open Source",
    pros: [
      "Fully automated RAIDD (Risks, Assumptions, Issues, Dependencies, Decisions) analysis",
      "Meeting summaries delivered via push notifications",
      "AI-powered email reply generation from raw email text",
    ],
    cons: ["Requires project data setup before first use", "Currently optimized for individual/team use"],
    bestFor: "Project managers and teams who want AI-powered automation for project reporting and communication",
    affiliateUrl: "https://github.com/Tareq905/project-summary-agent-dealafriq",
    featured: true,
    trending: true,
  },
  {
    slug: "aurora-meeting-assistant",
    name: "Aurora — Meeting Assistant",
    tagline: "Real-time AI Chrome extension that feeds salespeople live intel during client calls",
    logo: "/logos/aurora.svg",
    category: "ai-tools",
    rating: 4.7,
    reviewCount: 24,
    pricing: "Free",
    startingPrice: "Open Source",
    pros: [
      "Listens to client voice in real time via Deepgram speech-to-text",
      "Provides instant context and information to the salesperson during the call",
      "Cognitive deterministic agentic framework for reliable, low-hallucination responses",
    ],
    cons: ["Requires Chrome browser", "Deepgram API key needed for speech-to-text"],
    bestFor: "Sales teams and account managers who need real-time AI support during client meetings",
    affiliateUrl: "https://github.com/Tareq905/ai-virtual-meeting-assistant-chrome-extension",
    featured: true,
    trending: true,
  },
  {
    slug: "aurora-vault",
    name: "Aurora-Vault (Python Package)",
    tagline: "Python package that removes the complexity of building RAG systems — 7M+ data points included",
    logo: "/logos/aurora-vault.svg",
    category: "developer-tools",
    rating: 4.6,
    reviewCount: 18,
    pricing: "Free",
    startingPrice: "pip install",
    pros: [
      "7 million curated data points ready to use out of the box",
      "Removes boilerplate from RAG pipeline setup",
      "Published on PyPI — install in seconds",
    ],
    cons: ["Large dataset may require adequate storage", "Currently focused on RAG use cases"],
    bestFor: "AI engineers and developers building Retrieval-Augmented Generation (RAG) applications",
    affiliateUrl: "https://pypi.org/project/aurora-vault/",
    featured: true,
    trending: true,
  },
  {
    slug: "cybersoc-gemma4",
    name: "CyberSOC AI (Gemma 4)",
    tagline: "LoRA fine-tuned Gemma 4 SOC assistant for threat detection, MITRE ATT&CK mapping, and security analysis",
    logo: "/logos/cybersoc.svg",
    category: "ai-tools",
    rating: 4.9,
    reviewCount: 42,
    pricing: "Free",
    startingPrice: "Open Source",
    pros: [
      "Trained on 52K+ cybersecurity examples using QLoRA + Unsloth + TRL",
      "Analyzes Sigma rules, Windows EVTX, Linux auditd, and Wazuh alerts",
      "Maps activity to MITRE ATT&CK and generates structured SOC assessments",
    ],
    cons: ["Requires GPU for efficient inference", "Specialized for SOC workflows — not a general-purpose model"],
    bestFor: "SOC analysts, cybersecurity researchers, and threat detection teams automating security workflows",
    affiliateUrl: "https://huggingface.co/tareq052/cybersoc-gemma4-adapter",
    featured: true,
    trending: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getTrendingProducts() {
  return products.filter((p) => p.trending);
}
