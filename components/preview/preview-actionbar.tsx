"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Pencil, ExternalLink, Save, X, Loader2 } from "lucide-react";
import { UsernameEditorView } from "@/components/preview/username-editor-view";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

interface PreviewActionbarProps {
  username: string | null;
  status: "draft" | "live";
  isEditMode: boolean;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onToggleMode: () => void;
  onToggleStatus: () => void;
  onSave: () => void;
  onDiscard: () => void;
  onUsernameUpdate: (username: string) => void;
}

export function PreviewActionbar({
  username,
  status,
  isEditMode,
  hasUnsavedChanges,
  isSaving,
  onToggleMode,
  onToggleStatus,
  onSave,
  onDiscard,
  onUsernameUpdate,
}: PreviewActionbarProps) {
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const handleModeToggle = () => {
    if (isEditMode && hasUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      onToggleMode();
    }
  };

  const handleDiscardConfirm = () => {
    onDiscard();
    setShowDiscardDialog(false);
  };

  const profileUrl = username ? `${SITE_CONFIG.url}/${username}` : null;

  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 md:px-6">
          {/* Left: Username display */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-mono">
              {SITE_CONFIG.domain}/
            </span>
            <UsernameEditorView
              username={username}
              onUsernameUpdate={onUsernameUpdate}
            />
            <Badge
              variant={status === "live" ? "default" : "secondary"}
              className={cn(
                "ml-2 text-xs",
                status === "live" &&
                  "bg-green-500/10 text-green-600 border-green-500/20"
              )}
            >
              {status === "live" && (
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              )}
              {status === "draft" && (
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
              )}
              {status}
            </Badge>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {isEditMode && hasUnsavedChanges && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDiscardDialog(true)}
                  disabled={isSaving}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Discard
                </Button>
                <Button size="sm" onClick={onSave} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-1.5 h-4 w-4" />
                  )}
                  Save
                </Button>
              </>
            )}

            {!isEditMode && (
              <>
                <Button variant="outline" size="sm" onClick={handleModeToggle}>
                  <Pencil className="mr-1.5 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant={status === "live" ? "secondary" : "default"}
                  size="sm"
                  onClick={onToggleStatus}
                >
                  {status === "live" ? "Unpublish" : "Publish"}
                </Button>
                {status === "live" && profileUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      Visit
                    </a>
                  </Button>
                )}
              </>
            )}

            {isEditMode && !hasUnsavedChanges && (
              <Button variant="outline" size="sm" onClick={handleModeToggle}>
                <Eye className="mr-1.5 h-4 w-4" />
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscardConfirm}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
