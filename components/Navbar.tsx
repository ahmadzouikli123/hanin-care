"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Navbar() {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")   // ← back to landing page
  }

  const links = [
    { href: "/dashboard",            label: "Dashboard"  },
    { href: "/dashboard/curriculum", label: "Curriculum" },
    { href: "/dashboard/quiz/1",     label: "Quizzes"    },
    { href: "/dashboard/profile",    label: "Profile"    },
  ]

  return (
    <nav style={{ background:"#fff", boxShadow:"0 2px 20px rgba(15,90,138,0.08)", position:"fixed", top:0, width:"100%", zIndex:1000, padding:"0.7rem 2rem", borderBottom:"3px solid var(--primary)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <Link href="/dashboard" style={{ display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none" }}>
          <img src="/logo.png" alt="Hanin Care" style={{ width:44, height:44, objectFit:"contain" }} />
          <div>
            <span style={{ fontFamily:"\"Playfair Display\",serif", fontSize:"1.4rem", fontWeight:800, color:"var(--primary)" }}>Hanin Care</span>
            <span style={{ fontSize:"0.58rem", fontWeight:500, color:"var(--text-light)", letterSpacing:2, textTransform:"uppercase", display:"block" }}>Canada · PSW Training</span>
          </div>
        </Link>
        <ul style={{ display:"flex", gap:"0.25rem", listStyle:"none", alignItems:"center" }}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{ textDecoration:"none", color:pathname.startsWith(href.split("/").slice(0,3).join("/"))?"var(--primary)":"var(--text-light)", fontWeight:500, fontSize:"0.9rem", padding:"0.5rem 1rem", borderRadius:8, background:pathname.startsWith(href.split("/").slice(0,3).join("/"))?"var(--beg-bg)":"transparent", display:"block" }}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={logout} style={{ background:"var(--primary)", color:"white", padding:"0.6rem 1.4rem", borderRadius:8, fontWeight:600, fontSize:"0.9rem", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}