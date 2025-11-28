import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getResume, storeResume } from "@/lib/server/supabase-actions";
import { scrapePdfContent } from "@/lib/server/scrape-pdf-content";
import { pdfLogger } from "@/lib/server/logger";
import { Spinner } from "@/components/ui/spinner";

export const maxDuration = 40;

async function ProcessPdf() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const resume = await getResume(userId);

  if (!resume?.file_url) {
    pdfLogger.warn({ userId }, "No PDF file found, redirecting to upload");
    redirect("/upload");
  }

  // If content already extracted, go to preview
  if (resume.file_content) {
    pdfLogger.info(
      { userId },
      "PDF content already extracted, redirecting to preview"
    );
    redirect("/preview");
  }

  try {
    // Extract text from PDF
    pdfLogger.info(
      { userId, fileUrl: resume.file_url },
      "Extracting PDF content"
    );
    const fileContent = await scrapePdfContent(resume.file_url);

    // Save extracted content to database
    await storeResume(userId, { fileContent });

    pdfLogger.info({ userId }, "PDF content saved, redirecting to preview");
  } catch (error) {
    pdfLogger.error(
      {
        userId,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      "Failed to process PDF"
    );
    // Even on error, redirect to preview - it will handle the missing content
  }

  redirect("/preview");

  return null;
}

function LoadingFallback() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <Spinner className="h-8 w-8" />
      <p className="text-lg text-muted-foreground">
        Reading your resume carefully...
      </p>
    </main>
  );
}

export default function PdfPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProcessPdf />
    </Suspense>
  );
}
