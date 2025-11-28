import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getResume, getUsernameById } from "@/lib/server/supabase-actions";
import { PreviewClient } from "@/components/preview/preview-client";

export default async function PreviewPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [resume, username] = await Promise.all([
    getResume(userId),
    getUsernameById(userId),
  ]);

  if (!resume || !resume.resume_data) {
    redirect("/upload");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-12">
      <PreviewClient initialResume={resume} initialUsername={username} />
    </main>
  );
}

