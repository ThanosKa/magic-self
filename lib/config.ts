export const MAX_USERNAME_LENGTH = 40
export const MIN_USERNAME_LENGTH = 3

export const FORBIDDEN_USERNAMES = [
  "preview",
  "api",
  "upload",
  "pdf",
  "admin",
  "auth",
  "login",
  "sign-in",
  "sign-up",
  "settings",
  "profile",
  "dashboard",
] as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ALLOWED_FILE_TYPES = ["application/pdf"] as const

export const RESUME_STATUS = {
  DRAFT: "draft",
  LIVE: "live",
} as const

export type ResumeStatus = (typeof RESUME_STATUS)[keyof typeof RESUME_STATUS]

export const SITE_CONFIG = {
  name: "folio.sh",
  domain: "folio.sh",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://folio.sh",
  description: "Turn your resume into a beautiful personal website",
  referralParam: "folioref",
} as const
