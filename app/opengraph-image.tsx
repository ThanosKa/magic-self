import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/config";

export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 16,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontFamily: "system-ui",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          maxWidth: "800px",
        }}
      >
        {/* Badge - matches your landing page */}
        <div
          style={{
            background: "#f3f4f6",
            color: "#374151",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          100% free & open source
        </div>

        {/* Heading - matches your landing page */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          LinkedIn → Website in one click
        </div>

        {/* Description - matches your landing page */}
        <div
          style={{
            fontSize: "32px",
            color: "#6b7280",
            lineHeight: 1.4,
            marginBottom: "40px",
            maxWidth: "600px",
          }}
        >
          Turn your resume or LinkedIn PDF export into a beautiful, professional website. Share your profile with a simple link.
        </div>

        {/* Button - matches your landing page */}
        <div
          style={{
            background: "#000000",
            color: "white",
            padding: "16px 32px",
            borderRadius: "8px",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          Upload Resume
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
