import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Zap, Users, Star } from "lucide-react";
import { getAudience, getAllAudienceSlugs } from "@/lib/seo/audiences";
import { SITE_CONFIG } from "@/lib/config";

type Props = {
  params: Promise<{ audience: string }>;
};

export async function generateStaticParams() {
  return getAllAudienceSlugs().map((slug) => ({ audience: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { audience: slug } = await params;
  const audience = getAudience(slug);

  if (!audience) return {};

  const title = audience.headline;
  const description = audience.description;
  const canonicalUrl = `${SITE_CONFIG.url}/for/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/for/${slug}`,
    },
    keywords: audience.keywords,
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
          alt: `${SITE_CONFIG.brandName} for ${audience.displayName}`,
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

export default async function AudiencePage({ params }: Props) {
  const { audience: slug } = await params;
  const audience = getAudience(slug);

  if (!audience) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: audience.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: audience.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
              ← {SITE_CONFIG.brandName}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Create Your Website Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Free for {audience.displayName}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {audience.headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {audience.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Zap className="h-5 w-5" />
                Build My Website Free
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-xl text-lg font-medium hover:bg-muted transition-colors"
              >
                Read the Blog
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card. No design skills. Live in under 60 seconds.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Why {audience.displayName} Choose Magic Self
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Everything you need to launch a professional online presence — without the work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audience.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              How It Works in 3 Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload Your Resume",
                  desc: "Upload your existing PDF resume or LinkedIn export. Our AI reads it instantly.",
                },
                {
                  step: "2",
                  title: "AI Builds Your Site",
                  desc: "Magic Self extracts your experience, skills, and projects and lays them out beautifully.",
                },
                {
                  step: "3",
                  title: "Share Your URL",
                  desc: "Your portfolio is live at magic-self.dev/yourname. Share it everywhere.",
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

        {/* Use Cases */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              How {audience.displayName} Use Magic Self
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Real ways {audience.displayName.toLowerCase()} are putting their portfolio to work.
            </p>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {audience.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-3 bg-card border rounded-lg px-5 py-4">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Social Proof / Testimonial Context */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-4" />
            <blockquote className="text-xl text-foreground font-medium leading-relaxed italic mb-4">
              &ldquo;{audience.testimonialContext}&rdquo;
            </blockquote>
            <p className="text-sm text-muted-foreground">— A {audience.displayName.slice(0, -1)} using Magic Self</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {audience.faqs.map((faq, i) => (
                <div key={i} className="bg-card border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Launch Your Portfolio?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of {audience.displayName.toLowerCase()} who built their professional website in under 60 seconds — completely free.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              <Zap className="h-5 w-5" />
              Build My Free Portfolio Now
            </Link>
            <p className="text-primary-foreground/60 text-sm mt-4">
              No credit card required. No design skills needed.
            </p>
          </div>
        </section>

        {/* Footer nav */}
        <div className="py-8 border-t">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/for" className="hover:text-foreground transition-colors">All Audiences</Link>
            <Link href="/examples" className="hover:text-foreground transition-colors">Portfolio Examples</Link>
            <Link href="/vs/linkedin" className="hover:text-foreground transition-colors">vs LinkedIn</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </div>
    </>
  );
}
