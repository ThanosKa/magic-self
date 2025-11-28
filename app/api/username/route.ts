import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  getUsernameById,
  checkUsernameAvailability,
  updateUsername,
} from "@/lib/server/supabase-actions";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = await getUsernameById(user.id);

    return NextResponse.json({ username });
  } catch (error) {
    console.error("Get username error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await request.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check availability
    const availability = await checkUsernameAvailability(username);

    if (!availability.available) {
      return NextResponse.json({ error: availability.reason }, { status: 400 });
    }

    const result = await updateUsername(user.id, username);

    return NextResponse.json({ username: result.username });
  } catch (error) {
    console.error("Update username error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
