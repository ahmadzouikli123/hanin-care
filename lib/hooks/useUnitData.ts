// lib/hooks/useUnitData.ts
// SWR hooks for cached unit data fetching
// Prevents refetching on every tab switch or page revisit

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function fetchUnitDbId(unitNumber: number): Promise<string | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("units")
    .select("id")
    .eq("unit_number", unitNumber)
    .single()
  if (error || !data) return null
  return data.id
}

async function fetchTheory(unitNumber: number) {
  const unitId = await fetchUnitDbId(unitNumber)
  if (!unitId) throw new Error("Unit not found")

  const supabase = createClient()
  const { data, error } = await supabase
    .from("unit_theory_blocks")
    .select("*")
    .eq("unit_id", unitId)
    .order("order_index")

  if (error) throw new Error("Failed to load theory")
  return data ?? []
}

async function fetchQuiz(unitNumber: number) {
  const unitId = await fetchUnitDbId(unitNumber)
  if (!unitId) throw new Error("Unit not found")

  const supabase = createClient()
  const { data: quiz, error: quizErr } = await supabase
    .from("quizzes")
    .select("id")
    .eq("unit_id", unitId)
    .eq("quiz_type", "unit")
    .single()

  if (quizErr || !quiz) throw new Error("Quiz not found")

  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select(`
      id, question_text, difficulty, explanation, order_index,
      answer_options ( id, option_text, is_correct, order_index )
    `)
    .eq("quiz_id", quiz.id)
    .order("order_index")

  if (qErr) throw new Error("Failed to load questions")
  return questions ?? []
}

async function fetchCaseStudies(unitNumber: number) {
  const unitId = await fetchUnitDbId(unitNumber)
  if (!unitId) throw new Error("Unit not found")

  const supabase = createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select(`
      id, order_index, icon, title, subtitle, scenario, difficulty, profile,
      case_study_questions (
        id, order_index, question_text, correct_letter, explanation,
        case_study_options ( letter, option_text, order_index )
      ),
      case_study_reflections ( order_index, reflection_text )
    `)
    .eq("unit_id", unitId)
    .order("order_index")

  if (error) throw new Error("Failed to load case studies")
  return data ?? []
}

async function fetchUserProgress(unitNumber: number, userId: string) {
  const unitId = await fetchUnitDbId(unitNumber)
  if (!unitId) return null

  const supabase = createClient()
  const { data } = await supabase
    .from("unit_progress")
    .select("*")
    .eq("unit_id", unitId)
    .eq("user_id", userId)
    .single()

  return data
}

// ─── SWR Config ───────────────────────────────────────────────────────────────

const SWR_CONFIG = {
  revalidateOnFocus: false,      // Don't refetch when tab regains focus
  revalidateOnReconnect: true,   // Refetch when internet reconnects
  dedupingInterval: 300_000,     // Cache for 5 minutes (300,000ms)
  errorRetryCount: 2,            // Retry failed requests twice
  errorRetryInterval: 3000,      // Wait 3 seconds between retries
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useUnitTheory(unitNumber: number) {
  return useSWR(
    unitNumber ? `theory-${unitNumber}` : null,
    () => fetchTheory(unitNumber),
    SWR_CONFIG
  )
}

export function useUnitQuiz(unitNumber: number) {
  return useSWR(
    unitNumber ? `quiz-${unitNumber}` : null,
    () => fetchQuiz(unitNumber),
    SWR_CONFIG
  )
}

export function useUnitCaseStudies(unitNumber: number) {
  return useSWR(
    unitNumber ? `cases-${unitNumber}` : null,
    () => fetchCaseStudies(unitNumber),
    SWR_CONFIG
  )
}

export function useUserProgress(unitNumber: number, userId: string | null) {
  return useSWR(
    unitNumber && userId ? `progress-${unitNumber}-${userId}` : null,
    () => fetchUserProgress(unitNumber, userId!),
    {
      ...SWR_CONFIG,
      dedupingInterval: 60_000, // Progress updates more frequently (1 min)
    }
  )
}
