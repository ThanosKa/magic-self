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

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    logger.info(
      {
        svixId,
        svixTimestamp,
        svixSignature: svixSignature ? "present" : "missing",
        allHeaders: Object.fromEntries(request.headers.entries()),
      },
      "Webhook headers received"
    );

    if (!svixId || !svixTimestamp || !svixSignature) {
      logger.error(
        {
          svixId: !!svixId,
          svixTimestamp: !!svixTimestamp,
          svixSignature: !!svixSignature,
        },
        "Missing required Svix headers"
      );
      return NextResponse.json(
        { error: "Missing required webhook headers" },
        { status: 400 }
      );
    }

    const evt = await verifyWebhook(request, {
      signingSecret,
    });

    const eventType = evt.type;
    const eventData = evt.data;

    logger.info({ eventType }, "Received Clerk webhook event");

    // Handle user.deleted asynchronously to prevent timeouts
    if (eventType === "user.deleted") {
      const userId = eventData.id;

      if (!userId || typeof userId !== "string") {
        logger.error({ eventType }, "Invalid user ID in user.deleted event");
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }

      logger.info(
        { userId },
        "Processing user deletion webhook - starting async deletion"
      );

      // Fire-and-forget: acknowledge receipt immediately, process deletion in background
      deleteUserData(userId)
        .then(() => {
          logger.info({ userId }, "User data deleted successfully via webhook");
        })
        .catch((error) => {
          logger.error(
            {
              userId,
              error: error instanceof Error ? error.message : "Unknown error",
            },
            "Failed to delete user data via webhook"
          );
          // TODO: Consider implementing retry logic or dead letter queue for failed deletions
        });

      return NextResponse.json(
        { message: "User deletion initiated successfully" },
        { status: 200 }
      );
    }

    if (eventType === "user.created") {
      const userData = eventData as {
        id: string;
        email_addresses?: Array<{ id: string; email_address: string }>;
        primary_email_address_id?: string;
      };
      const userId = userData.id;
      const emailAddresses = userData.email_addresses || [];
      const primaryEmail =
        emailAddresses.find(
          (email) => email.id === userData.primary_email_address_id
        )?.email_address ||
        emailAddresses[0]?.email_address ||
        "unknown";

      logger.info({ userId, email: primaryEmail }, "User created via webhook");
    } else if (eventType === "user.updated") {
      const userData = eventData as unknown as {
        id: string;
        [key: string]: unknown;
      };
      const userId = userData.id;
      const updatedFields = Object.keys(userData).filter(
        (key) => !["id", "object"].includes(key)
      );

      logger.info({ userId, updatedFields }, "User updated via webhook");
    } else if (eventType === "email.created") {
      const emailData = eventData as {
        id: string;
        email_address?: string;
        user_id?: string;
      };
      const emailId = emailData.id;
      const emailAddress = emailData.email_address || "unknown";
      const userId = emailData.user_id || "unknown";

      logger.info(
        { emailId, emailAddress, userId },
        "Email created via webhook"
      );
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
