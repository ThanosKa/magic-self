"use client";

import { useState, type ChangeEvent } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFileUpload } from "@/hooks/use-file-upload";
import type { ResumeData } from "@/lib/schemas/resume";
import { FullResume } from "@/components/resume/full-resume";
import { EditResume } from "@/components/resume/edit-resume";
import { SITE_CONFIG } from "@/lib/config";
import { toast } from "sonner";
import {
  Sparkles,
  Upload as UploadIcon,
  HelpCircle,
  FileText,
  Loader2,
  PencilLine,
  Eye,
  ExternalLink,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

type ResumeRecord = {
  id: string;
  status: "draft" | "live";
  file_name: string | null;
  file_url: string | null;
  file_size: number | null;
  resume_data: ResumeData | null;
};

interface WorkspaceClientProps {
  initialResume: ResumeRecord | null;
  initialUsername: string | null;
}

function formatFileSize(bytes?: number | null) {
  if (!bytes) return "0 MB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function WorkspaceClient({
  initialResume,
  initialUsername,
}: WorkspaceClientProps) {
  const [resume, setResume] = useState<ResumeRecord | null>(initialResume);
  const [username, setUsername] = useState(initialUsername);
  const [resumeData, setResumeData] = useState<ResumeData | null>(
    initialResume?.resume_data ?? null
  );
  const [originalData, setOriginalData] = useState<ResumeData | null>(
    initialResume?.resume_data ?? null
  );
  const [status, setStatus] = useState<"draft" | "live">(
    initialResume?.status ?? "draft"
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showFallbackTip, setShowFallbackTip] = useState(false);

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
      setResumeData(null);
      setOriginalData(null);
      setHasUnsavedChanges(false);
      setShowFallbackTip(false);
    },
  });

  const hasFile = Boolean(resume?.file_name);
  const hasResumeData = Boolean(resumeData);
  const profilePath = username ? `/${username}` : null;

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
      const data = await response.json();
      setResume(data.resume);
      setResumeData(data.resume?.resume_data ?? null);
      setOriginalData(data.resume?.resume_data ?? null);
      setStatus(data.resume?.status ?? "draft");
      setUsername(data.username);
      setShowFallbackTip(Boolean(data.usedFallback));
      toast.success("Personal site updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate website"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!resumeData) {
      toast.error("Generate your website before publishing");
      return;
    }

    const newStatus = status === "draft" ? "live" : "draft";
    setIsPublishing(true);
    try {
      const response = await fetch("/api/resume", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatus(newStatus);
      toast.success(
        newStatus === "live" ? "Your site is live!" : "Your site is now a draft"
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!resumeData) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save changes");
      }

      setOriginalData(resumeData);
      setHasUnsavedChanges(false);
      toast.success("Changes saved");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save changes"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!originalData) return;
    setResumeData(originalData);
    setHasUnsavedChanges(false);
    setIsEditMode(false);
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
                  <li>Click the “More” button below your photo.</li>
                  <li>Select “Save to PDF”.</li>
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

      {hasResumeData && resumeData && (
        <section className="space-y-4">
          <Card>
            <CardContent className="space-y-4 py-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Website URL</p>
                  <div className="flex items-center gap-1 font-mono text-sm">
                    <span>{SITE_CONFIG.domain}/</span>
                    <span className="font-semibold">
                      {username || "pending"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={status === "live" ? "default" : "secondary"}
                    className="uppercase"
                  >
                    {status}
                  </Badge>
                  {status === "live" && profilePath && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={profilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditMode((prev) => !prev)}
                  className="gap-2"
                >
                  {isEditMode ? (
                    <>
                      <Eye className="h-4 w-4" />
                      Preview
                    </>
                  ) : (
                    <>
                      <PencilLine className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant={status === "live" ? "secondary" : "default"}
                  onClick={handleToggleStatus}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : status === "live" ? (
                    "Unpublish"
                  ) : (
                    "Publish"
                  )}
                </Button>
                {hasUnsavedChanges && (
                  <>
                    <Button size="sm" onClick={handleSave} disabled={isSaving}>
                      {isSaving && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save changes
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDiscard}
                      disabled={isSaving}
                    >
                      Discard
                    </Button>
                  </>
                )}
              </div>
              {hasUnsavedChanges && (
                <p className="text-xs text-muted-foreground">
                  You have unsaved edits.
                </p>
              )}
            </CardContent>
          </Card>

          {showFallbackTip && (
            <Alert variant="destructive">
              <AlertTitle>Review needed</AlertTitle>
              <AlertDescription>
                We had trouble extracting some of your content. Please review
                the details below and make manual edits if needed.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <CardTitle>
                  {isEditMode ? "Edit resume content" : "Live preview"}
                </CardTitle>
              </div>
              <CardDescription>
                {isEditMode
                  ? "Update any details before publishing."
                  : "This is what your website looks like."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditMode ? (
                <EditResume data={resumeData} onChange={handleDataChange} />
              ) : (
                <FullResume data={resumeData} />
              )}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
