import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ScrollHeader } from "@/components/landing/scroll-header";
import { Hero1 } from "@/components/landing/hero";
import { SITE_CONFIG } from "@/lib/config";

// Lazy load below-the-fold sections
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
        alt: "folio.sh - LinkedIn to Website in one click",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollHeader userId={userId} />

      <main className="flex-1">
        <Hero1 />
        <Features />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
