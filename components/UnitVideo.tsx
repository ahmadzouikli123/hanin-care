// components/UnitVideo.tsx
// Embed YouTube video for each unit in the theory tab

"use client"
import { useState } from "react"
import { getUnitVideo } from "@/lib/unit-videos"

interface UnitVideoProps {
  unitId: number
  levelColor: string
}

export default function UnitVideo({ unitId, levelColor }: UnitVideoProps) {
  const [loaded, setLoaded] = useState(false)
  const video = getUnitVideo(unitId)

  if (!video) return null

  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      border: "1px solid var(--border)",
      overflow: "hidden",
      marginBottom: "2rem",
      boxShadow: "var(--shadow)",
    }}>
      {/* Header */}
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "var(--bg)",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "#FF0000",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", flexShrink: 0,
        }}>
          ▶
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", marginBottom: "0.2rem" }}>
            {video.title}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-light)", display: "flex", gap: "1rem" }}>
            <span>📺 {video.channel}</span>
            <span>⏱ {video.duration}</span>
          </div>
        </div>
        <span style={{
          background: "#FEF2F2",
          color: "#DC2626",
          padding: "0.2rem 0.7rem",
          borderRadius: 20,
          fontSize: "0.72rem",
          fontWeight: 700,
        }}>
          YouTube
        </span>
      </div>

      {/* Video embed */}
      <div style={{
        position: "relative",
        paddingTop: "56.25%", // 16:9 aspect ratio
        background: "#000",
      }}>
        {!loaded && (
          <div
            onClick={() => setLoaded(true)}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Play button overlay */}
            <div style={{
              width: 70, height: 70,
              borderRadius: "50%",
              background: "rgba(255,0,0,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem",
              color: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              transition: "transform 0.2s",
            }}>
              ▶
            </div>
          </div>
        )}
        {loaded && (
          <iframe
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              border: "none",
            }}
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Description */}
      <div style={{
        padding: "0.85rem 1.5rem",
        borderTop: "1px solid var(--border)",
        fontSize: "0.85rem",
        color: "var(--text-light)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <span>💡</span>
        <span>{video.description}</span>
      </div>
    </div>
  )
}
