import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Zap } from "lucide-react";
import { audiences } from "@/lib/seo/audiences";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Portfolio Website Builder — For Every Professional | Magic Self",
  description:
    "Magic Self builds a professional portfolio website from your resume PDF in under 60 seconds — free for developers, designers, students, job seekers, engineers, and more.",
  alternates: {
    canonical: "/for",
  },
  openGraph: {
    title: "Free Portfolio Website Builder — For Every Professional | Magic Self",
    description:
      "Magic Self builds a professional portfolio website from your resume PDF in under 60 seconds — free for developers, designers, students, job seekers, engineers, and more.",
    url: `${SITE_CONFIG.url}/for`,
    type: "website",
    siteName: SITE_CONFIG.brandName,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Magic Self — Free Portfolio Website Builder for Every Professional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Portfolio Website Builder — For Every Professional | Magic Self",
    description:
      "Magic Self builds a professional portfolio website from your resume PDF in 60 seconds. Free for everyone.",
    site: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
};

// Icon map for each audience slug
const audienceEmoji: Record<string, string> = {
  developers: "💻",
  designers: "🎨",
  students: "🎓",
  "job-seekers": "🔍",
  engineers: "⚙️",
  "product-managers": "📊",
  marketers: "📣",
  "data-scientists": "📈",
  "ux-designers": "🖌️",
  freelancers: "🚀",
};

export default function ForHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Magic Self — Portfolio Builder for Every Professional",
    description:
      "Free portfolio website builder for developers, designers, students, job seekers, engineers, and more.",
    url: `${SITE_CONFIG.url}/for`,
    numberOfItems: audiences.length,
    itemListElement: audiences.map((audience, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: audience.headline,
      url: `${SITE_CONFIG.url}/for/${audience.slug}`,
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
              Create Free Website
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Built for Every Professional
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Free Portfolio Website Builder —<br className="hidden md:block" /> For Every Professional
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Whatever your profession, Magic Self turns your resume PDF into a live portfolio website at magic-self.dev/yourname in under 60 seconds. Free for everyone. No design skills needed.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Zap className="h-5 w-5" />
              Build My Website Free
            </Link>
          </div>
        </section>

        {/* Audience Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Find Your Professional Audience
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Click on your profession to see a tailored guide to building your portfolio website with Magic Self.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((audience) => (
                <Link
                  key={audience.slug}
                  href={`/for/${audience.slug}`}
                  className="group bg-card border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{audienceEmoji[audience.slug] ?? "🌟"}</span>
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {audience.displayName}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {audience.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              How Magic Self Works for Every Profession
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload Your Resume PDF",
                  desc: "Upload your existing resume or export your LinkedIn profile as a PDF. No special format required.",
                },
                {
                  step: "2",
                  title: "AI Extracts Everything",
                  desc: "Our AI reads your skills, experience, projects, and education — and builds your professional portfolio page automatically.",
                },
                {
                  step: "3",
                  title: "Share Your Live URL",
                  desc: "You get a permanent URL at magic-self.dev/yourname to share in job applications, LinkedIn, emails, and anywhere online.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Zap className="h-5 w-5" />
                Try It Free Now
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                No credit card. No design skills. Under 60 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <div className="py-8 border-t">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/examples" className="hover:text-foreground transition-colors">Portfolio Examples by Role</Link>
            <Link href="/vs/linkedin" className="hover:text-foreground transition-colors">vs LinkedIn</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </div>
    </>
  );
}
