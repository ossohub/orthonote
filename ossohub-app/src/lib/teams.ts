import { createClient } from "@/lib/supabase/client";
import type { Team, TeamMember, ResidencyProgram } from "@/lib/types";

// ============================================================
// Desempenho — Equipes (preceptor ↔ residente)
// ============================================================
// Convite e resposta rodam em funções SECURITY DEFINER no banco
// (invite_resident_to_team / respond_team_invite), no mesmo padrão
// de award_self_xp/answer_question_item: o cliente nunca insere ou
// atualiza team_members diretamente, então não dá pra um residente
// se auto-adicionar numa equipe nem pra um preceptor se auto-aceitar.

export async function createTeam(
  name: string,
  institution?: string,
  residencyProgramId?: string | null,
  uf?: string | null
): Promise<Team> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data, error } = await supabase
    .from("teams")
    .insert({
      preceptor_id: user.id,
      name,
      institution: institution || null,
      residency_program_id: residencyProgramId || null,
      uf: uf || null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Team;
}

// Catálogo de programas de residência (Ortopedia/Trauma), opcionalmente
// filtrado por estado — usado tanto para criar equipe quanto para o
// residente encontrar equipes existentes do seu programa.
export async function listResidencyPrograms(uf?: string): Promise<ResidencyProgram[]> {
  const supabase = createClient();
  let query = supabase.from("residency_programs").select("*").order("city").order("name");
  if (uf) query = query.eq("uf", uf);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ResidencyProgram[];
}

export interface TeamDirectoryEntry {
  id: string;
  name: string;
  institution: string | null;
  uf: string | null;
  residency_program_id: string | null;
  program_name: string | null;
  program_city: string | null;
  preceptor_id: string;
  preceptor_name: string;
  created_at: string;
}

// Diretório de equipes (nome/instituição/uf/programa/preceptor) para o
// residente localizar a equipe certa e solicitar entrada — nunca expõe
// membros, cronograma, notas, mensagens ou provas.
export async function browseTeamsToJoin(uf?: string, search?: string): Promise<TeamDirectoryEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("browse_teams_directory", {
    p_uf: uf || null,
    p_search: search || null,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as TeamDirectoryEntry[];
}

// Residente solicita entrada numa equipe já existente — fica pendente até
// o preceptor aprovar (approve_join_request).
export async function requestToJoinTeam(teamId: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("request_to_join_team", { p_team_id: teamId });
  if (error) throw new Error(error.message);
  return data as string;
}

// Preceptor aprova/recusa uma solicitação de entrada iniciada pelo residente.
export async function approveJoinRequest(membershipId: string, accept: boolean): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("approve_join_request", {
    p_membership_id: membershipId,
    p_accept: accept,
  });
  if (error) throw new Error(error.message);
}

export async function deleteTeam(teamId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("teams").delete().eq("id", teamId);
  if (error) throw new Error(error.message);
}

// Equipes onde o usuário logado é o preceptor, com os membros já juntados.
export async function listMyTeamsAsPreceptor(): Promise<Team[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("teams")
    .select("*, members:team_members(*, resident:profiles!team_members_resident_id_fkey(*))")
    .eq("preceptor_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Team[];
}

// Vínculos do usuário logado como residente (inclui convites pendentes),
// com a equipe e o preceptor já juntados.
export async function listMyMemberships(): Promise<TeamMember[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("team_members")
    .select("*, team:teams(*, preceptor:profiles!teams_preceptor_id_fkey(*))")
    .eq("resident_id", user.id)
    .order("invited_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as TeamMember[];
}

export async function inviteResidentToTeam(teamId: string, identifier: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("invite_resident_to_team", {
    p_team_id: teamId,
    p_identifier: identifier,
  });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function respondTeamInvite(membershipId: string, accept: boolean): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("respond_team_invite", {
    p_membership_id: membershipId,
    p_accept: accept,
  });
  if (error) throw new Error(error.message);
}

export async function removeTeamMember(membershipId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", membershipId);
  if (error) throw new Error(error.message);
}

// Residentes ativos de todas as equipes onde o usuário logado é preceptor —
// usado para popular o seletor de residente em Cronograma/Gráficos.
export async function listMyActiveResidents(): Promise<TeamMember[]> {
  const teams = await listMyTeamsAsPreceptor();
  const members = teams.flatMap((t) => t.members ?? []);
  return members.filter((m) => m.status === "active");
}
