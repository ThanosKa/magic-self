"use client";

import { useState, useEffect } from "react";
import type { ResumeData } from "@/lib/schemas/resume";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { PreviewActionbar } from "@/components/preview/preview-actionbar";
import { FullResume } from "@/components/resume/full-resume";
import { EditResume } from "@/components/resume/edit-resume";
import { PopupSiteLive } from "@/components/preview/popup-site-live";
import { SITE_CONFIG } from "@/lib/config";

interface PreviewClientProps {
  resumeData: ResumeData;
  username: string | null;
  showFallbackTip?: boolean;
}

const PUBLISHED_SITE_KEY = "intro_publishedSite";

export function PreviewClient({
  resumeData: initialResumeData,
  username: initialUsername,
  showFallbackTip,
}: PreviewClientProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [originalData, setOriginalData] =
    useState<ResumeData>(initialResumeData);
  const [username, setUsername] = useState(initialUsername);
  const [status, setStatus] = useState<"draft" | "live">("draft");
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSiteLivePopup, setShowSiteLivePopup] = useState(false);

  // Fetch current status on mount
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/resume");
        if (res.ok) {
          const data = await res.json();
          if (data.resume?.status) {
            setStatus(data.resume.status);
          }
        }
      } catch {
        // Ignore errors on initial fetch
      }
    }
    fetchStatus();
  }, []);

  const handleToggleStatus = async () => {
    const newStatus = status === "draft" ? "live" : "draft";

    try {
      const res = await fetch("/api/resume", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatus(newStatus);

      if (newStatus === "live") {
        // Check if this is first publish
        const hasPublished = localStorage.getItem(PUBLISHED_SITE_KEY);
        if (!hasPublished) {
          setShowSiteLivePopup(true);
          localStorage.setItem(PUBLISHED_SITE_KEY, "true");
        } else {
          toast.success("Your site is now live!");
        }
      } else {
        toast.success("Your site is now a draft");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setOriginalData(resumeData);
      setHasUnsavedChanges(false);
      toast.success("Changes saved!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setResumeData(originalData);
    setHasUnsavedChanges(false);
    setIsEditMode(false);
  };

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    setHasUnsavedChanges(true);
  };

  const handleUsernameUpdate = (newUsername: string) => {
    setUsername(newUsername);
  };

  const profileUrl = username ? `${SITE_CONFIG.url}/${username}` : null;

  return (
    <main className="min-h-screen bg-background">
      <PreviewActionbar
        username={username}
        status={status}
        isEditMode={isEditMode}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onToggleMode={() => setIsEditMode(!isEditMode)}
        onToggleStatus={handleToggleStatus}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onUsernameUpdate={handleUsernameUpdate}
      />

      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        {showFallbackTip && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>AI Extraction Issue</AlertTitle>
            <AlertDescription>
              We had trouble extracting some data from your resume. Please
              review and edit the information below.
            </AlertDescription>
          </Alert>
        )}

        {isEditMode ? (
          <EditResume data={resumeData} onChange={handleDataChange} />
        ) : (
          <FullResume data={resumeData} />
        )}
      </div>

      <PopupSiteLive
        open={showSiteLivePopup}
        onOpenChange={setShowSiteLivePopup}
        username={username}
        profileUrl={profileUrl}
      />
    </main>
  );
}
