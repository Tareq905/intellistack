export const siteConfig = {
  name: "NeuralForge",
  tagline: "Independent AI tool reviews and side-by-side comparisons.",
  description:
    "NeuralForge is your trusted platform for independent AI tool reviews. We test AI tools, compare them side-by-side, and publish honest reviews so you can confidently choose the right software for your workflow.",
  url: "https://www.neuralforge.io",
  ogImage: "/og/default.png",
  email: "hello@neuralforge.io",
  twitter: "@neuralforge",
  links: {
    twitter: "https://twitter.com/neuralforge",
    linkedin: "https://www.linkedin.com/in/md-tareq-shah-alam/",
    github: "https://github.com/Tareq905",
    huggingface: "https://huggingface.co/tareq052",
  },
  nav: [
    { label: "Tools", href: "/reviews" },
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
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "How We Review", href: "/how-we-review" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Tools", href: "/reviews" },
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
