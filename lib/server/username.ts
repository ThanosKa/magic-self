import { clerkClient } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import {
  checkUsernameAvailability,
  createUsernameLookup,
  getUsernameById,
} from "@/lib/server/supabase-actions";
import { logger } from "@/lib/server/logger";

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
}

async function generateUsername(userId: string, base: string) {
  const normalized = base || "user";

  const attempt = async (length: number) => {
    const candidate = `${normalized}-${nanoid(length)}`;
    const availability = await checkUsernameAvailability(candidate);

    if (availability.available) {
      await createUsernameLookup({ userId, username: candidate });
      return candidate;
    }

    return null;
  };

  return (await attempt(6)) ?? (await attempt(8)) ?? (await attempt(10));
}

export async function ensureUsername(userId: string): Promise<string> {
  const existing = await getUsernameById(userId);
  if (existing) {
    return existing;
  }

  let base = "user";

  try {
    const user = await clerkClient.users.getUser(userId);
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    base = name ? slugifyName(name) : "user";
  } catch (error) {
    logger.warn(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        userId,
      },
      "Failed to fetch user for username generation"
    );
  }

  const created = await generateUsername(userId, base);
  if (created) {
    return created;
  }

  // Final fallback if all attempts failed
  const fallback = `user-${nanoid(10)}`.toLowerCase();
  await createUsernameLookup({ userId, username: fallback });
  return fallback;
}

