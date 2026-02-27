import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.name} Blog`,
    default: `Blog | ${SITE_CONFIG.name}`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
            ← magic-self.dev
          </Link>
          <Link
            href="/upload"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Create Your Website Free →
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
