import { type NextRequest, NextResponse } from "next/server"
import { checkUsernameAvailability } from "@/lib/server/supabase-actions"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const result = await checkUsernameAvailability(username)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Check username error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
