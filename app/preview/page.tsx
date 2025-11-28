import { Suspense } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getResume,
  storeResume,
  getUsernameById,
  createUsernameLookup,
  checkUsernameAvailability,
} from "@/lib/server/supabase-actions";
import { generateResumeObject } from "@/lib/server/ai/generate-resume-object";
import { logger } from "@/lib/server/logger";
import { Spinner } from "@/components/ui/spinner";
import { PreviewClient } from "@/components/preview/preview-client";
import { nanoid } from "nanoid";

export const maxDuration = 40;

function generateUsernameFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30);
}

async function ProcessPreview() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const resume = await getResume(userId);

  if (!resume?.file_content) {
    logger.warn({ userId }, "No PDF content found, redirecting to upload");
    redirect("/upload");
  }

  let resumeData = resume.resume_data;
  let showFallbackTip = false;

  // Generate resume data if not exists
  if (!resumeData) {
    logger.info({ userId }, "Generating resume data from PDF content");

    const result = await generateResumeObject(resume.file_content);
    resumeData = result.data;
    showFallbackTip = result.usedFallback;

    // Save generated data to database
    await storeResume(userId, { resumeData });

    logger.info(
      { userId, usedFallback: result.usedFallback },
      "Resume data saved"
    );
  }

  // Handle username generation
  let username = await getUsernameById(userId);

  if (!username && user) {
    // Generate username from name with random salt
    const baseName = user.firstName
      ? generateUsernameFromName(
          `${user.firstName} ${user.lastName || ""}`.trim()
        )
      : "user";

    const salt = nanoid(6);
    let candidateUsername = `${baseName}-${salt}`;

    // Check availability and create
    const availability = await checkUsernameAvailability(candidateUsername);

    if (availability.available) {
      await createUsernameLookup({ userId, username: candidateUsername });
      username = candidateUsername;
      logger.info({ userId, username }, "Username created");
    } else {
      // Try with a different salt
      candidateUsername = `${baseName}-${nanoid(8)}`;
      await createUsernameLookup({ userId, username: candidateUsername });
      username = candidateUsername;
      logger.info({ userId, username }, "Username created with longer salt");
    }
  }

  return (
    <PreviewClient
      resumeData={resumeData}
      username={username}
      showFallbackTip={showFallbackTip}
    />
  );
}

function LoadingFallback() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <Spinner className="h-8 w-8" />
      <p className="text-lg text-muted-foreground">
        Creating your personal website...
      </p>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProcessPreview />
    </Suspense>
  );
}
