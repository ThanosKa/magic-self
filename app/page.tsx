import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TopMenu } from "@/components/landing/top-menu";
import { Footer } from "@/components/landing/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { SITE_CONFIG } from "@/lib/config";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopMenu />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center gap-8 py-20 text-center md:py-32">
          <BlurFade delay={0}>
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm font-medium"
            >
              100% free & open source
            </Badge>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              LinkedIn → Website in one click
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              Turn your resume or LinkedIn PDF export into a beautiful,
              professional website. Share your profile with a simple link.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <Button
                  size="lg"
                  className="relative overflow-hidden px-8"
                  asChild
                >
                  <Link href="/upload">Upload Resume</Link>
                </Button>
                <BorderBeam size={100} duration={12} />
              </div>
              <p className="text-sm text-muted-foreground">Takes 1 minute!</p>
            </div>
          </BlurFade>

          {/* Preview Image */}
          <BlurFade delay={0.5} className="mt-8 w-full max-w-4xl">
            <div className="relative overflow-hidden rounded-xl border bg-muted shadow-2xl">
              <Image
                src="/professional-resume-website-preview-with-clean-des.jpg"
                alt="Preview of generated resume website"
                width={1000}
                height={600}
                className="w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </BlurFade>
        </section>

        {/* Features Section */}
        <section className="container py-20">
          <BlurFade delay={0.6}>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                </div>
                <h3 className="font-semibold">Upload PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Export your LinkedIn profile as PDF or upload any resume file
                </p>
              </div>

              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                </div>
                <h3 className="font-semibold">AI Transforms</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI extracts and structures your resume data beautifully
                </p>
              </div>

              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="font-semibold">Share Link</h3>
                <p className="text-sm text-muted-foreground">
                  Get a {SITE_CONFIG.domain}/yourname URL to share anywhere
                </p>
              </div>
            </div>
          </BlurFade>
        </section>
      </main>

      <Footer />
    </div>
  );
}
