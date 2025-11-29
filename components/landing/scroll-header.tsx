"use client";

import { useEffect, useState } from "react";
import { TopMenu } from "@/components/landing/top-menu";
import { cn } from "@/lib/utils";

type ScrollHeaderProps = {
  userId: string | null;
};

export function ScrollHeader({ userId }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b/0 bg-transparent backdrop-blur-0"
      )}
    >
      <TopMenu userId={userId} />
    </div>
  );
}

