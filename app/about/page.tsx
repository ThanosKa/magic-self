import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Magic Self — Free AI Resume to Website Builder",
  description:
    "Magic Self is a free, open-source tool that converts your PDF resume or LinkedIn export into a live personal website in seconds. Built by Thanos Kazakis.",
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  openGraph: {
    title: "About Magic Self — Free AI Resume to Website Builder",
    description:
      "Magic Self is a free, open-source tool that converts your PDF resume or LinkedIn export into a live personal website in seconds.",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Magic Self",
    description:
      "Magic Self is a free, open-source AI-powered tool that converts PDF resumes and LinkedIn exports into live personal portfolio websites.",
    url: `${SITE_CONFIG.url}/about`,
    author: {
      "@type": "Person",
      name: "Thanos Kazakis",
      url: "https://github.com/ThanosKa",
      sameAs: ["https://x.com/KazakisThanos", "https://github.com/ThanosKa"],
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Magic Self",
      url: SITE_CONFIG.url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      license: "https://www.apache.org/licenses/LICENSE-2.0",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
            <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
              ← magic-self.dev
            </Link>
            <Link
              href="/upload"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Create Your Website Free →
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            About Magic Self
          </h1>

          <section className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mt-10 mb-4">What is Magic Self?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Magic Self is a free, open-source web application that converts your PDF resume or
              LinkedIn profile export into a live, professionally designed personal website —
              in under two minutes, with no coding required.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your website is published at a custom URL (<code>magic-self.dev/yourname</code>)
              and is fully indexed by search engines, making it easy for recruiters and
              collaborators to find you by searching your name on Google.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">How It Works</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-foreground">1.</span>
                <span>Upload your PDF resume or LinkedIn export. Magic Self accepts any standard resume PDF up to 10 MB.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-foreground">2.</span>
                <span>Our AI (powered by GLM 4.5 Air via OpenRouter) extracts your experience, skills, education, and contact information from the PDF text automatically.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-foreground">3.</span>
                <span>Review and edit your generated website in a live preview editor. Every section is editable — name, title, experience, projects, skills, education, and contact details.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-foreground">4.</span>
                <span>Publish your site with one click. It goes live at magic-self.dev/yourname with full SEO optimization, Open Graph social cards, and structured data markup.</span>
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Magic Self is built with Next.js 16, React 19, TypeScript, Tailwind CSS, and
              Supabase for data storage. Authentication is handled by Clerk. The AI pipeline
              uses GLM 4.5 Air via OpenRouter for PDF-to-JSON extraction.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The project is fully open source under the Apache 2.0 license. You can view,
              fork, and self-host the entire codebase on{" "}
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                GitHub
              </a>.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Built By</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Magic Self was created by{" "}
              <a
                href="https://github.com/ThanosKa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                Thanos Kazakis
              </a>
              . It is maintained as an open-source project with contributions welcome from
              the community.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If Magic Self has been useful to you, consider{" "}
              <a
                href="https://github.com/ThanosKa/magic-self"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                starring the repository on GitHub
              </a>{" "}
              or{" "}
              <a
                href="https://www.buymeacoffee.com/thaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                buying a coffee
              </a>.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Privacy & Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your resume data is used exclusively to generate your personal website. We do
              not sell your data to third parties. You can delete your account and all
              associated data at any time from your account settings.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Magic Self complies with GDPR. When you delete your account, all your data —
              including uploaded PDFs, resume data, and your public profile — is permanently
              and irreversibly removed from our systems.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions, feedback, or support, reach out via{" "}
              <a
                href="mailto:kazakis.th@gmail.com"
                className="text-foreground underline"
              >
                kazakis.th@gmail.com
              </a>{" "}
              or open an issue on{" "}
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                GitHub
              </a>.
            </p>
          </section>

          <div className="mt-16 border rounded-xl p-8 bg-muted/30 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to create your resume website?</h2>
            <p className="text-muted-foreground mb-6">
              Free, no credit card required. Upload your PDF and your site is live in 2 minutes.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create Your Website Free →
            </Link>
          </div>
        </main>

        <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
          <p>
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" · "}
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            {" · "}
            <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
            {" · "}
            <a href="mailto:kazakis.th@gmail.com" className="hover:text-foreground">Contact</a>
          </p>
          <p className="mt-2">© 2025 Magic Self. Apache 2.0 License.</p>
        </footer>
      </div>
    </>
  );
}
