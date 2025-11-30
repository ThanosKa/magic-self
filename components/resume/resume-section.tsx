import type React from "react";
import { cn } from "@/lib/utils";

interface ResumeSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ResumeSection({
  title,
  children,
  className,
}: ResumeSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {title && (
        <h2 className="text-xl font-bold tracking-tight print:text-base">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
