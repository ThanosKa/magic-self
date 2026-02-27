import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Magic Self",
  description:
    "Magic Self privacy policy. We don't sell your data. Your resume information is used only to generate your personal website.",
  alternates: { canonical: `${SITE_CONFIG.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
            ← magic-self.dev
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 1, 2026</p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
            <p>
              Magic Self (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) operates the website{" "}
              <a href={SITE_CONFIG.url} className="text-foreground underline">
                magic-self.dev
              </a>
              . This Privacy Policy explains how we collect, use, and protect your personal
              information when you use Magic Self.
            </p>
            <p className="mt-3">
              We are committed to protecting your privacy. We do not sell, rent, or trade your
              personal data to third parties under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Data We Collect</h2>
            <p className="mb-3">When you use Magic Self, we collect the following information:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-foreground">Account information</strong> — your email
                address and name via Clerk authentication
              </li>
              <li>
                <strong className="text-foreground">Resume data</strong> — the PDF file you upload
                and the structured data extracted from it (name, contact details, work experience,
                education, skills)
              </li>
              <li>
                <strong className="text-foreground">Usage data</strong> — pages visited, features
                used, and interactions with the platform, collected via Vercel Analytics
              </li>
              <li>
                <strong className="text-foreground">Username</strong> — the URL slug you choose
                for your public profile
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">Your data is used exclusively to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Generate and host your personal website at magic-self.dev/yourname</li>
              <li>Allow you to edit and manage your website content</li>
              <li>Authenticate your identity and secure your account</li>
              <li>Improve the platform based on anonymous usage patterns</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-foreground">not</strong> use your resume data to train
              AI models, sell to recruiters, or share with any third party for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage & Security</h2>
            <p>
              Your data is stored in Supabase (PostgreSQL database) hosted on secure cloud
              infrastructure. Uploaded PDF files are stored in Supabase Storage with access
              controls. All data is transmitted over HTTPS. We use Clerk for authentication,
              which maintains SOC 2 Type 2 compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Public Profile</h2>
            <p>
              When you publish your website, your profile page at magic-self.dev/yourname becomes
              publicly accessible and indexed by search engines. Only content you explicitly
              publish is visible publicly. Drafts are private. You can unpublish your site at
              any time, which immediately removes it from public access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights (GDPR)</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-foreground">Access</strong> — view all data we hold about you
              </li>
              <li>
                <strong className="text-foreground">Correction</strong> — update your resume data
                at any time through the editor
              </li>
              <li>
                <strong className="text-foreground">Deletion</strong> — delete your account and all
                associated data permanently from the account settings page
              </li>
              <li>
                <strong className="text-foreground">Portability</strong> — your resume data is
                available to you in the editor at any time
              </li>
            </ul>
            <p className="mt-3">
              When you delete your account, all data — including your PDF file, extracted resume
              data, username, and public profile — is permanently and irreversibly deleted from
              our systems. This is handled automatically via our GDPR-compliant deletion webhook.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Third-Party Services</h2>
            <p className="mb-3">Magic Self uses the following third-party services:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-foreground">Clerk</strong> — authentication and user
                management
              </li>
              <li>
                <strong className="text-foreground">Supabase</strong> — database and file storage
              </li>
              <li>
                <strong className="text-foreground">OpenRouter / GLM 4.5 Air</strong> — AI parsing
                of your resume PDF (data is processed and not retained by the AI provider)
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> — hosting and analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
            <p>
              For privacy questions or data deletion requests, contact us at{" "}
              <a href="mailto:kazakis.th@gmail.com" className="text-foreground underline">
                kazakis.th@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" · "}
          <Link href="/about" className="hover:text-foreground">About</Link>
          {" · "}
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
        </p>
      </footer>
    </div>
  );
}
