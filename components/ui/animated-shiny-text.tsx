"use client";

import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedShinyText({
  children,
  className,
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block animate-shimmer bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100",
        className
      )}
    >
      {children}
    </span>
  );
}

