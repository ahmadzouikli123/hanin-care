// app/admin/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Users, Award, ClipboardCheck, TrendingUp } from 'lucide-react'
import AdminCharts from '@/components/admin/AdminCharts'

async function getStats() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const [
    { count: totalUsers },
    { count: totalCertificates },
    { count: totalAttempts },
    { count: passedAttempts },
    { data: recentUsers },
    { data: dailySignups },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'user'),
    supabase.from('certificates').select('*', { count: 'exact', head: true }),
    supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }),
    supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('passed', true),
    supabase
      .from('profiles')
      .select('full_name, email, created_at')
      .eq('role', 'user')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('profiles')
      .select('created_at')
      .eq('role', 'user')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  // Build last 30 days chart data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return d.toISOString().split('T')[0]
  })

  const signupsByDay: Record<string, number> = {}
  dailySignups?.forEach((u) => {
    const day = u.created_at.split('T')[0]
    signupsByDay[day] = (signupsByDay[day] ?? 0) + 1
  })

  const chartData = last30Days.map((day) => ({
    date: day.slice(5), // MM-DD
    signups: signupsByDay[day] ?? 0,
  }))

  const passRate = totalAttempts ? Math.round(((passedAttempts ?? 0) / totalAttempts) * 100) : 0

  return {
    totalUsers: totalUsers ?? 0,
    totalCertificates: totalCertificates ?? 0,
    totalAttempts: totalAttempts ?? 0,
    passRate,
    recentUsers: recentUsers ?? [],
    chartData,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      change: 'Registered learners',
    },
    {
      label: 'Certificates Issued',
      value: stats.totalCertificates,
      icon: Award,
      color: 'bg-teal-50 text-teal-600',
      change: 'Total earned',
    },
    {
      label: 'Quiz Attempts',
      value: stats.totalAttempts,
      icon: ClipboardCheck,
      color: 'bg-purple-50 text-purple-600',
      change: 'All time',
    },
    {
      label: 'Pass Rate',
      value: `${stats.passRate}%`,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      change: 'Of all attempts',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back — here's what's happening</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">{label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{change}</p>
          </div>
        ))}
      </div>

      {/* Charts + Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">New Signups — Last 30 Days</h2>
          <AdminCharts data={stats.chartData} />
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Registrations</h2>
          <div className="space-y-3">
            {stats.recentUsers.length === 0 && (
              <p className="text-sm text-gray-400">No users yet</p>
            )}
            {stats.recentUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <span className="text-teal-700 text-xs font-bold">
                    {u.full_name?.[0]?.toUpperCase() ?? u.email?.[0]?.toUpperCase() ?? '?'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{u.full_name ?? '—'}</p>
                  <p className="text-xs text-gray-400 truncate">{u.email}</p>
                </div>
                <p className="text-xs text-gray-400 ml-auto shrink-0">
                  {new Date(u.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
