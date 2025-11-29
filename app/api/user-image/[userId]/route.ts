import { type NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return NextResponse.json({
      imageUrl: user.imageUrl || null,
    });
  } catch (error) {
    console.error("Error fetching user image:", error);
    return NextResponse.json({ imageUrl: null }, { status: 200 });
  }
}
