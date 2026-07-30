"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, MessagesSquare, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { listMyTeamsAsPreceptor, listMyMemberships } from "@/lib/teams";
import { listRooms, createRoom, deleteRoom } from "@/lib/rooms";
import type { Team, DiscussionRoom, RoomKind } from "@/lib/types";

const KIND_LABEL: Record<RoomKind, string> = { geral: "Geral", aula: "Aula", prova: "Prova" };
const KIND_STYLE: Record<RoomKind, string> = {
  geral: "bg-slate-50 border-slate-200 text-slate-500",
  aula: "bg-blue-50 border-blue-200 text-blue-600",
  prova: "bg-amber-50 border-amber-200 text-amber-600",
};

export default function SalasPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [isPreceptorOf, setIsPreceptorOf] = useState<Set<string>>(new Set());
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [rooms, setRooms] = useState<DiscussionRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomKind, setNewRoomKind] = useState<RoomKind>("geral");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    try {
      const [preceptorTeams, memberships] = await Promise.all([listMyTeamsAsPreceptor(), listMyMemberships()]);
      const activeAsResident = memberships.filter((m) => m.status === "active" && m.team).map((m) => m.team as Team);
      const all = [...preceptorTeams, ...activeAsResident.filter((t) => !preceptorTeams.some((p) => p.id === t.id))];
      setMyTeams(all);
      setIsPreceptorOf(new Set(preceptorTeams.map((t) => t.id)));
      if (all.length > 0) setSelectedTeamId((prev) => prev || all[0].id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar equipes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadTeams();
  }, [user, loadTeams]);

  const loadRooms = useCallback(async (teamId: string) => {
    if (!teamId) { setRooms([]); return; }
    setLoadingRooms(true);
    try {
      setRooms(await listRooms(teamId));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar salas");
    } finally {
      setLoadingRooms(false);
    }
  }, []);

  useEffect(() => { loadRooms(selectedTeamId); }, [selectedTeamId, loadRooms]);

  async function handleCreateRoom() {
    if (!newRoomName.trim()) { toast.error("Dê um nome para a sala"); return; }
    setCreating(true);
    try {
      await createRoom(selectedTeamId, newRoomName.trim(), newRoomKind);
      setNewRoomName("");
      toast.success("Sala criada!");
      loadRooms(selectedTeamId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar sala");
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteRoom(roomId: string) {
    try {
      await deleteRoom(roomId);
      loadRooms(selectedTeamId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover sala");
    }
  }

  if (userLoading || !user || loading) {
    return (
      <div className="min-h-screen ossohub-canvas flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  const isPreceptor = isPreceptorOf.has(selectedTeamId);

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <MessagesSquare className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Salas de Discussão</h1>
        </div>

        {myTeams.length === 0 ? (
          <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
            Você ainda não participa de nenhuma equipe. Vá em{" "}
            <Link href="/desempenho/equipe" className="text-ossohub-green font-medium">Minha Equipe</Link> para criar ou entrar em uma.
          </div>
        ) : (
          <>
            <div className="ossohub-card p-4 mb-5">
              <label className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Equipe</label>
              <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green-dark">
                {myTeams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}{isPreceptorOf.has(t.id) ? " (preceptor)" : ""}</option>
                ))}
              </select>
            </div>

            {isPreceptor && (
              <div className="ossohub-card p-4 mb-5">
                <p className="text-sm font-semibold text-ossohub-navy mb-2 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-ossohub-green" /> Nova sala
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Ex: Aula de Trauma — Semana 3"
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green-dark" />
                  <select value={newRoomKind} onChange={(e) => setNewRoomKind(e.target.value as RoomKind)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-ossohub-green-dark">
                    <option value="geral">Geral</option>
                    <option value="aula">Aula</option>
                    <option value="prova">Prova</option>
                  </select>
                  <Button size="sm" onClick={handleCreateRoom} disabled={creating}>
                    {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Criar
                  </Button>
                </div>
              </div>
            )}

            {loadingRooms ? (
              <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-ossohub-green" /></div>
            ) : rooms.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">Nenhuma sala criada ainda.</div>
            ) : (
              <div className="space-y-2">
                {rooms.map((room) => (
                  <div key={room.id} className="ossohub-card p-4 flex items-center justify-between gap-3">
                    <Link href={`/desempenho/salas/${room.id}`} className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ossohub-navy truncate">{room.name}</p>
                      <p className="text-xs text-ossohub-slate">Criada por {room.creator?.full_name}</p>
                    </Link>
                    <span className={`text-xs rounded-full border px-2 py-0.5 shrink-0 ${KIND_STYLE[room.kind]}`}>
                      {KIND_LABEL[room.kind]}
                    </span>
                    {isPreceptor && (
                      <button onClick={() => handleDeleteRoom(room.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
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
