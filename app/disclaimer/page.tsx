import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "General disclaimer covering the accuracy and use of content published on IntelliStack.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updated="July 1, 2026">
      <p>
        The information provided on {siteConfig.url} (the &ldquo;Site&rdquo;) is for general informational purposes
        only. All
        information is provided in good faith; however, we make no representation or warranty of any kind, express
        or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
        information on the Site.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on the Site constitutes legal, financial, tax, or professional advice. Software recommendations,
        ratings, and comparisons reflect our editorial team&apos;s independent testing and opinions at the time of
        publication, and may not reflect the current state of a product.
      </p>

      <h2>Product changes</h2>
      <p>
        Software products change frequently — pricing, features, and terms mentioned in our reviews may have changed
        since publication. Always confirm current details directly with the vendor before making a purchasing
        decision.
      </p>

      <h2>External links</h2>
      <p>
        The Site may contain links to external websites not provided or maintained by {siteConfig.name}. We do not
        guarantee the accuracy, relevance, timeliness, or completeness of any information on these external
        websites.
      </p>

      <h2>Errors and omissions</h2>
      <p>
        While we strive for accuracy, the Site may contain errors, inaccuracies, or omissions. We reserve the right
        to correct any errors and to update content at any time without prior notice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Under no circumstance shall {siteConfig.name} be liable for any loss or damage of any kind incurred as a
        result of the use of the Site or reliance on any information provided on the Site.
      </p>

      <h2>Contact us</h2>
      <p>Questions about this Disclaimer can be sent to {siteConfig.email}.</p>
    </LegalLayout>
  );
}
