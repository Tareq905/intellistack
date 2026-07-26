import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How IntelliStack collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 1, 2026">
      <p>
        This Privacy Policy explains how {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        collects, uses, and discloses information about visitors to {siteConfig.url} (the &ldquo;Site&rdquo;). By
        using the Site, you agree to the collection
        and use of information in accordance with this policy.
      </p>

      <h2>Information we collect</h2>
      <p>We collect information in the following ways:</p>
      <ul>
        <li>
          <strong>Information you provide directly</strong>, such as your name and email address when you subscribe
          to our newsletter or submit a contact form.
        </li>
        <li>
          <strong>Automatically collected information</strong>, including IP address, browser type, device
          information, pages visited, and referring URLs, collected via cookies and similar technologies.
        </li>
        <li>
          <strong>Analytics data</strong> from services such as Google Analytics, which help us understand how
          visitors use the Site.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Operate, maintain, and improve the Site</li>
        <li>Send newsletters and respond to inquiries you submit</li>
        <li>Understand aggregate usage patterns and improve content</li>
        <li>Detect, prevent, and address technical issues or abuse</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Affiliate links and third parties</h2>
      <p>
        The Site contains affiliate links to third-party products and services. When you click an affiliate link and
        make a purchase, the third party may collect information about that transaction independently of us. We do
        not control, and are not responsible for, the privacy practices of third-party sites. See our Affiliate
        Disclosure for more detail.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to operate the Site and analyze usage. You can control
        cookies through your browser settings; disabling cookies may affect Site functionality. See our Cookie
        Policy for details.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain personal information for as long as necessary to fulfill the purposes described in this policy,
        unless a longer retention period is required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct, delete, or port your personal
        information, or to object to or restrict certain processing. To exercise these rights, contact us at{" "}
        {siteConfig.email}.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        The Site is not directed to children under 13, and we do not knowingly collect personal information from
        children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the updated version on this page with a
        revised &ldquo;Last updated&rdquo; date.
      </p>

      <h2>Contact us</h2>
      <p>If you have questions about this Privacy Policy, contact us at {siteConfig.email}.</p>
    </LegalLayout>
  );
}
