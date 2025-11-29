"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
}

export function Hero1({
  badge = "100% free & open source",
  heading = "LinkedIn → Website in one click",
  description = "Turn your resume or LinkedIn PDF export into a beautiful, professional website. Share your profile with a simple link.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/upload",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://github.com",
    },
  },
  image = {
    src: "/professional-resume-website-preview-with-clean-des.jpg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) {
  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <AnimatedBadge
                  className="mb-6 hover:cursor-default hover:!bg-neutral-100 dark:hover:!bg-neutral-900"
                  showArrow={false}
                >
                  <AnimatedShinyText>{badge}</AnimatedShinyText>
                </AnimatedBadge>
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-pretty text-4xl font-bold tracking-tight lg:text-6xl"
            >
              {heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground mb-8 max-w-xl text-lg lg:text-xl"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              {buttons.primary && (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted shadow-2xl lg:aspect-auto lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-muted to-muted/50" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
