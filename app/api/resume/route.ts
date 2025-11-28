import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getResume, storeResume } from "@/lib/server/supabase-actions";
import { ResumeDataSchema } from "@/lib/schemas/resume";
import { logger } from "@/lib/server/logger";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await getResume(user.id);

    return NextResponse.json({ resume });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Get resume error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate resume data if provided
    if (body.resumeData) {
      const result = ResumeDataSchema.safeParse(body.resumeData);
      if (!result.success) {
        return NextResponse.json(
          { error: "Invalid resume data", details: result.error.flatten() },
          { status: 400 }
        );
      }
      body.resumeData = result.data;
    }

    const resume = await storeResume(user.id, body);

    return NextResponse.json({ resume });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Update resume error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Only allow status updates via PATCH
    if (body.status && !["draft", "live"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const resume = await storeResume(user.id, { status: body.status });
    logger.info(
      { userId: user.id, status: body.status },
      "Resume status updated"
    );

    return NextResponse.json({ resume });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : "Unknown error" },
      "Update status error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
