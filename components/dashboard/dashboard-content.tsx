"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface DashboardContentProps {
  initialResume: {
    id: string;
    user_id: string;
    status: string;
    file_name: string | null;
    file_url: string | null;
    file_size: number | null;
  } | null;
  initialUsername: string | null;
}

export function DashboardContent({
  initialResume,
  initialUsername,
}: DashboardContentProps) {
  const [resume, setResume] = useState(initialResume);
  const [username, setUsername] = useState(initialUsername || "");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(initialUsername || "");
  const [isSavingUsername, setIsSavingUsername] = useState(false);

  const { upload, isUploading } = useFileUpload({
    onSuccess: (result) => {
      setResume((prev) =>
        prev
          ? {
              ...prev,
              file_name: result.fileName || null,
              file_url: result.fileUrl || null,
              file_size: result.fileSize || null,
            }
          : null
      );
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setIsSavingUsername(true);
    try {
      const response = await fetch("/api/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save username");
      }

      setUsername(data.username);
      setIsEditingUsername(false);
      toast.success("Username saved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save username"
      );
    } finally {
      setIsSavingUsername(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = resume?.status === "live" ? "draft" : "live";

    try {
      const response = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setResume((prev) => (prev ? { ...prev, status: newStatus } : null));
      toast.success(`Resume is now ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Username</CardTitle>
          <CardDescription>
            This is your public profile URL:{" "}
            {username ? `/${username}` : "Not set"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingUsername ? (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <Input
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="your-username"
                  disabled={isSavingUsername}
                />
              </div>
              <Button onClick={handleSaveUsername} disabled={isSavingUsername}>
                {isSavingUsername ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditingUsername(false);
                  setNewUsername(username);
                }}
                disabled={isSavingUsername}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-lg">{username || "No username set"}</span>
              <Button
                variant="outline"
                onClick={() => setIsEditingUsername(true)}
              >
                {username ? "Edit" : "Set Username"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
          <CardDescription>
            Upload your PDF resume to share it publicly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="resume-file" className="sr-only">
              Upload Resume
            </Label>
            <Input
              id="resume-file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading}
              className="max-w-xs"
            />
            {isUploading && (
              <span className="text-sm text-muted-foreground">
                Uploading...
              </span>
            )}
          </div>

          {resume?.file_name && (
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <p className="font-medium">{resume.file_name}</p>
                <p className="text-sm text-muted-foreground">
                  {resume.file_size
                    ? `${(resume.file_size / 1024).toFixed(1)} KB`
                    : "Unknown size"}
                </p>
              </div>
              <Badge
                variant={resume.status === "live" ? "default" : "secondary"}
              >
                {resume.status}
              </Badge>
              <Button variant="outline" onClick={toggleStatus}>
                {resume.status === "live" ? "Set to Draft" : "Go Live"}
              </Button>
              {resume.file_url && (
                <Button variant="outline" asChild>
                  <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </Button>
              )}
            </div>
          )}

          {username && resume?.status === "live" && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Your public profile:</p>
              <Link
                href={`/${username}`}
                className="text-sm text-primary hover:underline"
                target="_blank"
              >
                {typeof window !== "undefined" ? window.location.origin : ""}/
                {username}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
