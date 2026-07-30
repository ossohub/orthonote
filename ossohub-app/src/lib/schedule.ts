import { createClient } from "@/lib/supabase/client";
import type { ScheduleEntry } from "@/lib/types";

// ============================================================
// Desempenho — Cronograma
// ============================================================
// Cada residente cadastra o próprio cronograma (resident_id = auth.uid()
// via RLS). Um preceptor pode apenas ler (SELECT) o cronograma dos
// residentes ativos da sua equipe — a policy no banco garante isso;
// aqui no cliente só precisamos filtrar por resident_id normalmente,
// o RLS resolve a permissão.

export interface ScheduleEntryInput {
  title: string;
  location?: string | null;
  starts_at: string; // ISO
  ends_at: string;   // ISO
  notes?: string | null;
}

export async function listSchedule(residentId: string): Promise<ScheduleEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schedule_entries")
    .select("*")
    .eq("resident_id", residentId)
    .order("starts_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ScheduleEntry[];
}

export async function listMySchedule(): Promise<ScheduleEntry[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  return listSchedule(user.id);
}

export async function createScheduleEntry(input: ScheduleEntryInput): Promise<ScheduleEntry> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data, error } = await supabase
    .from("schedule_entries")
    .insert({ ...input, resident_id: user.id })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as ScheduleEntry;
}

export async function updateScheduleEntry(id: string, patch: Partial<ScheduleEntryInput>): Promise<ScheduleEntry> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schedule_entries")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as ScheduleEntry;
}

export async function deleteScheduleEntry(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("schedule_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
