'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const supabase = createClient()

type User = {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  plan: string | null
  is_active: boolean | null
  created_at: string
  units_completed?: number
  quiz_best_score?: number
  certificates?: number
}

type Stats = {
  total_users: number
  total_units_completed: number
  total_quiz_attempts: number
  total_certificates: number
  beginner_users: number
  standard_users: number
  advanced_users: number
}

const PLAN_COLORS: Record<string, string> = {
  beginner:     '#2E7D9E',
  standard:     '#D97706',
  advanced:     '#7C3AED',
}

const PLAN_BG: Record<string, string> = {
  beginner:     '#E0F2F7',
  standard:     '#FEF3C7',
  advanced:     '#EDE9FE',
}

function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: string; color: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '1.25rem 1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827' }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{label}</div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState<'stats' | 'users'>('stats')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [changingPlan, setChangingPlan] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  // ── Fetch Stats ──────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setLoading(true)
    const [
      { count: total_users },
      { count: total_units_completed },
      { count: total_quiz_attempts },
      { count: total_certificates },
      { count: beginner_users },
      { count: standard_users },
      { count: advanced_users },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('unit_progress').select('*', { count: 'exact', head: true }).eq('is_completed', true),
      supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }),
      supabase.from('certificates').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'beginner'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'standard'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'advanced'),
    ])
    setStats({
      total_users: total_users ?? 0,
      total_units_completed: total_units_completed ?? 0,
      total_quiz_attempts: total_quiz_attempts ?? 0,
      total_certificates: total_certificates ?? 0,
      beginner_users: beginner_users ?? 0,
      standard_users: standard_users ?? 0,
      advanced_users: advanced_users ?? 0,
    })
    setLoading(false)
  }, [])

  // ── Fetch Users ──────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, plan, is_active, created_at')
      .order('created_at', { ascending: false })

    if (data) {
      const enriched = await Promise.all(
        data.map(async (u) => {
          const [
            { count: units_completed },
            { data: quizData },
            { count: certs },
          ] = await Promise.all([
            supabase.from('unit_progress').select('*', { count: 'exact', head: true }).eq('user_id', u.id).eq('is_completed', true),
            supabase.from('quiz_attempts').select('score').eq('user_id', u.id).order('score', { ascending: false }).limit(1),
            supabase.from('certificates').select('*', { count: 'exact', head: true }).eq('user_id', u.id),
          ])
          return {
            ...u,
            units_completed: units_completed ?? 0,
            quiz_best_score: quizData?.[0]?.score ?? null,
            certificates: certs ?? 0,
          }
        })
      )
      setUsers(enriched)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (tab === 'stats') fetchStats()
    if (tab === 'users') fetchUsers()
  }, [tab, fetchStats, fetchUsers])

  // ── Change Plan ──────────────────────────────────────────
  const changePlan = async (userId: string, newPlan: string) => {
    setChangingPlan(userId)
    await supabase.from('profiles').update({ plan: newPlan }).eq('id', userId)
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: newPlan } : u))
    setSaved(userId)
    setTimeout(() => setSaved(null), 2000)
    setChangingPlan(null)
  }

  const filteredUsers = users.filter(u =>
    `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const TABS = [
    { key: 'stats', label: 'Statistics', icon: '📊' },
    { key: 'users', label: 'Users',      icon: '👥' },
  ] as const

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'inherit' }}>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, background: '#0F5A8A', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🛡️</div>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#111827', margin: 0 }}>Admin Dashboard</h1>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>Elder Support Training PSW</p>
          </div>
        </div>
        <Link href="/dashboard" style={{ fontSize: '0.88rem', color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ← Back to Site
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '0 2rem', display: 'flex', gap: '0.25rem' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSearch('') }} style={{ padding: '0.85rem 1.25rem', fontSize: '0.9rem', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', color: tab === t.key ? '#0F5A8A' : '#6B7280', borderBottom: `2px solid ${tab === t.key ? '#0F5A8A' : 'transparent'}`, fontFamily: 'inherit' }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>

        {/* ── STATS TAB ─────────────────────────────────── */}
        {tab === 'stats' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '1.5rem' }}>Platform Overview</h2>
            {loading ? (
              <p style={{ color: '#9CA3AF' }}>Loading…</p>
            ) : stats ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <StatCard label="Total Users"         value={stats.total_users}           icon="👥" color="#DBEAFE" />
                  <StatCard label="Units Completed"     value={stats.total_units_completed}  icon="✅" color="#DCFCE7" />
                  <StatCard label="Quiz Attempts"       value={stats.total_quiz_attempts}    icon="🧠" color="#FEF3C7" />
                  <StatCard label="Certificates Issued" value={stats.total_certificates}     icon="🏆" color="#EDE9FE" />
                </div>

                {/* Plan distribution */}
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', padding: '1.5rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '1.25rem' }}>Plan Distribution</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                      { plan: 'beginner',     count: stats.beginner_users,  label: 'Beginner',     icon: '🌱' },
                      { plan: 'standard',     count: stats.standard_users,  label: 'Standard',     icon: '📈' },
                      { plan: 'advanced',     count: stats.advanced_users,  label: 'Advanced',     icon: '🏆' },
                    ].map(({ plan, count, label, icon }) => (
                      <div key={plan} style={{ background: PLAN_BG[plan], borderRadius: 12, padding: '1.25rem', textAlign: 'center', border: `1px solid ${PLAN_COLORS[plan]}30` }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: PLAN_COLORS[plan] }}>{count}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{label} Plan</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                          {stats.total_users > 0 ? Math.round((count / stats.total_users) * 100) : 0}% of users
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bars */}
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '1.25rem' }}>Completion Rates</h3>
                  {[
                    { label: 'Certificate Rate', value: stats.total_users > 0 ? Math.round((stats.total_certificates / stats.total_users) * 100) : 0, color: '#7C3AED' },
                    { label: 'Quiz Engagement', value: stats.total_users > 0 ? Math.round((stats.total_quiz_attempts / stats.total_users) * 100) : 0, color: '#D97706' },
                  ].map(item => (
                    <div key={item.label} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#374151', marginBottom: '0.4rem' }}>
                        <span>{item.label}</span>
                        <span style={{ fontWeight: 700 }}>{Math.min(item.value, 100)}%</span>
                      </div>
                      <div style={{ height: 8, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(item.value, 100)}%`, height: '100%', background: item.color, borderRadius: 4, transition: 'width 0.7s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* ── USERS TAB ─────────────────────────────────── */}
        {tab === 'users' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', margin: 0 }}>
                Users ({users.length})
              </h2>
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: '0.6rem 1rem', fontSize: '0.88rem', width: 260, outline: 'none', fontFamily: 'inherit' }}
              />
            </div>

            {loading ? (
              <p style={{ color: '#9CA3AF' }}>Loading…</p>
            ) : (
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                      {['User', 'Email', 'Units Done', 'Best Quiz', 'Certs', 'Joined', 'Plan'].map(h => (
                        <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#6B7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        {/* User */}
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                              {(u.first_name || u.email || '?')[0].toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 600, color: '#111827' }}>
                              {u.first_name || '—'} {u.last_name || ''}
                            </span>
                          </div>
                        </td>
                        {/* Email */}
                        <td style={{ padding: '0.9rem 1rem', color: '#6B7280', fontSize: '0.82rem' }}>{u.email || '—'}</td>
                        {/* Units */}
                        <td style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                          <span style={{ background: '#DCFCE7', color: '#15803D', borderRadius: 8, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 700 }}>
                            {u.units_completed}
                          </span>
                        </td>
                        {/* Best Quiz */}
                        <td style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                          {u.quiz_best_score !== null ? (
                            <span style={{ background: u.quiz_best_score >= 70 ? '#DCFCE7' : '#FEF3C7', color: u.quiz_best_score >= 70 ? '#15803D' : '#92400E', borderRadius: 8, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 700 }}>
                              {u.quiz_best_score}%
                            </span>
                          ) : <span style={{ color: '#D1D5DB' }}>—</span>}
                        </td>
                        {/* Certs */}
                        <td style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                          <span style={{ background: '#EDE9FE', color: '#7C3AED', borderRadius: 8, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 700 }}>
                            {u.certificates}
                          </span>
                        </td>
                        {/* Joined */}
                        <td style={{ padding: '0.9rem 1rem', color: '#9CA3AF', fontSize: '0.78rem' }}>
                          {new Date(u.created_at).toLocaleDateString('en-CA')}
                        </td>
                        {/* Plan selector */}
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <select
                              value={u.plan || 'beginner'}
                              onChange={e => changePlan(u.id, e.target.value)}
                              disabled={changingPlan === u.id}
                              style={{
                                border: `1.5px solid ${PLAN_COLORS[u.plan || 'beginner']}`,
                                borderRadius: 8,
                                padding: '0.3rem 0.6rem',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: PLAN_COLORS[u.plan || 'beginner'],
                                background: PLAN_BG[u.plan || 'beginner'],
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                outline: 'none',
                              }}
                            >
                              <option value="beginner">🌱 Beginner</option>
                              <option value="standard">📈 Standard</option>
                              <option value="advanced">🏆 Advanced</option>
                            </select>
                            {saved === u.id && <span style={{ color: '#15803D', fontSize: '0.78rem', fontWeight: 700 }}>✓ Saved</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
