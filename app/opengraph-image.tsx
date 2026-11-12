import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/** Approved logo lockups (outlined SVGs, so no fonts are needed). */
async function brandSvg(file: string) {
  const svg = await readFile(join(process.cwd(), "public", "brand", file), "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export const alt = `Sanyagold Accounting, Advisory and Consulting Services and W O Oyebamiji CPA LLC`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [sanyagoldLogo, cpaLogo] = await Promise.all([
    brandSvg("sanyagold-logo.svg"),
    brandSvg("wo-oyebamiji-cpa-logo.svg"),
  ]);
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
      {/* The lockups carry 20/140 padding, so offset them to align with the text. */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, margin: "-14px 0 0 -14px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain img */}
        <img src={sanyagoldLogo} alt="" width={366} height={92} />
        <div style={{ display: "flex", width: 2, height: 56, background: "#D8CDB6" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain img */}
        <img src={cpaLogo} alt="" width={350} height={92} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 700, maxWidth: 980 }}>
          Accounting, tax and advisory for Minnesota nonprofits and small businesses.
        </span>
        <span style={{ fontSize: 26, color: "#4A5568", fontFamily: "sans-serif" }}>
          Sanyagold Accounting, Advisory and Consulting Services · W O Oyebamiji CPA LLC
        </span>
        <span style={{ fontSize: 26, color: "#4A5568", fontFamily: "sans-serif" }}>
          Book a free consultation · {siteConfig.contact.phone}
        </span>
      </div>
      <div style={{ display: "flex", height: 10, width: 220, background: "#C5A15A", borderRadius: 999 }} />
    </div>,
    size,
  );
}
