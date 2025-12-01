"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, X, Mail } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t bg-muted/30 py-6"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Logo className="h-10 w-10" />
            <span className="text-xl font-semibold text-foreground">
              Magic Self
            </span>
          </div>

          <div className="flex items-center justify-center gap-8">
            <Link
              href="https://github.com/ThanosKa/magic-self"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://x.com/KazakisThanos"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              aria-label="X (Twitter)"
            >
              <X className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:kazakis.th@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-muted-foreground">
              © 2025 Thaka. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
