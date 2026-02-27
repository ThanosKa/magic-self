import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ScrollHeader } from "@/components/landing/scroll-header";
import { Hero1 } from "@/components/landing/hero";
import { SITE_CONFIG } from "@/lib/config";

const Features = dynamic(
  () =>
    import("@/components/landing/features").then((mod) => ({
      default: mod.Features,
    })),
  {
    loading: () => <div className="py-20 md:py-32 bg-muted/30" />,
  }
);

const FAQ = dynamic(
  () =>
    import("@/components/landing/faq").then((mod) => ({ default: mod.FAQ })),
  {
    loading: () => <div className="py-20 md:py-32" />,
  }
);

const Footer = dynamic(
  () =>
    import("@/components/landing/footer").then((mod) => ({
      default: mod.Footer,
    })),
  {
    loading: () => <div className="border-t" />,
  }
);

export const metadata: Metadata = {
  title: "AI-Powered Resume to Website Builder",
  description:
    "Transform your resume PDF into a stunning personal website in seconds. AI-powered extraction, custom URLs, beautiful templates. Free & open source.",
  keywords: [
    ...SITE_CONFIG.keywords,
    "free resume builder",
    "resume to portfolio",
    "instant website builder",
  ],
  openGraph: {
    title: `${SITE_CONFIG.tagline} - ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "magic-self.dev - LinkedIn to Website in one click",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { userId } = await auth();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Magic Self really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the core features are 100% free and open source under the Apache 2.0 license. You can create your resume website and share it without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "How does the PDF import work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magic Self uses advanced AI parsing technology to read the structure of your LinkedIn PDF export or standard resume PDF. The AI then maps this data to your website automatically — no manual data entry required.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the design of my resume website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. You can customize colors, fonts, and layout options to match your personal brand. You can also edit all content directly through the built-in editor.",
        },
      },
      {
        "@type": "Question",
        name: "Is my resume data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your privacy is our top priority. We do not sell your data. Your resume information is used solely to generate your personal website.",
        },
      },
      {
        "@type": "Question",
        name: "What happens to my resume website and data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your site remains in your account until you delete your account. You can keep it as a draft (not publicly accessible) or publish it to make it live at your personal magic-self.dev/yourname URL.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use my own custom domain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, Magic Self provides a free custom URL at magic-self.dev/yourname. Custom domain support is on the roadmap.",
        },
      },
      {
        "@type": "Question",
        name: "How do I convert my LinkedIn profile to a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Go to your LinkedIn profile, click 'Resources' or 'More', then 'Save to PDF'. Upload that PDF to Magic Self and your personal website is generated in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best free resume website builder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magic Self is a free, AI-powered resume website builder that converts your PDF resume or LinkedIn export into a live personal portfolio website in seconds. No coding or design skills required.",
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ScrollHeader userId={userId} />

      <main className="flex-1">
        <Hero1
          image={{
            src: "/scr2.png",
            alt: "Resume Builder Preview",
          }}
        />
        <Features />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
