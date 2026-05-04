-- ============================================================
-- Hanin Care — Admin Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add role column to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
CHECK (role IN ('user', 'admin'));

-- 2. Set yourself as admin (replace with your actual email)
UPDATE profiles
SET role = 'admin'
WHERE email = 'ahmad@example.com'; -- ← غيّر هذا

-- 3. RLS policy: admin can read all profiles
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- 4. RLS policy: admin can update roles
CREATE POLICY "Admin can update user roles"
  ON profiles FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- 5. View: admin_users_overview (users + stats)
CREATE OR REPLACE VIEW admin_users_overview AS
SELECT
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at,
  COUNT(DISTINCT qa.id) AS total_attempts,
  COUNT(DISTINCT CASE WHEN qa.passed = true THEN qa.id END) AS passed_count,
  COUNT(DISTINCT c.id) AS certificates_count,
  MAX(qa.created_at) AS last_activity
FROM profiles p
LEFT JOIN quiz_attempts qa ON qa.user_id = p.id
LEFT JOIN certificates c ON c.user_id = p.id
GROUP BY p.id, p.email, p.full_name, p.role, p.created_at;

-- Grant access to authenticated users (filtered by RLS)
GRANT SELECT ON admin_users_overview TO authenticated;
