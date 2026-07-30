"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users2, Plus, Trash2, Check, X, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import {
  createTeam, listMyTeamsAsPreceptor, listMyMemberships,
  inviteResidentToTeam, respondTeamInvite, removeTeamMember, deleteTeam,
} from "@/lib/teams";
import type { Team, TeamMember, TeamMemberStatus } from "@/lib/types";

const STATUS_LABEL: Record<TeamMemberStatus, string> = {
  pending: "Convite pendente",
  active: "Ativo",
  declined: "Recusado",
};

const STATUS_STYLE: Record<TeamMemberStatus, string> = {
  pending: "bg-amber-50 border-amber-200 text-amber-600",
  active: "bg-emerald-50 border-emerald-200 text-emerald-600",
  declined: "bg-slate-50 border-slate-200 text-slate-400",
};

export default function EquipePage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [teams, setTeams] = useState<Team[]>([]);
  const [memberships, setMemberships] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamInstitution, setNewTeamInstitution] = useState("");
  const [creatingTeam, setCreatingTeam] = useState(false);

  const [inviteInputs, setInviteInputs] = useState<Record<string, string>>({});
  const [invitingTeamId, setInvitingTeamId] = useState<string | null>(null);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [t, m] = await Promise.all([listMyTeamsAsPreceptor(), listMyMemberships()]);
      setTeams(t);
      setMemberships(m);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar equipes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadAll();
  }, [user, loadAll]);

  async function handleCreateTeam() {
    if (!newTeamName.trim()) {
      toast.error("Dê um nome para a equipe");
      return;
    }
    setCreatingTeam(true);
    try {
      await createTeam(newTeamName.trim(), newTeamInstitution.trim() || undefined);
      toast.success("Equipe criada!");
      setNewTeamName(""); setNewTeamInstitution("");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar equipe");
    } finally {
      setCreatingTeam(false);
    }
  }

  async function handleInvite(teamId: string) {
    const identifier = (inviteInputs[teamId] ?? "").trim();
    if (!identifier) {
      toast.error("Informe o CRM ou e-mail do residente");
      return;
    }
    setInvitingTeamId(teamId);
    try {
      await inviteResidentToTeam(teamId, identifier);
      toast.success("Convite enviado!");
      setInviteInputs((prev) => ({ ...prev, [teamId]: "" }));
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao convidar residente");
    } finally {
      setInvitingTeamId(null);
    }
  }

  async function handleRespond(membershipId: string, accept: boolean) {
    setRespondingId(membershipId);
    try {
      await respondTeamInvite(membershipId, accept);
      toast.success(accept ? "Convite aceito!" : "Convite recusado");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao responder convite");
    } finally {
      setRespondingId(null);
    }
  }

  async function handleRemoveMember(membershipId: string) {
    setRemovingId(membershipId);
    try {
      await removeTeamMember(membershipId);
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover");
    } finally {
      setRemovingId(null);
    }
  }

  async function handleDeleteTeam(teamId: string) {
    try {
      await deleteTeam(teamId);
      toast.success("Equipe removida");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover equipe");
    }
  }

  if (userLoading || !user) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  const pendingInvites = memberships.filter((m) => m.status === "pending");
  const myActiveTeams = memberships.filter((m) => m.status === "active");

  return (
    <div className="min-h-screen bg-ossohub-bg-light py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Users2 className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Minha Equipe</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-14"><Loader2 className="h-6 w-6 animate-spin text-ossohub-green" /></div>
        ) : (
          <>
            {/* Convites pendentes recebidos */}
            {pendingInvites.length > 0 && (
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-3">Convites recebidos</p>
                <div className="space-y-2">
                  {pendingInvites.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate">
                          Preceptor: {m.team?.preceptor?.full_name}{m.team?.institution ? ` · ${m.team.institution}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" onClick={() => handleRespond(m.id, true)} disabled={respondingId === m.id}>
                          {respondingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Aceitar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRespond(m.id, false)} disabled={respondingId === m.id}>
                          <X className="h-3.5 w-3.5" /> Recusar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipes das quais participo como residente */}
            {myActiveTeams.length > 0 && (
              <div className="ossohub-card p-5 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-3">Equipes que participo</p>
                <div className="space-y-2">
                  {myActiveTeams.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                      <div>
                        <p className="text-sm font-medium text-ossohub-navy">{m.team?.name}</p>
                        <p className="text-xs text-ossohub-slate">Preceptor: {m.team?.preceptor?.full_name}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}>
                        {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Sair da equipe"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Criar equipe (preceptor) */}
            <div className="ossohub-card p-5 mb-5">
              <p className="text-sm font-semibold text-ossohub-navy mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-ossohub-green" /> Criar equipe (programa de residência)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Ex: Residência de Ortopedia — Hospital X"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
                <input value={newTeamInstitution} onChange={(e) => setNewTeamInstitution(e.target.value)}
                  placeholder="Instituição (opcional)"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition" />
              </div>
              <Button size="sm" onClick={handleCreateTeam} disabled={creatingTeam}>
                {creatingTeam ? <><Loader2 className="h-4 w-4 animate-spin" /> Criando...</> : <><Plus className="h-4 w-4" /> Criar equipe</>}
              </Button>
            </div>

            {/* Minhas equipes como preceptor */}
            {teams.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
                Você ainda não criou nenhuma equipe.
              </div>
            ) : (
              <div className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="ossohub-card p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-ossohub-navy">{team.name}</p>
                        {team.institution && <p className="text-xs text-ossohub-slate">{team.institution}</p>}
                      </div>
                      <button onClick={() => handleDeleteTeam(team.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <input
                        value={inviteInputs[team.id] ?? ""}
                        onChange={(e) => setInviteInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                        placeholder="CRM ou e-mail do residente"
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
                      />
                      <Button size="sm" onClick={() => handleInvite(team.id)} disabled={invitingTeamId === team.id}>
                        {invitingTeamId === team.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Convidar
                      </Button>
                    </div>

                    {team.members && team.members.length > 0 ? (
                      <div className="space-y-1.5">
                        {team.members.map((m) => (
                          <div key={m.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                            <span className="text-sm text-ossohub-navy">{m.resident?.full_name ?? m.resident_id}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs rounded-full border px-2 py-0.5 ${STATUS_STYLE[m.status]}`}>
                                {STATUS_LABEL[m.status]}
                              </span>
                              <button onClick={() => handleRemoveMember(m.id)} disabled={removingId === m.id}
                                className="text-slate-300 hover:text-red-500 transition-colors p-1">
                                {removingId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ossohub-slate">Nenhum residente convidado ainda.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
