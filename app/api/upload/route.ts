import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { storeResume, getResume } from "@/lib/server/supabase-actions";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "@/lib/config";
import { logger } from "@/lib/server/logger";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    logger.info({ userId: user.id }, "Upload request received");

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      logger.warn({ userId: user.id }, "No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (
      !ALLOWED_FILE_TYPES.includes(
        file.type as (typeof ALLOWED_FILE_TYPES)[number]
      )
    ) {
      logger.warn(
        { userId: user.id, fileType: file.type },
        "Invalid file type"
      );
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      logger.warn({ userId: user.id, fileSize: file.size }, "File too large");
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Delete old file if exists
    const existingResume = await getResume(user.id);
    if (existingResume?.file_url) {
      const oldPath = existingResume.file_url.split("/").slice(-2).join("/");
      await supabase.storage.from("resumes").remove([oldPath]);
      logger.debug({ userId: user.id, oldPath }, "Old file deleted");
    }

    // Upload new file
    const timestamp = Date.now();
    const fileName = `${user.id}/${timestamp}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      logger.error(
        { userId: user.id, error: uploadError.message },
        "Upload failed"
      );
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(fileName);

    await storeResume(user.id, {
      fileName: file.name,
      fileUrl: urlData.publicUrl,
      fileSize: file.size,
      fileContent: undefined, // Clear previous content so it gets re-extracted
      resumeData: undefined, // Clear previous resume data so it gets re-generated
    });

    logger.info({ userId: user.id, fileName: file.name }, "Upload successful");

    return NextResponse.json({
      success: true,
      fileUrl: urlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Upload error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
