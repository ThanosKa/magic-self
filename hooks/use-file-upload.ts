"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "@/lib/config";

interface UploadResult {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}

interface UseFileUploadOptions {
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

export function useFileUpload(options?: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      // Validate file type
      if (
        !ALLOWED_FILE_TYPES.includes(
          file.type as (typeof ALLOWED_FILE_TYPES)[number]
        )
      ) {
        const error = "Only PDF files are allowed";
        toast.error(error);
        options?.onError?.(error);
        return { success: false, error };
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        const error = "File size must be less than 10MB";
        toast.error(error);
        options?.onError?.(error);
        return { success: false, error };
      }

      setIsUploading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();

        const result: UploadResult = {
          success: true,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileSize: data.fileSize,
        };

        toast.success("File uploaded successfully");
        options?.onSuccess?.(result);
        setProgress(100);

        return result;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Upload failed";
        toast.error(message);
        options?.onError?.(message);
        return { success: false, error: message };
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
  }, []);

  return {
    upload,
    isUploading,
    progress,
    reset,
  };
}
