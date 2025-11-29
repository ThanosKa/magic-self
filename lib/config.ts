export const MAX_USERNAME_LENGTH = 40;
export const MIN_USERNAME_LENGTH = 3;

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
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = ["application/pdf"] as const;

export const RESUME_STATUS = {
  DRAFT: "draft",
  LIVE: "live",
} as const;

export type ResumeStatus = (typeof RESUME_STATUS)[keyof typeof RESUME_STATUS];

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname
    : "magic-self.dev",
  domain: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname
    : "magic-self.dev",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://magic-self.dev",
  description:
    "Turn your resume into a beautiful personal website instantly with AI-powered resume extraction",
  tagline: "LinkedIn → Website in one click",
  keywords: [
    "AI resume builder",
    "LinkedIn to website",
    "resume website builder",
    "professional portfolio",
    "personal branding",
    "PDF resume parser",
    "career portfolio",
    "online resume",
    "resume to website converter",
    "professional website builder",
  ],
  ogImage: "/og-image.png",
  twitterHandle: "@magic_self",
  githubUrl: "https://github.com/ThanosKa/magic-self",
  referralParam: "magicselfref",
} as const;
