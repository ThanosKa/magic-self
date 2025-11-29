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

const getHostname = (url: string | undefined): string => {
  if (!url) return "magic-self.dev";

  try {
    const normalizedUrl = url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

    return new URL(normalizedUrl).hostname;
  } catch {
    return "magic-self.dev";
  }
};

const getUrl = (url: string | undefined): string => {
  // Try provided URL first
  if (url && url.trim() !== "") {
    try {
      const normalizedUrl = url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

      // Validate URL by attempting to construct it
      new URL(normalizedUrl);
      return normalizedUrl;
    } catch {
      console.warn(`Invalid NEXT_PUBLIC_APP_URL: "${url}", using fallback`);
    }
  }

  // Try Vercel automatic URL (available in preview/production deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Final fallback
  return "https://magic-self.dev";
};

export const SITE_CONFIG = {
  name: getHostname(process.env.NEXT_PUBLIC_APP_URL),
  domain: getHostname(process.env.NEXT_PUBLIC_APP_URL),
  url: getUrl(process.env.NEXT_PUBLIC_APP_URL),
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
