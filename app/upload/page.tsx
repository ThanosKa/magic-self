import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getResume } from "@/lib/server/supabase-actions"
import { UploadForm } from "@/components/upload/upload-form"

export default async function UploadPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const resume = await getResume(userId)

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold">Upload Resume</h1>
        <UploadForm
          existingFile={
            resume?.file_name
              ? {
                  name: resume.file_name,
                  size: resume.file_size || 0,
                  url: resume.file_url || undefined,
                }
              : undefined
          }
        />
      </div>
    </main>
  )
}
