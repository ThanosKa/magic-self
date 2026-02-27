import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ArrowRight, Minus } from "lucide-react";
import { competitors } from "@/lib/vs/competitors";
import { SITE_CONFIG } from "@/lib/config";

type Props = {
  params: Promise<{ competitor: string }>;
};

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ competitor: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = competitors[slug];

  if (!competitor) return {};

  const title = `Magic Self vs ${competitor.name}: Which is Better? (2026)`;
  const description = buildDescription(competitor);
  const canonicalUrl = `${SITE_CONFIG.url}/vs/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/vs/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Magic Self",
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `Magic Self vs ${competitor.name} — honest feature comparison 2026`,
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

function buildDescription(competitor: (typeof competitors)[string]): string {
  const descriptions: Record<string, string> = {
    linkedin:
      "Magic Self vs LinkedIn: Magic Self gives you a Google-indexed personal website from your resume in 2 clicks, free. LinkedIn keeps your data locked in their platform.",
    "about-me":
      "Magic Self vs About.me: Magic Self auto-builds a full resume website from your PDF using AI — no manual entry. About.me requires you to type everything yourself.",
    carrd:
      "Magic Self vs Carrd: Magic Self parses your resume PDF with AI and creates a live website in under 2 minutes, free. Carrd needs manual setup and design skills.",
    "read-cv":
      "Magic Self vs Read.cv: Magic Self uses AI to auto-parse your resume PDF into a live SEO-indexed website instantly. Read.cv requires manual entry with no AI assistance.",
    notion:
      "Magic Self vs Notion Portfolio: Magic Self creates a professional, SEO-optimized personal website from your PDF resume in 2 clicks. Notion pages have poor SEO and slow load times.",
  };
  return descriptions[competitor.slug] ?? `Magic Self vs ${competitor.name}: honest feature comparison for 2026.`;
}

const featureRows = [
  {
    feature: "Price",
    magicSelf: "Free (forever)",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "Free basic / $29.99/mo premium",
        "about-me": "Free basic / $6.99/mo pro",
        carrd: "Free (limited) / $9/yr pro",
        "read-cv": "Free",
        notion: "Free with account",
      };
      return map[slug] ?? "Varies";
    },
    magicSelfWins: true,
  },
  {
    feature: "AI Resume Parsing",
    magicSelf: "Yes — upload PDF, AI extracts everything",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "No — manual entry only",
        "about-me": "No — manual entry only",
        carrd: "No — manual entry only",
        "read-cv": "No — manual entry only",
        notion: "No — manual entry only",
      };
      return map[slug] ?? "No";
    },
    magicSelfWins: true,
  },
  {
    feature: "Setup Time",
    magicSelf: "Under 2 minutes",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "30–60 minutes",
        "about-me": "15–30 minutes",
        carrd: "1–3 hours",
        "read-cv": "30–60 minutes",
        notion: "1–2 hours",
      };
      return map[slug] ?? "Manual";
    },
    magicSelfWins: true,
  },
  {
    feature: "Custom URL",
    magicSelf: "magic-self.dev/yourname",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "linkedin.com/in/yourname",
        "about-me": "about.me/yourname (free)",
        carrd: "yourname.carrd.co (free) / custom domain (paid)",
        "read-cv": "read.cv/yourname",
        notion: "notion.so/yourname (long, random)",
      };
      return map[slug] ?? "Platform URL";
    },
    magicSelfWins: true,
  },
  {
    feature: "SEO Optimization",
    magicSelf: "Full — Person JSON-LD, OG tags, indexed by Google",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "Partial — LinkedIn controls indexing",
        "about-me": "Minimal — basic meta tags only",
        carrd: "Basic — no structured data",
        "read-cv": "Minimal — limited indexing",
        notion: "Poor — noindex by default, slow TTI",
      };
      return map[slug] ?? "Limited";
    },
    magicSelfWins: true,
  },
  {
    feature: "Design Customization",
    magicSelf: "Yes — edit all sections",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "No — fixed LinkedIn template",
        "about-me": "Limited on free tier",
        carrd: "Yes — but requires manual design work",
        "read-cv": "Minimal — fixed minimal template",
        notion: "Block-based — not portfolio-optimized",
      };
      return map[slug] ?? "Limited";
    },
    magicSelfWins: false,
  },
  {
    feature: "Open Source",
    magicSelf: "Yes (Apache 2.0)",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "No — proprietary",
        "about-me": "No — proprietary",
        carrd: "No — proprietary",
        "read-cv": "No — proprietary",
        notion: "No — proprietary",
      };
      return map[slug] ?? "No";
    },
    magicSelfWins: true,
  },
  {
    feature: "Requires Coding",
    magicSelf: "No",
    getValue: (slug: string) => {
      const map: Record<string, string> = {
        linkedin: "No",
        "about-me": "No",
        carrd: "No (but design skills help)",
        "read-cv": "No",
        notion: "No (but markdown helps)",
      };
      return map[slug] ?? "No";
    },
    magicSelfWins: false,
  },
];

const faqsByCompetitor: Record<
  string,
  { question: string; answer: string }[]
> = {
  linkedin: [
    {
      question: "Can I use Magic Self alongside my LinkedIn profile?",
      answer:
        "Absolutely. Magic Self and LinkedIn serve different purposes. Use LinkedIn for networking and job applications. Use your magic-self.dev website as your personal brand hub — a Google-indexed page you fully own, share in your email signature, and link from LinkedIn itself.",
    },
    {
      question: "Does Magic Self replace LinkedIn?",
      answer:
        "No. Magic Self creates a personal website from your resume data. LinkedIn is a social network for professional connections. Most users run both: LinkedIn for networking, Magic Self for their personal Google-searchable web presence.",
    },
    {
      question: "Why doesn't my LinkedIn profile rank on Google for my name?",
      answer:
        "LinkedIn controls its own SEO and often de-prioritises individual profile pages in favour of its own search. Your magic-self.dev/yourname page is a standalone, fully indexed web page with Person JSON-LD schema, giving you a much better chance of appearing when someone Googles your name.",
    },
    {
      question: "How do I import my LinkedIn data into Magic Self?",
      answer:
        "Go to your LinkedIn profile, click 'More' then 'Save to PDF'. Upload that PDF to Magic Self. Our AI parses all your experience, education, and skills automatically — you'll have a live website in under 2 minutes.",
    },
  ],
  "about-me": [
    {
      question: "What does Magic Self do that About.me doesn't?",
      answer:
        "Magic Self auto-generates your entire website from a PDF resume using AI — no typing required. About.me requires you to manually enter every piece of information. Magic Self also provides full SEO optimisation with Person JSON-LD schema, while About.me offers only basic meta tags.",
    },
    {
      question: "Is Magic Self free like About.me?",
      answer:
        "Yes. Magic Self is 100% free with no credit card required, forever. It is also open source under the Apache 2.0 licence. About.me's free tier has visible platform branding and very limited customisation.",
    },
    {
      question: "Can Magic Self aggregate my social links like About.me does?",
      answer:
        "Yes. Magic Self includes your professional links (GitHub, LinkedIn, portfolio, etc.) parsed directly from your resume PDF, plus any links you add manually. Your full profile is displayed on a clean, professional page.",
    },
    {
      question: "Will Google find my Magic Self page better than my About.me page?",
      answer:
        "Yes. Magic Self pages are built with Person JSON-LD structured data, proper meta tags, and open graph tags. This gives them strong SEO signals out of the box. About.me's free tier is not optimised for personal name searches.",
    },
  ],
  carrd: [
    {
      question: "How is Magic Self different from Carrd for a portfolio?",
      answer:
        "Carrd is a general-purpose page builder — you design and type everything yourself. Magic Self is purpose-built for career portfolios. Upload your resume PDF and AI fills in your work history, skills, education, and projects automatically. No design decisions required.",
    },
    {
      question: "Is Magic Self cheaper than Carrd Pro?",
      answer:
        "Magic Self is completely free — not $9/year, not $9/month. Free forever with no feature restrictions on the core resume website. Carrd's free tier is limited to 3 sites with no custom domain and basic functionality.",
    },
    {
      question: "Does Magic Self support custom domains like Carrd?",
      answer:
        "Magic Self currently provides a free branded URL at magic-self.dev/yourname. Custom domain support is on the roadmap. For most job seekers and professionals, the branded URL is perfectly sufficient for sharing and SEO purposes.",
    },
    {
      question: "Can I build a one-page site with Magic Self like Carrd?",
      answer:
        "Yes. Magic Self creates a clean, single-page portfolio website showcasing your experience, skills, education, and projects — all on one scrollable page with a professional layout, without any manual design work.",
    },
  ],
  "read-cv": [
    {
      question: "How does Magic Self compare to Read.cv for developers?",
      answer:
        "Both offer a clean, minimal personal portfolio page. The key difference is how you get there: Read.cv requires manual data entry for every field. Magic Self uses AI to parse your resume PDF and populate everything in under 2 minutes. Magic Self also provides better SEO with structured data.",
    },
    {
      question: "Is Magic Self open source like some Read.cv alternatives?",
      answer:
        "Yes. Magic Self is fully open source under the Apache 2.0 licence on GitHub. You can inspect the code, self-host, or contribute. Read.cv is a proprietary closed-source platform.",
    },
    {
      question: "Does Magic Self have a community like Read.cv?",
      answer:
        "Magic Self focuses on giving you a personal, SEO-indexed website rather than an internal platform community. Your magic-self.dev/yourname page is discoverable via Google search, which has broader reach than platform-internal discovery.",
    },
    {
      question: "Can I switch from Read.cv to Magic Self?",
      answer:
        "Yes, easily. Export your LinkedIn profile as a PDF or use your existing resume PDF and upload it to Magic Self. Your full portfolio website is ready in under 2 minutes. No manual copy-pasting from your Read.cv profile required.",
    },
  ],
  notion: [
    {
      question: "Why is a Magic Self page better for SEO than a Notion page?",
      answer:
        "Notion public pages have several SEO disadvantages: they often have slow Time-to-Interactive scores, Notion controls their indexing behaviour, and they lack structured data like JSON-LD. Magic Self pages are purpose-built for SEO with Person schema, open graph tags, and fast load times on a custom subdomain.",
    },
    {
      question: "Is Magic Self easier to set up than a Notion portfolio?",
      answer:
        "Yes, significantly. A Notion portfolio still requires you to design a layout, type all your information, and configure sharing settings. Magic Self needs just your resume PDF — AI does the rest in under 2 minutes.",
    },
    {
      question: "Can recruiters find my Magic Self page on Google?",
      answer:
        "Yes. Magic Self pages are indexed by Google and include Person JSON-LD schema, which can produce rich results in search. Notion pages are often slow to index and may not appear for your name searches due to Notion's SEO limitations.",
    },
    {
      question: "Does Magic Self look more professional than a Notion page?",
      answer:
        "Magic Self generates a purpose-designed career portfolio with consistent typography, structured sections for experience, education, and skills, and a professional URL. Notion pages are generic document layouts not designed for personal branding.",
    },
  ],
};

const whoShouldUseMagicSelf: Record<string, string[]> = {
  linkedin: [
    "Professionals who want a Google-searchable personal page they fully own",
    "Job seekers who want to share a clean URL in their email signature",
    "People whose name doesn't rank on Google for personal searches",
    "Anyone who wants to build their personal brand beyond LinkedIn's walled garden",
  ],
  "about-me": [
    "Professionals who want a full career portfolio, not just a link page",
    "Anyone who doesn't want to type their entire work history manually",
    "People who want their personal page to rank on Google",
    "Job seekers who need a professional-looking website in minutes, not hours",
  ],
  carrd: [
    "Job seekers who want a career-specific portfolio without design skills",
    "Professionals who want AI to handle content extraction from their resume",
    "Anyone who wants a fully free, open-source alternative with no yearly fees",
    "People who need structured career data (experience, skills, education) automatically organised",
  ],
  "read-cv": [
    "Professionals who want their portfolio live in under 2 minutes, not 30",
    "Anyone who values SEO and wants to be found on Google by their name",
    "People who prefer open-source tools over proprietary platforms",
    "Job seekers who want AI to handle all content parsing automatically",
  ],
  notion: [
    "Professionals who want a fast, SEO-optimised personal website",
    "Anyone who wants to appear in Google search results for their own name",
    "People who want a purpose-designed career portfolio, not a repurposed document",
    "Job seekers who need a shareable URL that looks credible to recruiters",
  ],
};

const whoShouldUseCompetitor: Record<string, string[]> = {
  linkedin: [
    "Professionals actively networking in their industry",
    "Job seekers applying through LinkedIn's built-in job board",
    "People who want recruiter InMail and connection features",
  ],
  "about-me": [
    "Creators who need a simple link aggregation page for social bios",
    "People who already have all their content written and just want links in one place",
    "Those who specifically want about.me's existing community directory",
  ],
  carrd: [
    "Developers or designers who want complete creative control over layout",
    "People building non-portfolio pages (event sites, waitlists, landing pages)",
    "Those who need a custom domain immediately and are willing to pay $9/year",
  ],
  "read-cv": [
    "Designers and creatives who want Read.cv's specific aesthetic",
    "People who are part of the Read.cv creative community and want internal discovery",
    "Those who prefer typing their information manually for precise control",
  ],
  notion: [
    "Teams or individuals already deep in the Notion ecosystem who want a quick internal reference page",
    "People who want rich document-style content with embeds, tables, and callouts",
    "Anyone who doesn't need their page to rank on Google",
  ],
};

const whySwitchReasons: Record<string, string[]> = {
  linkedin: [
    "LinkedIn controls your visibility — their algorithm decides who sees your profile. magic-self.dev/yourname is yours.",
    "LinkedIn profiles rarely rank on Google for personal name searches. Magic Self pages do.",
    "LinkedIn has no custom design. Magic Self gives you a tailored personal website.",
    "Your LinkedIn profile disappears if you ever close your account. Your Magic Self page is your data.",
  ],
  "about-me": [
    "About.me requires you to manually enter your entire career history. Magic Self reads your PDF in seconds.",
    "About.me's free tier shows platform branding. Magic Self is clean and yours.",
    "About.me pages have minimal SEO. Magic Self pages include full Person JSON-LD schema for Google.",
    "About.me is a link page, not a career portfolio. Magic Self builds a full professional website.",
  ],
  carrd: [
    "Carrd requires design skills and hours of manual work. Magic Self uses AI to build your site from your PDF.",
    "Carrd is a blank canvas — you have to write all your career content yourself. Magic Self auto-extracts it.",
    "Magic Self is free forever, no yearly subscription. Carrd charges $9/year for basic pro features.",
    "Magic Self is open source — you can audit the code. Carrd is fully closed-source.",
  ],
  "read-cv": [
    "Read.cv requires manually entering every job, skill, and project. Magic Self parses your PDF automatically.",
    "Read.cv has limited SEO. Magic Self generates structured JSON-LD data that Google indexes directly.",
    "Read.cv is a closed platform. Magic Self is open source under Apache 2.0.",
    "Magic Self takes 2 minutes to go live. Read.cv requires careful manual data entry for a similar result.",
  ],
  notion: [
    "Notion pages are slow — poor Core Web Vitals hurt your professional credibility. Magic Self is built for performance.",
    "Notion pages often aren't indexed by Google. Magic Self pages are purpose-built for search visibility.",
    "A Notion page looks like a document. Magic Self generates a professional career portfolio.",
    "Setting up a Notion portfolio takes 1–2 hours of design work. Magic Self takes 2 minutes.",
  ],
};

function FeatureValue({ value, wins }: { value: string; wins: boolean | null }) {
  if (wins === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
        <Check className="h-4 w-4 shrink-0" />
        {value}
      </span>
    );
  }
  if (wins === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
        <X className="h-4 w-4 shrink-0" />
        {value}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Minus className="h-4 w-4 shrink-0" />
      {value}
    </span>
  );
}

export default async function CompetitorPage({ params }: Props) {
  const { competitor: slug } = await params;
  const competitor = competitors[slug];

  if (!competitor) notFound();

  const faqs = faqsByCompetitor[slug] ?? [];
  const magicSelfBullets = whoShouldUseMagicSelf[slug] ?? [];
  const competitorBullets = whoShouldUseCompetitor[slug] ?? [];
  const switchReasons = whySwitchReasons[slug] ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const tldrMap: Record<string, string> = {
    linkedin:
      "LinkedIn is the world's biggest professional network, but it locks your profile inside its platform. Magic Self gives you a standalone personal website at magic-self.dev/yourname that you fully own, that Google indexes under your name, and that costs nothing. Most professionals use both: LinkedIn for networking, Magic Self for their personal web presence.",
    "about-me":
      "About.me lets you build a simple link page manually. Magic Self uses AI to read your resume PDF and generate a full career portfolio website automatically — no typing required, better SEO, completely free, and open source.",
    carrd:
      "Carrd is a flexible blank-canvas page builder that requires design skill and manual content entry. Magic Self is purpose-built for career portfolios: upload your PDF, AI extracts your experience in seconds, and your live website is ready in under 2 minutes — for free.",
    "read-cv":
      "Read.cv is a beautifully minimal portfolio platform, but every field must be entered by hand. Magic Self parses your resume PDF with AI, builds your full career site automatically, and gives it stronger SEO with Person JSON-LD schema — in a fraction of the time.",
    notion:
      "Notion public pages work as a quick personal page for Notion users, but they load slowly, index poorly on Google, and look like documents rather than professional portfolios. Magic Self creates a purpose-designed, SEO-optimised personal website from your PDF resume in under 2 minutes.",
  };

  const tldr = tldrMap[slug] ?? `Magic Self vs ${competitor.name} comparison.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <Link
              href="/vs"
              className="hover:text-foreground transition-colors"
            >
              Comparisons
            </Link>
            <span>/</span>
            <span className="text-foreground">
              Magic Self vs {competitor.name}
            </span>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Magic Self vs {competitor.name}: Honest Comparison (2026)
          </h1>

          {/* TL;DR box */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              TL;DR
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              {tldr}
            </p>
          </div>

          {/* Feature comparison table */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-[200px]">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">
                      Magic Self
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                      {competitor.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, i) => {
                    const competitorValue = row.getValue(slug);
                    const competitorWins =
                      !row.magicSelfWins &&
                      row.feature !== "Requires Coding" &&
                      row.feature !== "Design Customization"
                        ? true
                        : null;

                    return (
                      <tr
                        key={row.feature}
                        className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                      >
                        <td className="px-4 py-3.5 font-medium text-foreground align-top">
                          {row.feature}
                        </td>
                        <td className="px-4 py-3.5 align-top">
                          <FeatureValue
                            value={row.magicSelf}
                            wins={row.magicSelfWins ? true : null}
                          />
                        </td>
                        <td className="px-4 py-3.5 align-top">
                          <FeatureValue
                            value={competitorValue}
                            wins={
                              row.magicSelfWins
                                ? false
                                : competitorWins
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who should use Magic Self */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Who Should Use Magic Self
            </h2>
            <ul className="space-y-3">
              {magicSelfBullets.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-base text-foreground leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who should use the competitor — being honest */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Who Should Use {competitor.name}
            </h2>
            <ul className="space-y-3">
              {competitorBullets.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-base text-foreground leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Learn more at{" "}
              <a
                href={competitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                {competitor.url.replace("https://", "")}
              </a>
            </p>
          </section>

          {/* Why people switch */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why People Switch from {competitor.name} to Magic Self
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {switchReasons.map((reason, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-background p-5 flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Create Your Free Resume Website
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Upload your PDF resume or LinkedIn export. AI extracts your
              experience in seconds. Your live personal website at
              magic-self.dev/yourname is ready in under 2 minutes. 100% free,
              no credit card, open source.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Free forever · No credit card · Apache 2.0 open source
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-background p-6"
                >
                  <h3 className="text-base md:text-lg font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom nav */}
          <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/vs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← See all comparisons
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              Create your website now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
