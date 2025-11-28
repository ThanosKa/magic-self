"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
import { FileText, HelpCircle, Upload, X } from "lucide-react";

interface UploadFormProps {
  existingFile?: {
    name: string;
    size: number;
    url?: string;
  };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadForm({ existingFile }: UploadFormProps) {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
  } | null>(
    existingFile ? { name: existingFile.name, size: existingFile.size } : null
  );

  const { upload, isUploading } = useFileUpload({
    onSuccess: (result) => {
      if (result.fileName && result.fileSize) {
        setUploadedFile({ name: result.fileName, size: result.fileSize });
      }
      toast.success("Resume uploaded successfully!");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        await upload(file);
      }
    },
    [upload]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  const handleGenerateWebsite = () => {
    router.push("/pdf");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>Upload a PDF file (max 10MB)</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How to export your LinkedIn profile</DialogTitle>
                <DialogDescription>
                  Follow these steps to download your LinkedIn profile as a PDF:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <ol className="list-inside list-decimal space-y-2">
                  <li>Go to your LinkedIn profile page</li>
                  <li>
                    Click the &quot;More&quot; button below your profile photo
                  </li>
                  <li>Select &quot;Save to PDF&quot; from the dropdown menu</li>
                  <li>Wait for the PDF to generate and download</li>
                  <li>Upload the downloaded PDF here</li>
                </ol>
                <p className="text-muted-foreground">
                  Tip: Make sure your LinkedIn profile is up to date before
                  exporting!
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadedFile ? (
          <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUploadedFile(null)}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`
              flex min-h-[200px] cursor-pointer flex-col items-center justify-center
              rounded-lg border-2 border-dashed p-6 transition-colors
              ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
              ${isUploading ? "pointer-events-none opacity-50" : "hover:border-primary/50"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="mb-2 text-lg font-medium">
                {isUploading ? "Uploading..." : "Drag and drop your PDF here"}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">or</p>
              <Label htmlFor="file-upload" className="sr-only">
                Choose file
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isUploading}
                className="max-w-xs"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button
            onClick={handleGenerateWebsite}
            disabled={!uploadedFile || isUploading}
          >
            Generate Website
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
