import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Zap } from "lucide-react";
import { roles } from "@/lib/seo/roles";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Portfolio Website Examples by Job Role — Free Builder | Magic Self",
  description:
    "See portfolio examples for every job role — software engineer, product manager, UX designer, data scientist, and more. Build yours free in under 60 seconds from your resume.",
  alternates: {
    canonical: "/examples",
  },
  openGraph: {
    title: "Portfolio Website Examples by Job Role — Free Builder | Magic Self",
    description:
      "See portfolio examples for every job role and build yours free in under 60 seconds from your resume PDF.",
    url: `${SITE_CONFIG.url}/examples`,
    type: "website",
    siteName: SITE_CONFIG.brandName,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Portfolio Examples by Job Role — Magic Self",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Website Examples by Job Role | Magic Self",
    description:
      "Portfolio examples for every role — engineer, designer, PM, and more. Build yours free.",
    site: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
};

// Emoji icon map for roles
const roleEmoji: Record<string, string> = {
  "software-engineer": "💻",
  "product-manager": "📊",
  "ux-designer": "🖌️",
  "data-scientist": "📈",
  "frontend-developer": "🌐",
  "backend-developer": "⚙️",
  "full-stack-developer": "🔧",
  "marketing-manager": "📣",
  "graphic-designer": "🎨",
  "project-manager": "📋",
  "devops-engineer": "🛠️",
  "mobile-developer": "📱",
  "machine-learning-engineer": "🤖",
  "business-analyst": "📉",
  "content-writer": "✍️",
};

export default function ExamplesHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Website Examples by Job Role",
    description:
      "Portfolio website examples and guides for software engineers, designers, product managers, and 12 more roles.",
    url: `${SITE_CONFIG.url}/examples`,
    numberOfItems: roles.length,
    itemListElement: roles.map((role, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: role.headline,
      url: `${SITE_CONFIG.url}/examples/${role.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              ← {SITE_CONFIG.brandName}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Build My Portfolio Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Portfolio Examples & Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Portfolio Website Examples<br className="hidden md:block" /> by Job Role
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              See what a great portfolio looks like for your exact role — and build yours free from your resume PDF in under 60 seconds with Magic Self.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Zap className="h-5 w-5" />
              Build My Portfolio Free
            </Link>
          </div>
        </section>

        {/* Roles Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Choose Your Role
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Each guide explains exactly what to include in your portfolio, what skills to highlight, and how to get interviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/examples/${role.slug}`}
                  className="group bg-card border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{roleEmoji[role.slug] ?? "🌟"}</span>
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    View guide
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Magic Self */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why 10,000+ Professionals Use Magic Self
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
              {[
                {
                  emoji: "⚡",
                  title: "Under 60 Seconds",
                  desc: "Upload your resume PDF and your portfolio is live. No form-filling. No design work.",
                },
                {
                  emoji: "🎯",
                  title: "Role-Specific Layout",
                  desc: "Your skills, experience, and projects are presented in the format your industry expects.",
                },
                {
                  emoji: "🔗",
                  title: "Shareable Permanent URL",
                  desc: "magic-self.dev/yourname works in job applications, LinkedIn, GitHub, emails — everywhere.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-card border rounded-xl p-6">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Zap className="h-5 w-5" />
              Build My Free Portfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              100% free. No credit card. No coding.
            </p>
          </div>
        </section>

        {/* Related */}
        <div className="py-8 border-t">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/for" className="hover:text-foreground transition-colors">Portfolio Builder by Audience</Link>
            <Link href="/vs/linkedin" className="hover:text-foreground transition-colors">vs LinkedIn</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </div>
    </>
  );
}
