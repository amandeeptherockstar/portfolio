import React from "react";

import { ImageResponse } from "@vercel/og";
import { allBlogs } from ".contentlayer/generated";
import { appConfig } from "@/appConfig";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  if (!post) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          background: "#121212",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "88px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, #121212, #1a1a1a)",
            maskImage:
              "radial-gradient(circle, rgba(0,0,0,0.4) 20%, rgba(0,0,0,1) 80%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
        <div
          style={{
            padding: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{ fontSize: "54px", color: "#f5f5f5", lineHeight: "1.4" }}
          >
            {post.title}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "40px",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#9ca3af", fontSize: "20px" }}>
            {appConfig.name}
          </div>
          <div style={{ padding: "0 8px", color: "#6b7280", fontSize: "20px" }}>
            |
          </div>
          <div style={{ color: "#9ca3af", fontSize: "20px" }}>Blog</div>
          <div style={{ padding: "0 8px", color: "#6b7280", fontSize: "20px" }}>
            |
          </div>
          <div style={{ color: "#9ca3af", fontSize: "20px" }}>
            {appConfig.url}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
