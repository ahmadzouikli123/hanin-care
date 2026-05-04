import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Award } from "lucide-react"

export default async function CertificatesPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: certs } = await supabase
    .from("certificates")
    .select("id, unit_id, issued_at, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Certificates ({certs?.length ?? 0})</h1>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Recipient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Unit</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Issued</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {certs?.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-12 text-center text-gray-400">No certificates yet</td></tr>
            )}
            {certs?.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-teal-500" />
                    <div>
                      <p className="font-medium text-gray-900">{c.profiles?.full_name ?? "—"}</p>
                      <p className="text-xs text-gray-400">{c.profiles?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700">
                    {c.unit_id ? `Unit ${c.unit_id}` : "Full Program"}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">
                  {new Date(c.issued_at ?? c.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}