"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ResumeData } from "@/lib/schemas/resume";
import { FullResume } from "@/components/resume/full-resume";
import { EditResume } from "@/components/resume/edit-resume";
import { SITE_CONFIG } from "@/lib/config";
import { toast } from "sonner";
import {
  PencilLine,
  Eye,
  ExternalLink,
  Loader2,
  AlertCircle,
  Save,
  RotateCcw,
} from "lucide-react";

type ResumeRecord = {
  id: string;
  status: "draft" | "live";
  file_name: string | null;
  file_url: string | null;
  file_size: number | null;
  resume_data: ResumeData | null;
};

interface PreviewClientProps {
  initialResume: ResumeRecord | null;
  initialUsername: string | null;
  profileImageUrl: string | null;
}

export function PreviewClient({
  initialResume,
  initialUsername,
  profileImageUrl,
}: PreviewClientProps) {
  const [resume, setResume] = useState<ResumeRecord | null>(initialResume);
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
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const profilePath = initialUsername ? `/${initialUsername}` : null;

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

  const handleToggleStatus = async () => {
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

  if (!resumeData) {
    return (
      <div className="mx-auto max-w-4xl pt-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No resume data</AlertTitle>
          <AlertDescription>
            Please generate your website first by uploading a resume.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Control Bar */}
      {/* Control Bar */}
      <div className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* URL Bar */}
            <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>{SITE_CONFIG.domain}/</span>
              <span className="font-medium text-foreground">
                {initialUsername || "pending"}
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                <PencilLine className="h-3 w-3" />
              </Button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDiscard}
                    disabled={isSaving}
                    className="text-muted-foreground hover:text-foreground h-8"
                  >
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-8"
                  >
                    {isSaving ? (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-3 w-3" />
                    )}
                    Save
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <div
                  className={`h-2 w-2 rounded-full ${status === "live" ? "bg-green-500" : "bg-amber-500"
                    }`}
                />
                <span className={status === "live" ? "text-green-600" : "text-amber-600"}>
                  {status === "live" ? "Live" : "Draft"}
                </span>
              </div>

              <Button
                size="sm"
                variant={status === "live" ? "outline" : "default"}
                onClick={handleToggleStatus}
                disabled={isPublishing}
                className="min-w-[100px] h-9"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "live" ? (
                  "Unpublish"
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </div>

          {/* Secondary Row - Tabs */}
          <div className="mt-6 flex items-center gap-1">
            <Button
              variant={!isEditMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsEditMode(false)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={isEditMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsEditMode(true)}
              className="gap-2"
            >
              <PencilLine className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {isEditMode ? "Edit Content" : "Preview"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditMode
                  ? "Make changes to your resume data below."
                  : "This is how your website looks to visitors."}
              </p>
            </div>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <AlertCircle className="h-4 w-4" />
                Unsaved changes
              </div>
            )}
          </div>

          <Card className="overflow-hidden border-none shadow-lg ring-1 ring-black/5">
            <CardContent className="p-0">
              {isEditMode ? (
                <div className="p-8">
                  <EditResume data={resumeData} onChange={handleDataChange} profileImageUrl={profileImageUrl} />
                </div>
              ) : (
                <div className="bg-white p-12 print:p-8">
                  <FullResume data={resumeData} profileImageUrl={profileImageUrl} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

