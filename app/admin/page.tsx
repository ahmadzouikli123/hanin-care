import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Users, Award, ClipboardCheck, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const [
    { count: totalUsers },
    { count: totalCerts },
    { count: totalAttempts },
    { count: passed },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user"),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }).eq("passed", true),
  ])

  const passRate = totalAttempts ? Math.round(((passed ?? 0) / totalAttempts) * 100) : 0

  const cards = [
    { label: "Total Users", value: totalUsers ?? 0, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Certificates", value: totalCerts ?? 0, icon: Award, color: "bg-teal-50 text-teal-600" },
    { label: "Quiz Attempts", value: totalAttempts ?? 0, icon: ClipboardCheck, color: "bg-purple-50 text-purple-600" },
    { label: "Pass Rate", value: `${passRate}%`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Hanin Care Admin Panel</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">{label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}