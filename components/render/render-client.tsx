"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export function RenderClient() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateWebsite = async () => {
      try {
        const response = await fetch("/api/generate", { method: "POST" });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to generate website");
        }
        // Redirect to preview after successful generation
        router.push("/preview");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to generate website"
        );
        // Redirect back to upload on error
        router.push("/upload");
      } finally {
        setIsGenerating(false);
      }
    };

    generateWebsite();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Creating your masterpiece
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground mx-auto">
          We're extracting your resume content and crafting your personal
          website.
        </p>
      </div>
    </div>
  );
}
