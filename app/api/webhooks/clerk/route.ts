import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { deleteUserData } from "@/lib/server/supabase-actions";
import { logger } from "@/lib/server/logger";

export async function POST(request: NextRequest) {
    try {
        const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

        if (!signingSecret) {
            logger.error("Missing CLERK_WEBHOOK_SIGNING_SECRET environment variable");
            return NextResponse.json(
                { error: "Webhook configuration error" },
                { status: 500 }
            );
        }

        const evt = await verifyWebhook(request, {
            signingSecret,
        });

        const eventType = evt.type;
        const { id } = evt.data;

        if (!id || typeof id !== "string") {
            logger.error({ eventType }, "Invalid user ID in webhook event");
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const userId = id;

        logger.info({ eventType, userId }, "Received Clerk webhook event");

        if (eventType === "user.deleted") {
            logger.info({ userId }, "Processing user deletion webhook");

            try {
                await deleteUserData(userId);
                logger.info({ userId }, "User data deleted successfully via webhook");
            } catch (error) {
                logger.error(
                    {
                        userId,
                        error: error instanceof Error ? error.message : "Unknown error",
                    },
                    "Failed to delete user data via webhook"
                );
                return NextResponse.json(
                    { error: "Failed to delete user data" },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(
            { message: "Webhook processed successfully" },
            { status: 200 }
        );
    } catch (error) {
        logger.error(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            "Webhook verification failed"
        );

        return NextResponse.json(
            { error: "Invalid webhook signature" },
            { status: 400 }
        );
    }
}
