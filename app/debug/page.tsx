import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function DebugPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user ? await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() : { data: null }

  return (
    <pre style={{padding:20}}>
      USER: {JSON.stringify(user?.email, null, 2)}
      {'\n\n'}
      PROFILE: {JSON.stringify(profile, null, 2)}
    </pre>
  )
}
