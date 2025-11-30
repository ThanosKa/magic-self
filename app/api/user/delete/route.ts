import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { deleteUserData } from "@/lib/server/supabase-actions";
import { logger } from "@/lib/server/logger";

export async function DELETE() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        logger.info({ userId }, "Initiating user account deletion");

        await deleteUserData(userId);

        const client = await clerkClient();
        await client.users.deleteUser(userId);

        logger.info({ userId }, "User account deleted successfully");

        return NextResponse.json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        logger.error(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            "Failed to delete user account"
        );

        return NextResponse.json(
            {
                error: "Failed to delete account",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
