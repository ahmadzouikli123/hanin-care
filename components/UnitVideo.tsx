// components/UnitVideo.tsx
"use client"
import { getUnitVideo } from "@/lib/unit-videos"

interface UnitVideoProps {
  unitId: number
  levelColor: string
}

export default function UnitVideo({ unitId, levelColor }: UnitVideoProps) {
  const video = getUnitVideo(unitId)
  if (!video) return null

  const searchQuery = encodeURIComponent(video.title + " " + video.channel)
  const youtubeSearch = `https://www.youtube.com/results?search_query=${searchQuery}`
  const youtubeLink = `https://www.youtube.com/watch?v=${video.videoId}`

  return (
    <div style={{
      background: "white", borderRadius: 16,
      border: `1px solid ${levelColor}30`,
      overflow: "hidden", marginBottom: "2rem",
      boxShadow: "var(--shadow)",
    }}>
      {/* Header */}
      <div style={{
        padding: "0.85rem 1.5rem",
        background: `linear-gradient(135deg,${levelColor}12,${levelColor}05)`,
        borderBottom: `1px solid ${levelColor}20`,
        display: "flex", alignItems: "center", gap: "0.75rem",
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "white", flexShrink: 0 }}>▶</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text)" }}>📺 Recommended Learning Video</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Opens on YouTube — free educational content</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Thumbnail */}
        <a href={youtubeLink} target="_blank" rel="noopener noreferrer"
          style={{ flexShrink: 0, borderRadius: 10, overflow: "hidden", width: 180, display: "block", position: "relative" }}>
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
            alt={video.title}
            style={{ width: "100%", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.9rem" }}>▶</div>
          </div>
        </a>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 160 }}>
          <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.35rem", lineHeight: 1.4 }}>{video.title}</h4>
          <div style={{ fontSize: "0.78rem", color: "var(--text-light)", marginBottom: "0.6rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <span>📺 {video.channel}</span>
            <span>⏱ {video.duration}</span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-light)", lineHeight: 1.6, marginBottom: "0.9rem" }}>{video.description}</p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer"
              style={{ background: "#FF0000", color: "white", padding: "0.45rem 1rem", borderRadius: 8, fontWeight: 700, fontSize: "0.8rem", textDecoration: "none" }}>
              ▶ Watch Video
            </a>
            <a href={youtubeSearch} target="_blank" rel="noopener noreferrer"
              style={{ background: "var(--bg)", color: "var(--text-light)", padding: "0.45rem 1rem", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", border: "1px solid var(--border)" }}>
              🔍 Find Similar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
