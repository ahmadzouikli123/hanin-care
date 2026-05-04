// app/admin/certificates/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Award, Download } from 'lucide-react'
import IssueCertificateButton from '@/components/admin/IssueCertificateButton'

interface Certificate {
  id: string
  user_id: string
  unit_id: string | number | null
  issued_at: string
  created_at: string
  profiles: {
    full_name: string | null
    email: string
  } | null
}

interface Profile {
  id: string
  full_name: string | null
  email: string
}

async function getData() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const [{ data: certs }, { data: users }] = await Promise.all([
    supabase
      .from('certificates')
      .select('id, user_id, unit_id, issued_at, created_at, profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('role', 'user')
      .order('full_name'),
  ])

  return {
    certificates: (certs as Certificate[]) ?? [],
    users: (users as Profile[]) ?? [],
  }
}

export default async function CertificatesPage() {
  const { certificates, users } = await getData()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-sm text-gray-500 mt-1">
            {certificates.length} certificates issued
          </p>
        </div>
        <IssueCertificateButton users={users} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Recipient
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Unit
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Issued Date
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {certificates.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center">
                  <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No certificates issued yet</p>
                </td>
              </tr>
            )}
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {cert.profiles?.full_name ?? '—'}
                      </p>
                      <p className="text-xs text-gray-400">{cert.profiles?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {cert.unit_id ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                      Unit {cert.unit_id}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-teal-50 text-teal-700">
                      Full Program
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">
                  {new Date(cert.issued_at ?? cert.created_at).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={`/api/certificate/${cert.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                               font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
