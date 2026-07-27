import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "How Quantas uses cookies and similar tracking technologies.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="July 1, 2026">
      <p>
        This Cookie Policy explains how {siteConfig.name} uses cookies and similar tracking technologies on{" "}
        {siteConfig.url} (the &ldquo;Site&rdquo;).
      </p>

      <h2>What are cookies</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They are widely used to make
        websites work more efficiently and to provide information to site owners.
      </p>

      <h2>Types of cookies we use</h2>
      <ul>
        <li>
          <strong>Essential cookies</strong> — required for core Site functionality, such as remembering your cookie
          consent preferences.
        </li>
        <li>
          <strong>Analytics cookies</strong> — help us understand how visitors interact with the Site, such as which
          pages are most popular.
        </li>
        <li>
          <strong>Affiliate tracking cookies</strong> — set by third-party affiliate networks to attribute referrals
          when you click an affiliate link.
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        Most web browsers allow you to control cookies through their settings. You can typically delete existing
        cookies, block cookies from being set, or receive a warning before a cookie is stored. Disabling cookies may
        affect the functionality of the Site.
      </p>

      <h2>Third-party cookies</h2>
      <p>
        Some cookies are placed by third-party services that appear on our pages, such as analytics providers and
        affiliate networks. We do not control these cookies — refer to the relevant third party&apos;s cookie policy for
        more information.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this Cookie Policy from time to time. Changes will be posted on this page.</p>

      <h2>Contact us</h2>
      <p>Questions about this Cookie Policy can be sent to {siteConfig.email}.</p>
    </LegalLayout>
  );
}
