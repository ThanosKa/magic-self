"use client";

import { File, FileSpreadsheet, X, FileText } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
}

export default function FileUpload04({
  onFileSelect,
  isUploading = false,
  acceptedFileTypes = ["application/pdf"],
  maxSizeMB = 10,
}: FileUploadProps) {
  const [uploadState, setUploadState] = useState<{
    file: File | null;
    progress: number;
    uploading: boolean;
  }>({
    file: null,
    progress: 0,
    uploading: false,
  });
  const [showDummy, setShowDummy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isUploading) {
      setUploadState((prev) => ({ ...prev, uploading: true }));
    } else if (
      uploadState.uploading &&
      !isUploading &&
      uploadState.progress >= 100
    ) {
      setUploadState((prev) => ({ ...prev, uploading: false }));
    }
  }, [isUploading, uploadState.uploading, uploadState.progress]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const isValidType = acceptedFileTypes.some(
      (type) =>
        file.type === type || (type.startsWith(".") && file.name.endsWith(type))
    );

    if (isValidType) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setUploadState({ file, progress: 0, uploading: true });

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploadState((prev) => ({ ...prev, progress: 100 }));
          onFileSelect(file);
        } else {
          setUploadState((prev) => ({ ...prev, progress: currentProgress }));
        }
      }, 100);
    } else {
      toast.error("Please upload a valid PDF file.", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const resetFile = () => {
    setUploadState({ file: null, progress: 0, uploading: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current && !uploading && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = () => {
    if (!uploadState.file) return <File />;

    const fileExt = uploadState.file.name.split(".").pop()?.toLowerCase() || "";
    if (fileExt === "pdf")
      return <FileText className="h-5 w-5 text-foreground" />;
    return ["csv", "xlsx", "xls"].includes(fileExt) ? (
      <FileSpreadsheet className="h-5 w-5 text-foreground" />
    ) : (
      <File className="h-5 w-5 text-foreground" />
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const { file, progress, uploading } = uploadState;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div
          className="flex justify-center rounded-md border mt-2 border-dashed border-input px-6 py-12 transition-colors hover:bg-muted/50 cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={handleBoxClick}
        >
          <div className="text-center">
            <File
              className="mx-auto h-12 w-12 text-muted-foreground"
              aria-hidden={true}
            />
            <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
              <p>Drag and drop or</p>
              <label
                htmlFor="file-upload-03"
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
              >
                <span>choose file</span>
                <input
                  id="file-upload-03"
                  name="file-upload-03"
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={uploading || isUploading}
                />
              </label>
              <p className="pl-1">to upload</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              PDF up to {maxSizeMB}MB
            </p>
          </div>
        </div>

        {file && (
          <Card className="relative mt-8 bg-muted p-4 gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Remove"
              onClick={resetFile}
              disabled={uploading || isUploading}
            >
              <X className="h-5 w-5 shrink-0" aria-hidden={true} />
            </Button>

            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-border">
                {getFileIcon()}
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">
                  {file?.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {file && formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Progress value={progress} className="h-1.5" />
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
}
