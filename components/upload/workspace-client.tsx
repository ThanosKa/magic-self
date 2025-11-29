"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { Sparkles, HelpCircle, Loader2, Info } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import FileUpload04 from "@/components/upload/file-upload";

type ResumeRecord = {
  id: string;
  status: "draft" | "live";
  file_name: string | null;
  file_url: string | null;
  file_size: number | null;
  resume_data: unknown | null;
};

interface WorkspaceClientProps {
  initialResume: ResumeRecord | null;
}

export function WorkspaceClient({ initialResume }: WorkspaceClientProps) {
  const router = useRouter();
  const [resume, setResume] = useState<ResumeRecord | null>(initialResume);
  const [isGenerating, setIsGenerating] = useState(false);

  const { upload, isUploading } = useFileUpload({
    onSuccess: (result) => {
      setResume((prev) => ({
        ...(prev ?? {
          id: "",
          status: "draft",
          file_url: null,
          file_name: null,
          file_size: null,
          resume_data: null,
        }),
        file_name: result.fileName || prev?.file_name || null,
        file_url: result.fileUrl || prev?.file_url || null,
        file_size: result.fileSize || prev?.file_size || null,
        resume_data: null,
      }));
    },
  });

  const hasFile = Boolean(resume?.file_name);
  const canGenerate = hasFile && !isUploading && !isGenerating;

  const handleGenerateWebsite = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", { method: "POST" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate website");
      }
      toast.success("Personal site generated! Redirecting...");
      router.push("/preview");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate website"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
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

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 pt-12 md:pt-24">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Turn your resume into a <span className="text-primary">website</span>
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          Upload your LinkedIn PDF or standard resume. We'll handle the rest.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Info className="h-4 w-4" />
              How to export from LinkedIn
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export from LinkedIn</DialogTitle>
              <DialogDescription>
                Follow these steps to get your PDF.
              </DialogDescription>
            </DialogHeader>
            <ol className="list-inside list-decimal space-y-3 text-sm pt-2">
              <li>Go to your LinkedIn profile page</li>
              <li>Click the "More" button in your introduction section</li>
              <li>Select "Save to PDF" from the dropdown</li>
              <li>Upload the downloaded file here</li>
            </ol>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-8">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur transition duration-500 group-hover:opacity-100" />
          <div className="relative rounded-xl bg-background p-2 ring-1 ring-border">
            <FileUpload04
              onFileSelect={(file) => upload(file)}
              isUploading={isUploading}
              acceptedFileTypes={["application/pdf"]}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleGenerateWebsite}
            disabled={!canGenerate}
            className="h-12 px-8 text-base shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            size="lg"
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Generate Website
          </Button>
        </div>
      </div>
    </div>
  );
}
