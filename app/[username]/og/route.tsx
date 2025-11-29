import { ImageResponse } from "next/og";
import { getUserIdByUsername, getResume } from "@/lib/server/supabase-actions";
import { SITE_CONFIG } from "@/lib/config";
import { truncateText } from "@/lib/utils";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return new Response("Not found", { status: 404 });
    }

    const resume = await getResume(userId);

    if (!resume?.resume_data || resume.status !== "live") {
      return new Response("Not found", { status: 404 });
    }

    const resumeData = resume.resume_data as {
      header: {
        name: string;
        shortAbout: string;
        location?: string;
      };
    };

    const { name, shortAbout, location } = resumeData.header;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1f1f1f",
            }}
          >
            {SITE_CONFIG.name}
          </div>
          {location && (
            <div
              style={{
                fontSize: "18px",
                color: "#6B7280",
              }}
            >
              {location}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: "#1f1f1f",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#5d5d5d",
              lineHeight: 1.4,
            }}
          >
            {truncateText(shortAbout, 90)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "#6B7280",
            }}
          >
            {SITE_CONFIG.domain}/{username}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Error generating image", { status: 500 });
  }
}
