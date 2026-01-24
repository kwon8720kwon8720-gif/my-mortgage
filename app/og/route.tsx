import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mortgage Calculator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Mortgage Calculator
          </div>
          <div
            style={{
              fontSize: 36,
              opacity: 0.9,
              textAlign: "center",
            }}
          >
            Calculate Your Monthly Payment
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
