import { createClient } from "@/lib/supabase/client";
import type { ScheduledExam, ExamAttempt } from "@/lib/types";

// ============================================================
// Provas cronometradas — o preceptor define área, número de questões
// e duração; o tempo de encerramento (closes_at) é sempre calculado
// no banco (trigger), nunca aceito do cliente. Depois que o tempo
// acaba, answer_question_item recusa novas respostas automaticamente.
// ============================================================

export interface CreateExamInput {
  teamId: string;
  roomId?: string | null;
  title: string;
  area?: string | null;
  numQuestions: number;
  durationMinutes: number;
  opensAt: string; // ISO
}

export async function createExam(input: CreateExamInput): Promise<ScheduledExam> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data, error } = await supabase
    .from("scheduled_exams")
    .insert({
      team_id: input.teamId,
      room_id: input.roomId || null,
      created_by: user.id,
      title: input.title,
      area: input.area || null,
      num_questions: input.numQuestions,
      duration_minutes: input.durationMinutes,
      opens_at: input.opensAt,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ScheduledExam;
}

export async function listExams(teamId: string): Promise<ScheduledExam[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scheduled_exams")
    .select("*")
    .eq("team_id", teamId)
    .order("opens_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ScheduledExam[];
}

export async function listExamsForRoom(roomId: string): Promise<ScheduledExam[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scheduled_exams")
    .select("*")
    .eq("room_id", roomId)
    .order("opens_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ScheduledExam[];
}

export async function myExamAttempt(examId: string): Promise<ExamAttempt | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("exam_id", examId)
    .eq("resident_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as ExamAttempt | null;
}

export async function listExamAttempts(examId: string): Promise<ExamAttempt[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("*, resident:profiles!exam_attempts_resident_id_fkey(*), test:question_tests(*)")
    .eq("exam_id", examId);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as ExamAttempt[];
}

// Inicia a tentativa do residente logado — retorna o test_id (mesmo fluxo
// de pergunta/resposta do Banco de Questões normal). Rejeita fora da
// janela de tempo (o banco confere opens_at/closes_at server-side).
export async function startScheduledExam(examId: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("start_scheduled_exam", { p_exam_id: examId });
  if (error) throw new Error(error.message);
  return data as string;
}

// Encerra a prova (idempotente) e publica o resumo sucinto na sala, se
// houver uma vinculada. Qualquer participante pode chamar depois do
// horário de encerramento — só executa de fato na primeira chamada.
export async function closeExamAndPostSummary(examId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("close_scheduled_exam_and_post_summary", { p_exam_id: examId });
  if (error) throw new Error(error.message);
}

export function examStatus(exam: ScheduledExam): "agendada" | "aberta" | "encerrada" {
  const now = Date.now();
  const opens = new Date(exam.opens_at).getTime();
  const closes = new Date(exam.closes_at).getTime();
  if (now < opens) return "agendada";
  if (now > closes) return "encerrada";
  return "aberta";
}
