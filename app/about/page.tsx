import { buildMetadata } from "@/lib/seo";
import { authors } from "@/lib/data/authors";
import { CTASection } from "@/components/affiliate/CTASection";

export const metadata = buildMetadata({
  title: "About NeuralForge",
  description: "NeuralForge is an independent publication reviewing AI tools, SaaS, and automation software.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">About us</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 dark:text-ink-50">
          AI projects built for real-world impact
        </h1>
        <p className="mt-4 text-ink-500 dark:text-ink-400">
          I&apos;m Tareq — an AI engineer who builds agentic systems, fine-tuned LLMs, RAG pipelines, and
          real-time AI tools. Every project here solves a real operational problem.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
        <PillarCard
          title="Built on real problems"
          body="Every project starts from a genuine workflow pain point — not a hackathon idea. I build tools I'd want to use myself."
        />
        <PillarCard
          title="Open and inspectable"
          body="All projects are published on GitHub, PyPI, or HuggingFace. You can read the code, fork it, and build on top of it."
        />
        <PillarCard
          title="Production-minded"
          body="From QLoRA fine-tuning to real-time Chrome extensions, every project is engineered to run reliably outside of notebooks."
        />
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Editorial team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {Object.entries(authors).map(([key, author]) => (
            <div key={key} className="card p-6 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-ink-100 dark:bg-ink-700" />
              <p className="mt-4 font-display font-semibold text-ink-900 dark:text-ink-50">{author.name}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400">{author.role}</p>
              <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{author.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <CTASection
          eyebrow="Let&apos;s connect"
          title="Interested in collaborating?"
          description="Whether it&apos;s a project idea, research collaboration, or just a question — I&apos;m always happy to chat about AI engineering."
          primaryHref="/contact"
          primaryLabel="Get in touch"
          secondaryHref="/reviews"
          secondaryLabel="See all projects"
        />
      </div>
    </div>
  );
}

function PillarCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-6">
      <h3 className="font-display font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{body}</p>
    </div>
  );
}
