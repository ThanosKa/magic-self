"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { scrollToSection } from "@/lib/utils/scroll";
import { GitHubStars } from "@/components/shared/github-stars";
import { Logo } from "@/components/logo";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type TopMenuProps = {
  userId: string | null;
};

type NavLinksProps = {
  mobile?: boolean;
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => void;
};

const NavLinks = ({ mobile = false, onNavClick }: NavLinksProps) => (
  <>
    <a
      href="#features"
      onClick={(e) => onNavClick(e, "features")}
      className={
        mobile
          ? "text-lg font-medium py-2"
          : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      Features
    </a>
    <a
      href="#faq"
      onClick={(e) => onNavClick(e, "faq")}
      className={
        mobile
          ? "text-lg font-medium py-2"
          : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      FAQ
    </a>
  </>
);

export function TopMenu({ userId }: TopMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setOpen(false);
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <NavLinks onNavClick={handleNavClick} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <GitHubStars />
          </div>

          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button size="sm" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden ml-2">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col px-4 pb-8 gap-2">
                  <NavLinks mobile onNavClick={handleNavClick} />
                  <div className="mt-4 pt-4 border-t flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Support us
                      </span>
                      <GitHubStars />
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
