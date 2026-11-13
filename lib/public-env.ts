/**
 * Public values the app reads. They are baked into the Worker at build time,
 * so a build without them ships broken: the Supabase clients get undefined
 * URLs and keys, Clerk cannot load, and canonical URLs point at localhost.
 */
const REQUIRED_PUBLIC_ENV = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

/** Lists what is wrong with the build's public env; empty when it is fine. */
export function findPublicEnvProblems(
  env: Record<string, string | undefined>
): string[] {
  const problems: string[] = REQUIRED_PUBLIC_ENV.filter(
    (name) => !env[name]
  ).map((name) => `${name} is missing`);
  const appUrl = env.NEXT_PUBLIC_APP_URL;
  if (appUrl && !appUrl.startsWith("https://")) {
    problems.push(
      `NEXT_PUBLIC_APP_URL must start with https:// (got ${appUrl})`
    );
  }
  return problems;
}
