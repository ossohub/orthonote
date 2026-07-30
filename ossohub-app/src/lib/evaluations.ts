import { createClient } from "@/lib/supabase/client";
import type { ResidentEvaluation } from "@/lib/types";

// ============================================================
// Avaliações do preceptor sobre o residente (compõe o "currículo"
// exibido no perfil, no estilo Lattes).
// ============================================================

export async function createEvaluation(
  teamId: string,
  residentId: string,
  score: number,
  comment?: string
): Promise<ResidentEvaluation> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data, error } = await supabase
    .from("resident_evaluations")
    .insert({
      team_id: teamId,
      resident_id: residentId,
      preceptor_id: user.id,
      score,
      comment: comment?.trim() || null,
    })
    .select("*, preceptor:profiles!resident_evaluations_preceptor_id_fkey(*), team:teams(*)")
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as ResidentEvaluation;
}

export async function listEvaluationsForResident(residentId: string): Promise<ResidentEvaluation[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("resident_evaluations")
    .select("*, preceptor:profiles!resident_evaluations_preceptor_id_fkey(*), team:teams(*)")
    .eq("resident_id", residentId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as ResidentEvaluation[];
}
