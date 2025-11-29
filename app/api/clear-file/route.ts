import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { storeResume } from "@/lib/server/supabase-actions";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await storeResume(userId, {
      fileName: null,
      fileUrl: null,
      fileSize: null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in clear-file API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
