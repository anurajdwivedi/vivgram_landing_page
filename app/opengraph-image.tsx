import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt =
  "Vivgram: Research Operations & Lifecycle Management Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #082B63 0%, #0D4297 50%, #082B63 100%)",
        }}
      >
        {/* Dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            width={180}
            height={176}
            alt=""
            style={{ objectFit: "contain" }}
          />

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Vivgram
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                maxWidth: 700,
              }}
            >
              Research Operations & Lifecycle Management Platform
            </div>
          </div>

          {/* Tagline bar */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "20px",
              padding: "16px 32px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {["50% Time Saved", "100% Audit Ready", "Zero Spreadsheets"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ADE80",
                      display: "flex",
                    }}
                  />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
