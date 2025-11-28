"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ResumeData } from "@/lib/schemas/resume"

// Query keys
export const queryKeys = {
  resume: ["resume"] as const,
  username: ["username"] as const,
}

// Types
interface Resume {
  id: string
  user_id: string
  status: "draft" | "live"
  file_name: string | null
  file_url: string | null
  file_size: number | null
  file_content: string | null
  resume_data: ResumeData | null
  created_at: string
  updated_at: string
}

interface UsernameData {
  username: string | null
}

interface CheckUsernameResult {
  available: boolean
  reason?: string
}

// API functions
async function fetchResume(): Promise<{ resume: Resume | null }> {
  const res = await fetch("/api/resume")
  if (!res.ok) throw new Error("Failed to fetch resume")
  return res.json()
}

async function fetchUsername(): Promise<UsernameData> {
  const res = await fetch("/api/username")
  if (!res.ok) throw new Error("Failed to fetch username")
  return res.json()
}

async function updateResumeData(resumeData: ResumeData): Promise<void> {
  const res = await fetch("/api/resume", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeData }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || "Failed to save resume")
  }
}

async function toggleResumeStatus(status: "draft" | "live"): Promise<void> {
  const res = await fetch("/api/resume", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || "Failed to update status")
  }
}

async function updateUsername(username: string): Promise<void> {
  const res = await fetch("/api/username", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || "Failed to update username")
  }
}

async function checkUsernameAvailability(username: string): Promise<CheckUsernameResult> {
  const res = await fetch(`/api/username/check?username=${encodeURIComponent(username)}`)
  return res.json()
}

async function uploadFile(file: File): Promise<{ fileUrl: string; fileName: string; fileSize: number }> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || "Upload failed")
  }

  return res.json()
}

// Hook
export function useUserActions() {
  const queryClient = useQueryClient()

  // Queries
  const resumeQuery = useQuery({
    queryKey: queryKeys.resume,
    queryFn: fetchResume,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const usernameQuery = useQuery({
    queryKey: queryKeys.username,
    queryFn: fetchUsername,
    staleTime: 1000 * 60 * 5,
  })

  // Mutations
  const saveResumeDataMutation = useMutation({
    mutationFn: updateResumeData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resume })
      toast.success("Changes saved!")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    },
  })

  const toggleStatusMutation = useMutation({
    mutationFn: toggleResumeStatus,
    onSuccess: (_, status) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resume })
      toast.success(status === "live" ? "Your site is now live!" : "Your site is now a draft")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    },
  })

  const updateUsernameMutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.username })
      toast.success("Username updated!")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    },
  })

  const checkUsernameMutation = useMutation({
    mutationFn: checkUsernameAvailability,
  })

  const uploadResumeMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resume })
      toast.success("File uploaded successfully!")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    },
  })

  return {
    // Queries
    resumeQuery,
    usernameQuery,
    resume: resumeQuery.data?.resume,
    username: usernameQuery.data?.username,
    isLoading: resumeQuery.isLoading || usernameQuery.isLoading,

    // Mutations
    saveResumeData: saveResumeDataMutation.mutate,
    isSavingResume: saveResumeDataMutation.isPending,

    toggleStatus: toggleStatusMutation.mutate,
    isTogglingStatus: toggleStatusMutation.isPending,

    updateUsername: updateUsernameMutation.mutate,
    isUpdatingUsername: updateUsernameMutation.isPending,

    checkUsername: checkUsernameMutation.mutateAsync,
    isCheckingUsername: checkUsernameMutation.isPending,

    uploadResume: uploadResumeMutation.mutateAsync,
    isUploadingResume: uploadResumeMutation.isPending,
  }
}
