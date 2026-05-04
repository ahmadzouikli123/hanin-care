// components/admin/IssueCertificateButton.tsx
'use client'

import { useState } from 'react'
import { Award, X, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  full_name: string | null
  email: string
}

interface Props {
  users: User[]
}

export default function IssueCertificateButton({ users }: Props) {
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [unitId, setUnitId] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!userId) {
      toast.error('Please select a user')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/issue-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, unitId: unitId || null }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Certificate issued successfully!')
      setOpen(false)
      setUserId('')
      setUnitId('')
    } catch {
      toast.error('Failed to issue certificate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white
                   text-sm font-medium hover:bg-teal-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Issue Certificate
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  Issue Certificate
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Select User *
                </label>
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5
                             focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="">— Choose a user —</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name ?? u.email} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Unit (optional — leave blank for full program)
                </label>
                <input
                  type="number"
                  value={unitId}
                  onChange={(e) => setUnitId(e.target.value)}
                  placeholder="e.g. 5"
                  min="1"
                  max="27"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5
                             focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm
                           text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !userId}
                className="flex-1 px-4 py-2.5 rounded-lg bg-teal-600 text-white text-sm
                           font-medium hover:bg-teal-700 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed"
              >
                {loading ? 'Issuing…' : 'Issue Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
