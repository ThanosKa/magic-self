import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { UserButton } from "@clerk/nextjs";

type TopMenuProps = {
  userId: string | null;
};

export function TopMenu({ userId }: TopMenuProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          {SITE_CONFIG.name}
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/yourusername/folio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
