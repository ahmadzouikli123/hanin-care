// types/database.ts
// Auto-generated type from Supabase schema
// Run: npx supabase gen types typescript --project-id YOUR_ID > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:          string
          email:       string
          first_name:  string
          last_name:   string
          full_name:   string | null
          role:        "student" | "instructor" | "admin"
          province:    string | null
          employer:    string | null
          phone:       string | null
          avatar_url:  string | null
          is_active:   boolean
          created_at:  string
          updated_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
      }
      quiz_attempts: {
        Row: {
          id:           string
          user_id:      string
          quiz_id:      string
          attempt_num:  number
          score:        number
          correct:      number
          total:        number
          passed:       boolean
          started_at:   string
          completed_at: string | null
          time_taken:   number | null
        }
        Insert: Omit<Database["public"]["Tables"]["quiz_attempts"]["Row"], "id" | "started_at">
        Update: Partial<Database["public"]["Tables"]["quiz_attempts"]["Insert"]>
      }
      certificates: {
        Row: {
          id:          string
          user_id:     string
          course_id:   string
          level_id:    string | null
          cert_number: string
          status:      "pending" | "issued" | "revoked"
          final_score: number | null
          pdf_url:     string | null
          issued_at:   string | null
          expires_at:  string | null
          created_at:  string
        }
        Insert: Omit<Database["public"]["Tables"]["certificates"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["certificates"]["Insert"]>
      }
    }
    Functions: {
      get_student_dashboard: {
        Args:    { p_user_id: string }
        Returns: Json
      }
      get_user_course_score: {
        Args:    { p_user_id: string; p_course_id: string }
        Returns: { total_units: number; completed_units: number; units_passed: number; avg_score: number; completion_pct: number }[]
      }
      is_cert_eligible: {
        Args:    { p_user_id: string; p_course_id: string }
        Returns: boolean
      }
    }
  }
}
