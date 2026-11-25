import { ImageResponse } from "next/og";
import { ORMA_MARK_PATH, ORMA_MARK_ROTATION } from "@/components/common/Logo";

export const alt = "ORMA — Siti web, fotografia e video per strutture ricettive in Sardegna";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#27352d",
          color: "#f5f1e9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 44, letterSpacing: 8 }}>
          <svg width="40" height="44" viewBox="0 0 40 44">
            <path fill="#f5f1e9" fillRule="evenodd" transform={ORMA_MARK_ROTATION} d={ORMA_MARK_PATH} />
          </svg>
          RMA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 0.95 }}>Ogni luogo</div>
          <div style={{ fontSize: 104, lineHeight: 0.95, display: "flex" }}>
            lascia un’<span style={{ fontStyle: "italic", color: "#d8ccba" }}>orma.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, fontFamily: "sans-serif", letterSpacing: 4, color: "#d8ccba" }}>
          SITI WEB · FOTOGRAFIA · VIDEO — HOSPITALITY IN SARDEGNA
        </div>
      </div>
    ),
    size,
  );
}
