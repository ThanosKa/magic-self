"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Sparkles,
  Upload as UploadIcon,
  HelpCircle,
  Loader2,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

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

function formatFileSize(bytes?: number | null) {
  if (!bytes) return "0 MB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await upload(file);
  };

  const handleGenerateWebsite = async () => {
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

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <section>
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Upload</CardTitle>
              <CardDescription>
                Upload a PDF of your LinkedIn or your resume and generate your
                personal site
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  How to upload LinkedIn profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload LinkedIn profile</DialogTitle>
                  <DialogDescription>
                    Export your LinkedIn profile by following these steps.
                  </DialogDescription>
                </DialogHeader>
                <ol className="list-inside list-decimal space-y-2 text-sm">
                  <li>Open your LinkedIn profile.</li>
                  <li>Click the "More" button below your photo.</li>
                  <li>Select "Save to PDF".</li>
                  <li>Wait for the file to download.</li>
                  <li>Upload it here and generate your website.</li>
                </ol>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label
              htmlFor="resume-upload"
              className="text-sm font-medium text-muted-foreground"
            >
              Upload a PDF
            </Label>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-dashed bg-muted/40 p-4">
                <UploadIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {resume?.file_name || "No file chosen"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {resume?.file_name
                      ? formatFileSize(resume?.file_size)
                      : "PDF up to 10MB"}
                  </p>
                </div>
              </div>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isUploading || isGenerating}
                className="max-w-xs"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleGenerateWebsite}
                disabled={!hasFile || isGenerating || isUploading}
                className="gap-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Generate Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {isGenerating && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <Spinner className="h-6 w-6" />
            <div>
              <p className="text-sm font-medium">Creating your personal site</p>
              <p className="text-sm text-muted-foreground">
                We&apos;re extracting your resume content and shaping it into a
                website.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
