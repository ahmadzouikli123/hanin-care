import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { CheckCircle, XCircle } from "lucide-react"

export default async function ResultsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: results } = await supabase
    .from("quiz_attempts")
    .select("id, unit_id, score, max_score, passed, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quiz Results</h1>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Unit</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Result</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {results?.map((r: any) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900">{r.profiles?.full_name ?? "—"}</p>
                  <p className="text-xs text-gray-400">{r.profiles?.email}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">Unit {r.unit_id}</span>
                </td>
                <td className="px-5 py-4 text-center font-medium">{r.score}/{r.max_score}</td>
                <td className="px-5 py-4 text-center">
                  {r.passed
                    ? <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium"><CheckCircle className="w-3.5 h-3.5" />Passed</span>
                    : <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium"><XCircle className="w-3.5 h-3.5" />Failed</span>}
                </td>
                <td className="px-5 py-4 text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}