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
import { Badge } from "@/components/ui/badge";
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
  FileText,
  AlertCircle,
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
      <div className="mx-auto max-w-4xl">
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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <section>
        <Card>
          <CardContent className="space-y-4 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Website URL</p>
                <div className="flex items-center gap-1 font-mono text-sm">
                  <span>{SITE_CONFIG.domain}/</span>
                  <span className="font-semibold">
                    {initialUsername || "pending"}
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
      </section>

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
            <EditResume data={resumeData} onChange={handleDataChange} profileImageUrl={profileImageUrl} />
          ) : (
            <FullResume data={resumeData} profileImageUrl={profileImageUrl} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

