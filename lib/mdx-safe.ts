/**
 * Escapes characters in raw DB-stored blog content that MDX would otherwise
 * misinterpret as JSX/HTML/expressions (<, >, {, }).
 *
 * This is a BLANKET escape — it assumes your DB content is plain markdown
 * text only, never real JSX components. If a specific post genuinely needs
 * an embedded component (e.g. <NewsletterSignup />), this function will
 * break it (it'll render as literal text instead of the component).
 *
 * If/when you need that, don't call this for that post — instead lean on
 * the try/catch fallback in the page and fix that post's content by hand.
 */
export function escapeMdxSpecialChars(raw: string): string {
  if (!raw) return raw;
  return raw
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}