import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { ScrollHeader } from "@/components/landing/scroll-header";
import { Footer } from "@/components/landing/footer";
import { Hero1 } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";
import { SITE_CONFIG } from "@/lib/config";

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
