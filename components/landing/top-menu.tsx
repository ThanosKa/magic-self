"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { UserButton } from "@clerk/nextjs";
import { scrollToSection } from "@/lib/utils/scroll";

type TopMenuProps = {
  userId: string | null;
};

export function TopMenu({ userId }: TopMenuProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            {SITE_CONFIG.name}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "faq")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="group hidden sm:inline-flex">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Source
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </a>
          </Button>

          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
