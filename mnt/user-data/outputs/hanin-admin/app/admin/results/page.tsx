// app/admin/results/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CheckCircle, XCircle } from 'lucide-react'

interface QuizAttempt {
  id: string
  user_id: string
  unit_id: string | number
  score: number
  max_score: number
  passed: boolean
  created_at: string
  profiles: {
    full_name: string | null
    email: string
  } | null
}

async function getResults(): Promise<QuizAttempt[]> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const { data } = await supabase
    .from('quiz_attempts')
    .select(`
      id,
      user_id,
      unit_id,
      score,
      max_score,
      passed,
      created_at,
      profiles (full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  return (data as QuizAttempt[]) ?? []
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const allResults = await getResults()

  const results =
    filter === 'passed'
      ? allResults.filter((r) => r.passed)
      : filter === 'failed'
        ? allResults.filter((r) => !r.passed)
        : allResults

  const totalPassed = allResults.filter((r) => r.passed).length
  const totalFailed = allResults.length - totalPassed
  const passRate = allResults.length
    ? Math.round((totalPassed / allResults.length) * 100)
    : 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
        <p className="text-sm text-gray-500 mt-1">
          All quiz attempts — most recent first
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <a
          href="/admin/results"
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors
            ${!filter ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
        >
          All ({allResults.length})
        </a>
        <a
          href="/admin/results?filter=passed"
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors
            ${filter === 'passed' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}
        >
          Passed ({totalPassed})
        </a>
        <a
          href="/admin/results?filter=failed"
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors
            ${filter === 'failed' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200 hover:border-red-400'}`}
        >
          Failed ({totalFailed})
        </a>
        <span className="ml-auto text-xs text-gray-400 self-center">
          Pass rate: <strong className="text-gray-700">{passRate}%</strong>
        </span>
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
                Unit
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Score
              </th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Result
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {results.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                  No results found
                </td>
              </tr>
            )}
            {results.map((r) => {
              const pct = r.max_score ? Math.round((r.score / r.max_score) * 100) : 0
              return (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {r.profiles?.full_name ?? '—'}
                    </p>
                    <p className="text-xs text-gray-400">{r.profiles?.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                      Unit {r.unit_id}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-semibold text-gray-800">
                        {r.score}/{r.max_score}
                      </span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1">
                        <div
                          className={`h-1.5 rounded-full ${r.passed ? 'bg-green-500' : 'bg-red-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {r.passed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Passed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                        <XCircle className="w-3.5 h-3.5" />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-400">
                    {new Date(r.created_at).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
