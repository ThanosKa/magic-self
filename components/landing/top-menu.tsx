"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
import { UserButton } from "@clerk/nextjs";
import { scrollToSection } from "@/lib/utils/scroll";
import { GitHubStars } from "@/components/shared/github-stars";
import { Logo } from "@/components/logo";

type TopMenuProps = {
  userId: string | null;
};

export function TopMenu({ userId }: TopMenuProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between relative">
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center gap-2 font-bold tracking-tight cursor-pointer"
          >
            <Logo className="h-8 w-8" />
            Magic Self
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
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

        <div className="flex items-center gap-2">
          <GitHubStars />

          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button size="sm" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
