import { createAdminClient } from "@/lib/supabase/admin";
import {
  FORBIDDEN_USERNAMES,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@/lib/config";
import type { ResumeData } from "@/lib/schemas/resume";
import { logger } from "@/lib/server/logger";

const supabase = createAdminClient();

export async function getResume(userId: string) {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    logger.error({ userId, error: error.message }, "Failed to get resume");
    throw error;
  }

  return data;
}

export async function storeResume(
  userId: string,
  data: {
    fileName?: string | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    fileContent?: string | null;
    resumeData?: ResumeData | null;
    status?: "draft" | "live";
  }
) {
  const existing = await getResume(userId);

  const updateData: Record<string, unknown> = {};

  if (data.status !== undefined) updateData.status = data.status;

  if (data.fileName !== undefined) {
    updateData.file_name = data.fileName === null ? null : data.fileName;
  }
  if (data.fileUrl !== undefined) {
    updateData.file_url = data.fileUrl === null ? null : data.fileUrl;
  }
  if (data.fileSize !== undefined) {
    updateData.file_size = data.fileSize === null ? null : data.fileSize;
  }
  if (data.fileContent !== undefined) {
    updateData.file_content =
      data.fileContent === null ? null : data.fileContent;
  }
  if (data.resumeData !== undefined) {
    updateData.resume_data = data.resumeData === null ? null : data.resumeData;
  }

  if (existing) {
    const { data: updated, error } = await supabase
      .from("resumes")
      .update(updateData)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      logger.error({ userId, error: error.message }, "Failed to update resume");
      throw error;
    }

    logger.debug({ userId }, "Resume updated");
    return updated;
  }

  const { data: created, error } = await supabase
    .from("resumes")
    .insert({
      user_id: userId,
      ...updateData,
    })
    .select()
    .single();

  if (error) {
    logger.error({ userId, error: error.message }, "Failed to create resume");
    throw error;
  }

  logger.info({ userId }, "Resume created");
  return created;
}

export async function createUsernameLookup({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  const { data, error } = await supabase
    .from("usernames")
    .insert({ user_id: userId, username: username.toLowerCase() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUsernameById(userId: string) {
  const { data, error } = await supabase
    .from("usernames")
    .select("username")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data?.username || null;
}

export async function getUserIdByUsername(username: string) {
  const { data, error } = await supabase
    .from("usernames")
    .select("user_id")
    .eq("username", username.toLowerCase())
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data?.user_id || null;
}

export async function checkUsernameAvailability(username: string): Promise<{
  available: boolean;
  reason?: string;
}> {
  const normalized = username.toLowerCase().trim();

  if (normalized.length < MIN_USERNAME_LENGTH) {
    return {
      available: false,
      reason: `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
    };
  }

  if (normalized.length > MAX_USERNAME_LENGTH) {
    return {
      available: false,
      reason: `Username must be at most ${MAX_USERNAME_LENGTH} characters`,
    };
  }

  if (!/^[a-z0-9-]+$/.test(normalized)) {
    return {
      available: false,
      reason: "Username can only contain letters, numbers, and hyphens",
    };
  }

  if (
    FORBIDDEN_USERNAMES.includes(
      normalized as (typeof FORBIDDEN_USERNAMES)[number]
    )
  ) {
    return { available: false, reason: "This username is reserved" };
  }

  const { data } = await supabase
    .from("usernames")
    .select("id")
    .eq("username", normalized)
    .single();

  if (data) {
    return { available: false, reason: "Username is already taken" };
  }

  return { available: true };
}

export async function updateUsername(userId: string, newUsername: string) {
  const availability = await checkUsernameAvailability(newUsername);
  if (!availability.available) {
    throw new Error(availability.reason);
  }

  const existing = await getUsernameById(userId);

  if (existing) {
    const { data, error } = await supabase
      .from("usernames")
      .update({ username: newUsername.toLowerCase() })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return createUsernameLookup({ userId, username: newUsername });
}

export async function deleteUserFile(fileUrl: string | null) {
  if (!fileUrl) return;

  try {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split("/");
    const bucketIndex = pathParts.indexOf("resumes");

    if (bucketIndex === -1) {
      logger.warn({ fileUrl }, "Invalid file URL format");
      return;
    }

    const filePath = pathParts.slice(bucketIndex + 1).join("/");

    const { error } = await supabase.storage.from("resumes").remove([filePath]);

    if (error) {
      logger.error(
        { fileUrl, error: error.message },
        "Failed to delete file from storage"
      );
      throw error;
    }

    logger.debug({ filePath }, "File deleted from storage");
  } catch (error) {
    logger.error(
      {
        fileUrl,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      "Error deleting file from storage"
    );
    throw error;
  }
}

export async function deleteUserData(userId: string) {
  try {
    logger.info({ userId }, "Starting user data deletion");

    const resume = await getResume(userId);

    // Idempotency: if no resume exists, data already deleted
    if (!resume) {
      logger.info({ userId }, "User data already deleted or never existed");
      return;
    }

    if (resume?.file_url) {
      await deleteUserFile(resume.file_url);
    }

    const { error: resumeError } = await supabase
      .from("resumes")
      .delete()
      .eq("user_id", userId);

    if (resumeError) {
      logger.error(
        { userId, error: resumeError.message },
        "Failed to delete resume data"
      );
      throw resumeError;
    }

    const { error: usernameError } = await supabase
      .from("usernames")
      .delete()
      .eq("user_id", userId);

    if (usernameError) {
      logger.error(
        { userId, error: usernameError.message },
        "Failed to delete username data"
      );
      throw usernameError;
    }

    logger.info({ userId }, "User data deleted successfully");
  } catch (error) {
    logger.error(
      {
        userId,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      "Failed to delete user data"
    );
    throw error;
  }
}
