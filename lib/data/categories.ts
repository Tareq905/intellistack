import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "ai-tools",
    name: "AI Tools",
    description: "Agentic AI systems, fine-tuned models, and AI-powered applications built for real workflows.",
    icon: "Sparkles",
    toolCount: 3,
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Python packages, APIs, and developer-facing libraries that accelerate AI and ML development.",
    icon: "Terminal",
    toolCount: 1,
  },
  {
    slug: "automation",
    name: "AI Automation",
    description: "Agents and workflow systems that automate repetitive operational and business tasks end to end.",
    icon: "Workflow",
    toolCount: 1,
  },
  {
    slug: "cybersecurity",
    name: "AI Cybersecurity",
    description: "AI-powered security tools for SOC workflows, threat detection, and MITRE ATT&CK mapping.",
    icon: "ShieldCheck",
    toolCount: 1,
  },
  {
    slug: "llm-fine-tuning",
    name: "LLM Fine-Tuning",
    description: "LoRA, QLoRA, and PEFT-based fine-tuned language models trained on domain-specific datasets.",
    icon: "BrainCircuit",
    toolCount: 1,
  },
  {
    slug: "rag",
    name: "RAG Systems",
    description: "Retrieval-Augmented Generation pipelines, vector databases, and knowledge retrieval tooling.",
    icon: "Database",
    toolCount: 1,
  },
  {
    slug: "chrome-extensions",
    name: "Browser Extensions",
    description: "AI-powered Chrome extensions that bring intelligent assistance directly into the browser.",
    icon: "Chrome",
    toolCount: 1,
  },
  {
    slug: "open-source",
    name: "Open Source AI",
    description: "Fully open-source AI projects available on GitHub, PyPI, and HuggingFace.",
    icon: "Github",
    toolCount: 4,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
