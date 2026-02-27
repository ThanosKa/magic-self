import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { competitors } from "@/lib/vs/competitors";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Magic Self Comparisons — vs LinkedIn, Carrd, About.me & More (2026)",
  description:
    "See how Magic Self compares to LinkedIn, About.me, Carrd, Read.cv, and Notion for building a professional personal website from your resume.",
  alternates: {
    canonical: "/vs",
  },
  openGraph: {
    title:
      "Magic Self Comparisons — vs LinkedIn, Carrd, About.me & More (2026)",
    description:
      "See how Magic Self compares to LinkedIn, About.me, Carrd, Read.cv, and Notion for building a professional personal website from your resume.",
    url: `${SITE_CONFIG.url}/vs`,
    type: "website",
    siteName: "Magic Self",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Magic Self — compare with alternatives 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Magic Self Comparisons — vs LinkedIn, Carrd, About.me & More (2026)",
    description:
      "See how Magic Self compares to LinkedIn, About.me, Carrd, Read.cv, and Notion for building a professional personal website from your resume.",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
};

const taglineBySlug: Record<string, string> = {
  linkedin:
    "LinkedIn locks your profile inside its platform. Magic Self gives you a page you own.",
  "about-me":
    "About.me requires manual entry. Magic Self uses AI to build your site from a PDF.",
  carrd:
    "Carrd needs design skills and hours. Magic Self takes 2 minutes with no design work.",
  "read-cv":
    "Read.cv is beautiful but manual. Magic Self auto-parses your resume with AI.",
  notion:
    "Notion pages load slowly and rank poorly. Magic Self is fast and SEO-optimised.",
};

const badgeBySlug: Record<string, string> = {
  linkedin: "Most searched",
  "about-me": "Link pages",
  carrd: "Page builders",
  "read-cv": "Portfolios",
  notion: "Doc-based sites",
};

const magicSelfHighlights = [
  "100% free — no credit card, no subscription",
  "AI parses your PDF resume in seconds",
  "Live website at magic-self.dev/yourname",
  "Person JSON-LD schema for Google search",
  "Open source under Apache 2.0",
  "2-click setup — under 2 minutes",
];

export default function VsHubPage() {
  const competitorList = Object.values(competitors);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link
            href="/"
            className="font-bold text-lg hover:opacity-80 transition-opacity"
          >
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

      <main className="container mx-auto px-4 max-w-4xl py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Comparisons</span>
        </nav>

        {/* Hero */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Magic Self vs the Alternatives
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Honest, detailed comparisons between Magic Self and other tools for
            building a professional personal website from your resume.
          </p>
        </div>

        {/* Magic Self highlights strip */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            What makes Magic Self different
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {magicSelfHighlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison cards */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            All Comparisons
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {competitorList.map((competitor) => (
              <Link
                key={competitor.slug}
                href={`/vs/${competitor.slug}`}
                className="group rounded-2xl border bg-background p-6 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    Magic Self vs {competitor.name}
                  </h3>
                  {badgeBySlug[competitor.slug] && (
                    <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {badgeBySlug[competitor.slug]}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {taglineBySlug[competitor.slug] ?? competitor.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read comparison
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Summary table */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Quick Look: Key Differences
          </h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    Tool
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    AI Parsing
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    SEO
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    Open Source
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-primary/5">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Magic Self
                  </td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400 font-medium">
                    Free
                  </td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Yes
                  </td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Full JSON-LD
                  </td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Apache 2.0
                  </td>
                </tr>
                {competitorList.map((competitor, i) => (
                  <tr
                    key={competitor.slug}
                    className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/vs/${competitor.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {competitor.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {competitor.pricing}
                    </td>
                    <td className="px-4 py-3 text-red-500 dark:text-red-400">
                      No
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {competitor.slug === "linkedin"
                        ? "Partial"
                        : competitor.slug === "notion"
                          ? "Poor"
                          : "Basic"}
                    </td>
                    <td className="px-4 py-3 text-red-500 dark:text-red-400">
                      No
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to try Magic Self?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Upload your resume PDF and get a live personal website at
            magic-self.dev/yourname in under 2 minutes. No credit card.
            No manual typing. 100% free.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Create Your Free Website
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Free forever · No credit card · Apache 2.0 open source
          </p>
        </section>
      </main>
    </div>
  );
}
