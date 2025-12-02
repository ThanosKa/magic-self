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
        fontSize: 60,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "system-ui",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: 80,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 120, height: 120 }}
        >
          <rect
            x="20"
            y="30"
            width="50"
            height="45"
            rx="6"
            stroke="white"
            strokeWidth="6"
            transform="rotate(-10 50 50)"
            opacity="0.4"
          />
          <rect
            x="25"
            y="30"
            width="50"
            height="45"
            rx="6"
            stroke="white"
            strokeWidth="6"
            transform="rotate(-5 50 50)"
            opacity="0.7"
          />
          <rect
            x="30"
            y="30"
            width="50"
            height="45"
            rx="6"
            stroke="white"
            strokeWidth="6"
            fill="none"
          />
          <line
            x1="40"
            y1="45"
            x2="70"
            y2="45"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="55"
            x2="70"
            y2="55"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="65"
            x2="60"
            y2="65"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: "bold" }}>
            {SITE_CONFIG.name}
          </div>
          <div style={{ fontSize: 36, opacity: 0.9 }}>
            {SITE_CONFIG.tagline}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
