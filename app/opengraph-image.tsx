import { ImageResponse } from "next/og";
import siteConfig from "@/data/siteConfig.json";

export const alt = `${siteConfig.name} – ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const highlights = ["React", "Next.js", "Node.js", "Electron", "BLE / UART", "WebSocket"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #134e4a 100%)",
          color: "white"
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a5b4fc", letterSpacing: 6 }}>
          {siteConfig.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 44, color: "#5eead4" }}>{siteConfig.jobTitle}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {highlights.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid rgba(165,180,252,0.5)",
                fontSize: 26,
                color: "#e0e7ff"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
