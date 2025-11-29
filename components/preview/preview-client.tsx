"use client";

import { useState, lazy, Suspense } from "react";
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
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";

// Lazy load heavy resume components
const EditResume = lazy(() =>
  import("@/components/resume/edit-resume").then((mod) => ({
    default: mod.EditResume,
  }))
);
const FullResume = lazy(() =>
  import("@/components/resume/full-resume").then((mod) => ({
    default: mod.FullResume,
  }))
);

// Lazy load dialogs (only needed on user interaction)
const UsernameEditDialog = lazy(() =>
  import("@/components/preview/username-edit-dialog").then((mod) => ({
    default: mod.UsernameEditDialog,
  }))
);
const DiscardDialog = lazy(() =>
  import("@/components/preview/discard-dialog").then((mod) => ({
    default: mod.DiscardDialog,
  }))
);

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
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const profilePath = username ? `/${username}` : null;

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
    setShowDiscardDialog(true);
  };

  const confirmDiscard = () => {
    if (!originalData) return;
    setResumeData(originalData);
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    setShowDiscardDialog(false);
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

      // Enhanced toasts
      if (newStatus === "live") {
        const siteUrl = `${SITE_CONFIG.url}/${username}`;
        toast.success(
          <div className="flex items-center justify-between gap-4">
            <span>Your website is live!</span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => window.open(siteUrl, "_blank")}
            >
              View
            </Button>
          </div>,
          { duration: 5000 }
        );
      } else {
        toast("Your site is now a draft", {
          style: {
            color: "#d97706",
          },
          duration: 3000,
        });
      }
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
      <div className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* URL Bar */}
            <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              <button
                onClick={() => {
                  const siteUrl = `${SITE_CONFIG.url}/${username}`;
                  window.open(siteUrl, "_blank");
                }}
                className="hover:text-foreground transition-colors cursor-pointer"
                aria-label="Visit your site"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              <span>{SITE_CONFIG.domain}/</span>
              <span className="font-medium text-foreground">
                {username || "pending"}
              </span>
              <Suspense fallback={null}>
                <UsernameEditDialog
                  currentUsername={username || ""}
                  onUpdate={setUsername}
                />
              </Suspense>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Status
                status={status === "live" ? "online" : "degraded"}
                className="border-0 bg-transparent px-0 py-1 text-xs font-semibold uppercase tracking-wider overflow-visible"
              >
                <StatusIndicator className="mr-1" />
                <StatusLabel
                  className={
                    status === "live" ? "text-green-600" : "text-amber-600"
                  }
                >
                  {status === "live" ? "Live" : "Draft"}
                </StatusLabel>
              </Status>
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
              {status === "live" && (
                <Button
                  size="sm"
                  onClick={() => {
                    const siteUrl = `${SITE_CONFIG.url}/${username}`;
                    window.open(siteUrl, "_blank");
                  }}
                  className="h-9"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Visit Site
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle Toolbar */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg w-fit">
            <Button
              variant={!isEditMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsEditMode(false)}
              className="gap-2 h-8 text-xs font-medium"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button
              variant={isEditMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsEditMode(true)}
              className="gap-2 h-8 text-xs font-medium"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit Content
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
          </div>

          <Card className="overflow-hidden border-none shadow-lg ring-1 ring-black/5">
            <CardContent className="p-0">
              {isEditMode ? (
                <div className="p-8">
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    }
                  >
                    <EditResume
                      data={resumeData}
                      onChange={handleDataChange}
                      profileImageUrl={profileImageUrl}
                    />
                  </Suspense>
                </div>
              ) : (
                <div className="bg-white p-12 print:p-8">
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    }
                  >
                    <FullResume
                      data={resumeData}
                      profileImageUrl={profileImageUrl}
                    />
                  </Suspense>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Suspense fallback={null}>
        <DiscardDialog
          open={showDiscardDialog}
          onOpenChange={setShowDiscardDialog}
          onConfirm={confirmDiscard}
        />
      </Suspense>
    </div>
  );
}
