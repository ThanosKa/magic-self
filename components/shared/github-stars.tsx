"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const API_URL = "https://api.github.com/repos/ThanosKa/magic-self";
const REPO_URL = "https://github.com/ThanosKa/magic-self";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchStars = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { stargazers_count?: number };
        if (isMounted && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch {}
    };
    fetchStars();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative inline-flex h-8 select-none items-center gap-2 overflow-hidden rounded-full border border-border/40",
        "bg-background/50 text-sm font-medium shadow-sm backdrop-blur-md transition-shadow",
        "hover:shadow-md dark:border-white/20 dark:bg-background/20"
      )}
      aria-label="Star ThanosKa/magic-self on GitHub"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[length:400%_400%] animate-gradient-xy transition-colors duration-500",
          "bg-gradient-to-r from-violet-200/30 via-pink-200/30 to-cyan-200/30",
          "dark:from-violet-500/10 dark:via-pink-500/10 dark:to-cyan-500/10",
          "group-hover:from-violet-200/50 group-hover:via-pink-200/50 group-hover:to-cyan-200/50",
          "dark:group-hover:from-violet-500/20 dark:group-hover:via-pink-500/20 dark:group-hover:to-cyan-500/20"
        )}
      />
      <div className="relative z-10 px-3 text-sm font-medium">
        Star on GitHub
      </div>
      <div className="relative z-10 flex h-full items-center border-l border-border/60 bg-primary/5 px-3 text-xs font-semibold">
        <motion.div
          animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="mr-1"
        >
          <Star
            className="h-3.5 w-3.5 text-yellow-500/70 transition-colors duration-300 group-hover:text-yellow-500 dark:text-yellow-400/70 dark:group-hover:text-yellow-400"
            fill={isHovered ? "currentColor" : "none"}
          />
        </motion.div>
        <span
          className="mr-2 h-3 w-px bg-border/60 transition-colors duration-300 dark:bg-white/20"
          aria-hidden
        />
        <motion.span
          key={stars ?? "loading"}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {stars !== null ? stars.toLocaleString() : "---"}
        </motion.span>
      </div>
    </motion.a>
  );
}
