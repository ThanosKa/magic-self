import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Built with Next.js, Supabase, and Clerk.{" "}
          <Link
            href="https://github.com/yourusername/folio"
            className="font-medium hover:underline"
            target="_blank"
          >
            Open Source
          </Link>
          .
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/yourusername/folio"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://twitter.com/yourusername"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
