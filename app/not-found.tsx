import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent_50%)]" />
            </div>

            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/5 blur-3xl delay-1000" />

            <div className="relative z-10 mx-auto max-w-2xl text-center">
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-[clamp(6rem,15vw,12rem)] font-bold leading-none tracking-tighter text-transparent">
                        404
                    </h1>
                </div>

                <div className="mb-6 space-y-4 animate-fade-in-up delay-100">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Page Not Found
                    </h2>
                    <p className="mx-auto max-w-md text-lg text-muted-foreground">
                        Oops! The page you're looking for seems to have wandered off into
                        the digital void.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 animate-fade-in-up delay-200 sm:flex-row">
                    <Button asChild size="lg" className="group min-w-[160px]">
                        <Link href="/">
                            Go Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="group min-w-[160px]"
                    >
                        <Link href="/upload">
                            Upload Resume
                        </Link>


                    </Button>
                </div>

                <div className="mt-12 animate-fade-in-up delay-300">

                </div>
            </div>
        </div>
    );
}
