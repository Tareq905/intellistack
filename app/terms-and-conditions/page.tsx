import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions governing your use of the Quantas website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="July 1, 2026">
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of {siteConfig.url} (the
        &ldquo;Site&rdquo;), operated
        by {siteConfig.name}. By accessing or using the Site, you agree to be bound by these Terms.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the
        Site in any way that could damage, disable, or impair the Site, or interfere with any other party&apos;s use of
        it.
      </p>

      <h2>No professional advice</h2>
      <p>
        Content on the Site, including reviews, comparisons, and guides, is provided for general informational
        purposes only and does not constitute professional, legal, financial, or technical advice. You should
        conduct your own due diligence before purchasing or relying on any product or service discussed on the Site.
      </p>

      <h2>Affiliate relationships</h2>
      <p>
        {siteConfig.name} participates in affiliate marketing programs and may earn commissions from qualifying
        purchases made through links on the Site. This does not affect the price you pay. See our Affiliate
        Disclosure for details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on the Site, including text, graphics, logos, and design, is the property of {siteConfig.name}
        or its licensors and is protected by applicable intellectual property laws. You may not reproduce,
        distribute, or create derivative works from Site content without our prior written consent.
      </p>

      <h2>Third-party links</h2>
      <p>
        The Site contains links to third-party websites that are not owned or controlled by {siteConfig.name}. We
        are not responsible for the content, accuracy, or practices of any third-party site.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
        of any kind, either
        express or implied, including but not limited to implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages arising out of or related to your use of the Site.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may modify these Terms at any time. Continued use of the Site after changes are posted constitutes
        acceptance of the revised Terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which {siteConfig.name} is established, without
        regard to conflict-of-law principles.
      </p>

      <h2>Contact us</h2>
      <p>Questions about these Terms can be sent to {siteConfig.email}.</p>
    </LegalLayout>
  );
}
