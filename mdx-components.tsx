import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-display font-semibold text-ink-900" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-display font-semibold text-ink-900" {...props} />,
  p: (props) => <p className="mb-5 leading-relaxed text-ink-600" {...props} />,
  ul: (props) => <ul className="mb-5 list-disc space-y-2 pl-6 text-ink-600" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-ink-600" {...props} />,
  a: (props) => <a className="text-signal-600 underline underline-offset-2 hover:text-signal-700" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink-900" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-2 border-signal-500 pl-4 italic text-ink-500" {...props} />
  ),
};

// Required export name/signature for Next.js's automatic MDX component injection
// (e.g. app/**/*.mdx pages). Not a React hook despite the naming convention.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
