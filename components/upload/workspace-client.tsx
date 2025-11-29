"use client";

import { useState, useRef, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { Sparkles, Info, X, FileText, File as FileIcon } from "lucide-react";

// Lazy load Dialog components
const Dialog = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.Dialog })));
const DialogContent = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogContent })));
const DialogDescription = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogDescription })));
const DialogHeader = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogHeader })));
const DialogTitle = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogTitle })));
const DialogTrigger = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogTrigger })));

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const canGenerate = hasFile && !isUploading;

  const handleGenerateWebsite = () => {
    if (!canGenerate) return;
    // Redirect to render page which will handle generation
    router.push("/render");
  };

  const handleRemoveFile = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the box click
    try {
      const response = await fetch("/api/clear-file", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to clear file");
      }
      // Clear from UI
      setResume((prev) =>
        prev
          ? {
            ...prev,
            file_name: null,
            file_url: null,
            file_size: null,
          }
          : null
      );
      toast.success("Resume removed");
    } catch (error) {
      toast.error("Failed to remove resume");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading || hasFile) return;
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBoxClick = () => {
    if (!hasFile && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 pt-12 md:pt-24">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Turn your resume into a <span className="text-primary">website</span>
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          Upload your LinkedIn PDF or standard resume. We'll handle the rest.
        </p>

        <Suspense fallback={
          <Button
            variant="link"
            size="sm"
            className="gap-2 text-foreground hover:underline cursor-pointer"
          >
            <Info className="h-4 w-4" />
            How to export from LinkedIn
          </Button>
        }>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                size="sm"
                className="gap-2 text-foreground hover:underline cursor-pointer"
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
        </Suspense>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-8">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur transition duration-500 group-hover:opacity-100" />
          <div className="relative rounded-xl bg-background p-2 ring-1 ring-border">
            <div
              className={`flex justify-center rounded-md border mt-2 border-dashed border-input px-6 py-12 transition-colors ${!hasFile ? "hover:bg-muted/50 cursor-pointer" : ""
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleBoxClick}
            >
              <div className="text-center relative w-full">
                {hasFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -right-4 -top-8 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Remove"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}

                {hasFile ? (
                  <>
                    <FileText
                      className="mx-auto h-12 w-12 text-muted-foreground"
                      aria-hidden={true}
                    />
                    <div className="mt-4 text-sm leading-6 text-foreground font-medium">
                      {resume?.file_name}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Ready to generate your website
                    </p>
                  </>
                ) : (
                  <>
                    <FileIcon
                      className="mx-auto h-12 w-12 text-muted-foreground"
                      aria-hidden={true}
                    />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                      <p>Drag and drop or</p>
                      <label
                        htmlFor="file-upload-workspace"
                        className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>choose file</span>
                        <input
                          id="file-upload-workspace"
                          name="file-upload-workspace"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) upload(file);
                          }}
                          disabled={isUploading}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">to upload</p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      PDF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleGenerateWebsite}
            disabled={!canGenerate}
            className="h-12 px-8 text-base shadow-lg transition-all hover:scale-105 hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Website
          </Button>
        </div>
      </div>
    </div>
  );
}
