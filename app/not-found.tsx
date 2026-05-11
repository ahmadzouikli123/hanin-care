"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0A3D5C,#0F5A8A)" }}>
      <div style={{ background:"white", borderRadius:24, padding:"3rem 2.5rem", maxWidth:480, width:"100%", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize:"5rem", marginBottom:"1rem" }}>🔍</div>
        <h1 style={{ fontFamily:"Playfair Display,serif", fontSize:"4rem", color:"#0A3D5C", marginBottom:"0.5rem", fontWeight:800 }}>404</h1>
        <h2 style={{ fontSize:"1.4rem", color:"#374151", marginBottom:"1rem" }}>Page Not Found</h2>
        <p style={{ color:"#6B7280", lineHeight:1.8, marginBottom:"2rem" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/dashboard" style={{ background:"#0F5A8A", color:"white", padding:"0.85rem 2rem", borderRadius:10, textDecoration:"none", fontWeight:700 }}>
            Go to Dashboard
          </Link>
          <Link href="/" style={{ background:"transparent", border:"2px solid #0F5A8A", color:"#0F5A8A", padding:"0.85rem 2rem", borderRadius:10, textDecoration:"none", fontWeight:600 }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}