export const siteConfig = {
  name: "IntelliStack",
  tagline: "AI projects built for real-world impact.",
  description:
    "IntelliStack is Tareq's portfolio of AI engineering projects — agentic systems, fine-tuned LLMs, RAG pipelines, and real-time AI tools built to solve real operational problems.",
  url: "https://www.intellistack.io",
  ogImage: "/og/default.png",
  email: "hello@intellistack.io",
  twitter: "@intellistack",
  links: {
    twitter: "https://twitter.com/intellistack",
    linkedin: "https://www.linkedin.com/in/md-tareq-shah-alam/",
    github: "https://github.com/Tareq905",
    huggingface: "https://huggingface.co/tareq052",
  },
  nav: [
    { label: "Projects", href: "/reviews" },
    { label: "Categories", href: "/categories" },
    { label: "Comparisons", href: "/comparisons" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
  ],
  footerLinks: {
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Newsletter", href: "/newsletter" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Projects", href: "/reviews" },
      { label: "Comparisons", href: "/comparisons" },
      { label: "Categories", href: "/categories" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
} as const;
