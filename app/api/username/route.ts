import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { updateUsername } from "@/lib/server/supabase-actions";
import { logger } from "@/lib/server/logger";
import { z } from "zod";

const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Username can only contain lowercase letters, numbers, and hyphens"
    ),
});

export async function PUT(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateUsernameSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid username format", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { username } = result.data;

    await updateUsername(user.id, username);

    logger.info({ userId: user.id, username }, "Username updated");

    return NextResponse.json({ success: true, username });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Update username error"
    );
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
