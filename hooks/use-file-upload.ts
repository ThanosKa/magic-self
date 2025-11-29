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

      if (file.size > MAX_FILE_SIZE) {
        const error = "File size must be less than 10MB";
        toast.error(error);
        options?.onError?.(error);
        return { success: false, error };
      }

      setIsUploading(true);
      setProgress(0);

      return new Promise<UploadResult>((resolve) => {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setProgress(percentComplete);
          }
        });

        // Handle completion
        xhr.addEventListener("load", () => {
          setIsUploading(false);

          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              const result: UploadResult = {
                success: true,
                fileUrl: data.fileUrl,
                fileName: data.fileName,
                fileSize: data.fileSize,
              };

              toast.success("File uploaded successfully");
              options?.onSuccess?.(result);
              setProgress(100);
              resolve(result);
            } catch (error) {
              const message = "Failed to parse response";
              toast.error(message);
              options?.onError?.(message);
              resolve({ success: false, error: message });
            }
          } else {
            try {
              const data = JSON.parse(xhr.responseText);
              const message = data.error || "Upload failed";
              toast.error(message);
              options?.onError?.(message);
              resolve({ success: false, error: message });
            } catch {
              const message = "Upload failed";
              toast.error(message);
              options?.onError?.(message);
              resolve({ success: false, error: message });
            }
          }
        });

        // Handle errors
        xhr.addEventListener("error", () => {
          setIsUploading(false);
          const message = "Network error occurred";
          toast.error(message);
          options?.onError?.(message);
          resolve({ success: false, error: message });
        });

        // Handle abort
        xhr.addEventListener("abort", () => {
          setIsUploading(false);
          const message = "Upload cancelled";
          toast.error(message);
          options?.onError?.(message);
          resolve({ success: false, error: message });
        });

        // Send the request
        xhr.open("POST", "/api/upload");
        xhr.send(formData);
      });
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
