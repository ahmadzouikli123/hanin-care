// components/admin/UserActions.tsx
'use client'

import { useState } from 'react'
import { MoreHorizontal, Award, ExternalLink } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { toast } from 'sonner'

interface Props {
  userId: string
  userEmail: string
}

export default function UserActions({ userId, userEmail }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function issueCertificate() {
    setLoading(true)
    setOpen(false)
    try {
      const res = await fetch('/api/admin/issue-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Certificate issued to ${userEmail}`)
    } catch {
      toast.error('Failed to issue certificate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 w-44">
            <button
              onClick={issueCertificate}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700
                         hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              Issue Certificate
            </button>
            <a
              href={`/admin/users/${userId}`}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700
                         hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Profile
            </a>
          </div>
        </>
      )}
    </div>
  )
}
