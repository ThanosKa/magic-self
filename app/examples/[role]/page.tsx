import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { getRole, getAllRoleSlugs } from "@/lib/seo/roles";
import { SITE_CONFIG } from "@/lib/config";

type Props = {
  params: Promise<{ role: string }>;
};

export async function generateStaticParams() {
  return getAllRoleSlugs().map((slug) => ({ role: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getRole(slug);

  if (!role) return {};

  const title = role.headline;
  const description = role.description;
  const canonicalUrl = `${SITE_CONFIG.url}/examples/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/examples/${slug}`,
    },
    keywords: role.keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: SITE_CONFIG.brandName,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${role.title} Portfolio Website Example — ${SITE_CONFIG.brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [SITE_CONFIG.ogImage],
    },
  };
}

export default async function RoleExamplePage({ params }: Props) {
  const { role: slug } = await params;
  const role = getRole(slug);

  if (!role) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: role.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: role.headline,
    description: role.description,
    url: `${SITE_CONFIG.url}/examples/${slug}`,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.url,
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              Portfolio Guide & Examples
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {role.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {role.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Zap className="h-5 w-5" />
                Build My {role.title} Portfolio Free
              </Link>
              <Link
                href="/examples"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-xl text-lg font-medium hover:bg-muted transition-colors"
              >
                More Examples
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free — built from your existing resume in under 60 seconds.
            </p>
          </div>
        </section>

        {/* Must-Have Sections */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              What Every {role.title} Portfolio Must Include
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              These are the sections that hiring managers and recruiters look for
              first.
            </p>
            <div className="space-y-6">
              {role.mustHaveSections.map((item, i) => (
                <div
                  key={i}
                  className="bg-card border rounded-xl p-6 flex gap-5 items-start"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {item.section}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Skills */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Key Skills to Showcase as a {role.title}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Recruiters scan your skills section first. Make sure these appear
              clearly on your portfolio.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {role.exampleSkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-background border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {role.title} Portfolio Tips That Get Interviews
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Advice from hiring managers and recruiters who review {role.title.toLowerCase()} portfolios every day.
            </p>
            <div className="space-y-4">
              {role.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-card border rounded-xl px-6 py-5"
                >
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Magic Self Helps */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              How Magic Self Builds Your {role.title} Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload Your Resume PDF",
                  desc: "Drop in your existing resume. Our AI reads every line — skills, experience, projects, education.",
                },
                {
                  step: "2",
                  title: "AI Formats Everything",
                  desc: "Your information is automatically organized into the sections hiring managers expect — no editing required.",
                },
                {
                  step: "3",
                  title: "Get Your Live URL",
                  desc: "Your portfolio is instantly live at magic-self.dev/yourname. Share it in applications, LinkedIn, and emails.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
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
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {role.faqs.map((faq, i) => (
                <div key={i} className="bg-card border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your {role.title} Portfolio Now
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Upload your resume and get a live portfolio at magic-self.dev/yourname — completely free, in under 60 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              <Zap className="h-5 w-5" />
              Create My Portfolio Free
            </Link>
            <p className="text-primary-foreground/60 text-sm mt-4">
              No account required to preview. No credit card ever.
            </p>
          </div>
        </section>

        {/* Bottom nav */}
        <div className="py-8 border-t">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link
              href="/examples"
              className="hover:text-foreground transition-colors"
            >
              All Portfolio Examples
            </Link>
            <Link
              href="/for"
              className="hover:text-foreground transition-colors"
            >
              Who We Help
            </Link>
            <Link
              href="/vs/linkedin"
              className="hover:text-foreground transition-colors"
            >
              vs LinkedIn
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
