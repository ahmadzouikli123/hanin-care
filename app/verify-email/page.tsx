"use client"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0A3D5C,#0F5A8A)" }}>
      <div style={{ background:"white", borderRadius:24, padding:"3rem 2.5rem", maxWidth:440, width:"100%", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize:"4rem", marginBottom:"1.5rem" }}>📧</div>
        <h1 style={{ fontFamily:"Playfair Display,serif", fontSize:"1.8rem", color:"#0A3D5C", marginBottom:"0.75rem" }}>Check your email</h1>
        <p style={{ color:"#6B7280", lineHeight:1.8, marginBottom:"2rem", fontSize:"0.95rem" }}>
          We sent a confirmation link to your email address. Please click the link to activate your account before signing in.
        </p>
        <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"2rem", color:"#15803D", fontSize:"0.88rem" }}>
          ✅ Registration successful! Check your inbox.
        </div>
        <p style={{ color:"#9CA3AF", fontSize:"0.82rem", marginBottom:"1.5rem" }}>
          Did not receive the email? Check your spam folder or contact support.
        </p>
        <Link href="/login" style={{ background:"#0F5A8A", color:"white", padding:"0.85rem 2rem", borderRadius:10, textDecoration:"none", fontWeight:700, display:"inline-block" }}>
          Go to Login →
        </Link>
      </div>
    </div>
  )
}