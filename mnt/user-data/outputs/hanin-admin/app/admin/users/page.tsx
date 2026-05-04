// app/admin/users/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Search } from 'lucide-react'
import UserRoleBadge from '@/components/admin/UserRoleBadge'
import UserActions from '@/components/admin/UserActions'

interface UserRow {
  id: string
  full_name: string | null
  email: string
  role: string
  created_at: string
  total_attempts: number
  passed_count: number
  certificates_count: number
  last_activity: string | null
}

async function getUsers(): Promise<UserRow[]> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  // Try the view first, fall back to profiles table
  const { data, error } = await supabase
    .from('admin_users_overview')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // Fallback: just get profiles without stats
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })

    return (profiles ?? []).map((p) => ({
      ...p,
      total_attempts: 0,
      passed_count: 0,
      certificates_count: 0,
      last_activity: null,
    }))
  }

  return data ?? []
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const allUsers = await getUsers()

  const users = q
    ? allUsers.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q.toLowerCase()) ||
          u.email.toLowerCase().includes(q.toLowerCase())
      )
    : allUsers

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            {allUsers.length} registered learners
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <form>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name or email…"
            className="w-full max-w-sm pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg
                       bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                User
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Role
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Attempts
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Passed
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Certificates
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Joined
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Last Activity
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-400">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <span className="text-teal-700 text-xs font-bold">
                        {user.full_name?.[0]?.toUpperCase() ??
                          user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.full_name ?? '—'}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <UserRoleBadge role={user.role} />
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="text-gray-700 font-medium">
                    {user.total_attempts}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="text-green-600 font-medium">
                    {user.passed_count}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="text-teal-600 font-medium">
                    {user.certificates_count}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {new Date(user.created_at).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {user.last_activity
                    ? new Date(user.last_activity).toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '—'}
                </td>
                <td className="px-5 py-4">
                  <UserActions userId={user.id} userEmail={user.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
