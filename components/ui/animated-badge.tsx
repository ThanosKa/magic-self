"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function AnimatedBadge({
  children,
  className,
  showArrow = true,
}: AnimatedBadgeProps) {
  return (
    <div
      className={cn(
        "group inline-flex items-center justify-center rounded-full border border-black/5 bg-neutral-100 px-4 py-2 text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        className
      )}
    >
      <span className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span className="relative bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100">
          {children}
        </span>
        {showArrow && (
          <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </div>
  );
}
