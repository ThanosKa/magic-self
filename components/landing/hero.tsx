"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { BlurFade } from "@/components/ui/blur-fade";
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
      text: "Upload Resume",
      url: "/upload",
    },
  },
  image = {
    src: "/scr2.png",
    alt: "Resume website preview showing professional portfolio interface",
  },
}: Hero1Props) {
  return (
    <section id="hero" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
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
            <div className="flex flex-col items-center w-full md:w-fit lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex w-full flex-col gap-3"
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-muted-foreground text-sm text-center mt-4 w-full"
              >
                Takes 2 Clicks!
              </motion.p>
            </div>
          </div>
          <div className="w-full max-w-lg mx-auto lg:max-w-none lg:w-full">
            <BlurFade delay={0.25} yOffset={6} blur="6px">
              <div className="relative">
                <div className="absolute inset-0 -bottom-4 rounded-3xl bg-black/5 blur-xl" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  className="relative w-full h-auto object-cover overflow-hidden rounded-3xl border border-border/50"
                  priority
                />
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
