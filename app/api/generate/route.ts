import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getResume, storeResume } from "@/lib/server/supabase-actions";
import { scrapePdfContent } from "@/lib/server/scrape-pdf-content";
import { generateResumeObject } from "@/lib/server/ai/generate-resume-object";
import { ensureUsername } from "@/lib/server/username";
import { logger } from "@/lib/server/logger";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await getResume(userId);

    if (!resume?.file_url) {
      return NextResponse.json(
        { error: "Upload a resume before generating" },
        { status: 400 }
      );
    }

    let fileContent = resume.file_content;

    if (!fileContent) {
      logger.info({ userId }, "Extracting PDF content before generation");
      fileContent = await scrapePdfContent(resume.file_url);
      await storeResume(userId, { fileContent });
    }

    let resumeData = resume.resume_data;
    let usedFallback = false;

    if (!resumeData && fileContent) {
      logger.info({ userId }, "Generating resume data for workspace");
      const result = await generateResumeObject(fileContent);
      resumeData = result.data;
      usedFallback = result.usedFallback;
      await storeResume(userId, { resumeData });
    }

    const username = await ensureUsername(userId);
    const updatedResume = await getResume(userId);

    return NextResponse.json({
      resume: updatedResume,
      username,
      usedFallback,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Generation error"
    );
    return NextResponse.json(
      { error: "Failed to generate website" },
      { status: 500 }
    );
  }
}
