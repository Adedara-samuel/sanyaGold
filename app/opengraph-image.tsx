import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #FBF8F3 0%, #F4ECDA 100%)",
        color: "#13213A",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg width="76" height="84" viewBox="-400 -440 800 880" fill="#A4747F">
          <path d="M-30 -428L-390 -220L-390 220L-185 338L200 116L200 -33L89 -33L89 50L-185 208L-277 155L-277 -155L26 -330Z" />
          <path d="M30 428L390 220L390 -220L185 -338L-200 -116L-200 33L-89 33L-89 -50L185 -208L277 -155L277 155L-26 330Z" />
        </svg>
        <span style={{ fontSize: 52, fontWeight: 700, color: "#7E8A88" }}>{siteConfig.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: 960 }}>
          Accounting, tax and advisory for Minnesota nonprofits and small businesses.
        </span>
        <span style={{ fontSize: 26, color: "#4A5568", fontFamily: "sans-serif" }}>
          Sanyagold Accounting, Advisory and Consulting Services · W O Oyebamiji CPA LLC
        </span>
        <span style={{ fontSize: 26, color: "#4A5568", fontFamily: "sans-serif" }}>
          Book a free consultation · {siteConfig.contact.phone}
        </span>
      </div>
      <div style={{ display: "flex", height: 10, width: 220, background: "#C9A227", borderRadius: 999 }} />
    </div>,
    size,
  );
}
