import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "How Quantas uses affiliate links and how that relates to our editorial ratings.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <LegalLayout title="Affiliate Disclosure" updated="July 1, 2026">
      <p>
        In accordance with FTC guidelines concerning endorsements and testimonials, this page discloses that{" "}
        {siteConfig.name} may have a financial relationship with some of the companies mentioned on this Site.
      </p>

      <h2>How our affiliate links work</h2>
      <p>
        Some links on {siteConfig.name} are affiliate links. This means that if you click a link and sign up for or
        purchase a product or service, we may receive a commission from the company involved, at no additional cost
        to you.
      </p>

      <h2>How this affects our reviews</h2>
      <p>
        Our editorial team tests and rates products independently of any affiliate relationship. Commission
        potential does not determine which products we review, how we score them, or what we recommend. We have
        turned down affiliate partnerships for products we could not honestly recommend, and we have given negative
        reviews to products in active affiliate partnerships.
      </p>

      <h2>Why we use affiliate links</h2>
      <p>
        Affiliate commissions help fund the research, testing, and writing that goes into our reviews and
        comparisons, allowing us to keep the Site free for readers.
      </p>

      <h2>Sponsored content</h2>
      <p>
        Any sponsored content or paid placement will be clearly labeled as such at the top of the article. We do not
        accept payment in exchange for a specific rating or review score.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about a specific affiliate relationship or product mentioned on the Site, contact us
        at {siteConfig.email}.
      </p>
    </LegalLayout>
  );
}
