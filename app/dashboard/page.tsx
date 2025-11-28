import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getResume, getUsernameById } from "@/lib/server/supabase-actions"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const [resume, username] = await Promise.all([getResume(userId), getUsernameById(userId)])

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <DashboardContent initialResume={resume} initialUsername={username} />
      </div>
    </main>
  )
}
