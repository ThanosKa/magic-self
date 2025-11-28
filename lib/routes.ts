export const PROTECTED_ROUTES = ["/upload", "/settings"] as const;

export const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"] as const;

export const API_ROUTES = [
  "/api/upload",
  "/api/resume",
  "/api/username",
  "/api/generate",
] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

export function isPublicRoute(pathname: string): boolean {
  // Check if it's a public route or a dynamic username route
  if (PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number])) {
    return true;
  }

  // Dynamic username routes are public (e.g., /john-doe)
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && !isProtectedRoute(`/${segments[0]}`)) {
    return true;
  }

  return false;
}
