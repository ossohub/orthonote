"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Send, Image as ImageIcon, Smile, Plus, Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { getInitials, formatRelativeDate } from "@/lib/utils";
import {
  getRoom, listMessages, sendTextMessage, sendImageMessage, getRoomImageUrl, subscribeToRoom,
} from "@/lib/rooms";
import { listMyTeamsAsPreceptor } from "@/lib/teams";
import {
  createExam, listExamsForRoom, myExamAttempt, startScheduledExam, closeExamAndPostSummary, examStatus,
} from "@/lib/exams";
import { QUESTION_AREAS, type DiscussionRoom, type RoomMessage, type ScheduledExam } from "@/lib/types";

const EMOJIS = ["👍", "🦴", "💪", "🔥", "😂", "😮", "🙏", "🎯", "✅", "❌", "🩻", "📌"];

function ChatImage({ path }: { path: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    getRoomImageUrl(path).then((u) => { if (active) setUrl(u); });
    return () => { active = false; };
  }, [path]);
  if (!url) return <div className="h-40 w-56 rounded-lg bg-slate-100 animate-pulse" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="Imagem enviada na sala" className="max-h-72 rounded-lg border border-slate-200" />;
}

export default function SalaChatPage() {
  const params = useParams<{ id: string }>();
  const roomId = params.id;
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [room, setRoom] = useState<DiscussionRoom | null>(null);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isPreceptor, setIsPreceptor] = useState(false);
  const [exams, setExams] = useState<ScheduledExam[]>([]);
  const [attemptedExamIds, setAttemptedExamIds] = useState<Set<string>>(new Set());
  const [showExamForm, setShowExamForm] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [examArea, setExamArea] = useState<string>("");
  const [examNumQ, setExamNumQ] = useState(10);
  const [examDuration, setExamDuration] = useState(60);
  const [examOpensAt, setExamOpensAt] = useState("");
  const [creatingExam, setCreatingExam] = useState(false);
  const [startingExamId, setStartingExamId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
  }, [user, userLoading, router]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await getRoom(roomId);
      setRoom(r);
      if (!r) return;
      const [msgs, myTeams, roomExams] = await Promise.all([
        listMessages(roomId),
        listMyTeamsAsPreceptor(),
        listExamsForRoom(roomId),
      ]);
      setMessages(msgs);
      setIsPreceptor(myTeams.some((t) => t.id === r.team_id));
      setExams(roomExams);
      const attempts = await Promise.all(roomExams.map((e) => myExamAttempt(e.id)));
      setAttemptedExamIds(new Set(roomExams.filter((_, i) => attempts[i]).map((e) => e.id)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar sala");
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => { if (user) load(); }, [user, load]);

  useEffect(() => {
    const channel = subscribeToRoom(roomId, (m) => setMessages((prev) => [...prev, m]));
    return () => { channel.unsubscribe(); };
  }, [roomId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

  // Re-renderiza a cada 15s pra atualizar contadores de tempo das provas abertas
  useEffect(() => {
    const interval = setInterval(() => forceTick((v) => v + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  async function handleSendText() {
    if (!text.trim()) return;
    setSending(true);
    try {
      await sendTextMessage(roomId, text);
      setText("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar mensagem");
    } finally {
      setSending(false);
    }
  }

  async function handleSendImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setSending(true);
    try {
      await sendImageMessage(roomId, file);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar imagem");
    } finally {
      setSending(false);
    }
  }

  async function handleCreateExam() {
    if (!examTitle.trim() || !examOpensAt) {
      toast.error("Preencha título e horário de abertura");
      return;
    }
    setCreatingExam(true);
    try {
      await createExam({
        teamId: room!.team_id,
        roomId,
        title: examTitle.trim(),
        area: examArea || null,
        numQuestions: examNumQ,
        durationMinutes: examDuration,
        opensAt: new Date(examOpensAt).toISOString(),
      });
      toast.success("Prova agendada!");
      setExamTitle(""); setExamArea(""); setExamNumQ(10); setExamDuration(60); setExamOpensAt("");
      setShowExamForm(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar prova");
    } finally {
      setCreatingExam(false);
    }
  }

  async function handleStartExam(examId: string) {
    setStartingExamId(examId);
    try {
      const testId = await startScheduledExam(examId);
      router.push(`/questions/test/${testId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao iniciar prova");
    } finally {
      setStartingExamId(null);
    }
  }

  async function handleCloseAndPost(examId: string) {
    try {
      await closeExamAndPostSummary(examId);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao encerrar prova");
    }
  }

  if (userLoading || !user || loading) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ossohub-green" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-ossohub-bg-light flex items-center justify-center text-sm text-ossohub-slate">
        Sala não encontrada ou sem acesso.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ossohub-bg-light flex flex-col">
      <div className="ossohub-container max-w-3xl w-full py-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Link href="/desempenho/salas" className="text-ossohub-slate hover:text-ossohub-navy"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-lg font-bold text-ossohub-navy truncate">{room.name}</h1>
        </div>

        {/* Provas da sala */}
        <div className="ossohub-card p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ossohub-navy flex items-center gap-2">
              <Timer className="h-4 w-4 text-ossohub-green" /> Provas
            </p>
            {isPreceptor && (
              <Button size="sm" variant="outline" onClick={() => setShowExamForm((v) => !v)}>
                <Plus className="h-3.5 w-3.5" /> Nova prova
              </Button>
            )}
          </div>

          {showExamForm && (
            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-slate-200 p-3">
              <input value={examTitle} onChange={(e) => setExamTitle(e.target.value)} placeholder="Título da prova"
                className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-ossohub-green sm:col-span-2" />
              <select value={examArea} onChange={(e) => setExamArea(e.target.value)}
                className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-ossohub-green">
                <option value="">Todas as áreas</option>
                {QUESTION_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <input type="number" min={1} max={50} value={examNumQ} onChange={(e) => setExamNumQ(Number(e.target.value))}
                placeholder="Nº de questões"
                className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-ossohub-green" />
              <input type="number" min={1} max={480} value={examDuration} onChange={(e) => setExamDuration(Number(e.target.value))}
                placeholder="Duração (min)"
                className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-ossohub-green" />
              <input type="datetime-local" value={examOpensAt} onChange={(e) => setExamOpensAt(e.target.value)}
                className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-ossohub-green" />
              <Button size="sm" onClick={handleCreateExam} disabled={creatingExam} className="sm:col-span-2">
                {creatingExam ? <Loader2 className="h-4 w-4 animate-spin" /> : "Agendar prova"}
              </Button>
            </div>
          )}

          {exams.length === 0 ? (
            <p className="text-xs text-ossohub-slate">Nenhuma prova agendada nesta sala.</p>
          ) : (
            <div className="space-y-1.5">
              {exams.map((exam) => {
                const status = examStatus(exam);
                const already = attemptedExamIds.has(exam.id);
                return (
                  <div key={exam.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2">
                    <div className="min-w-0">
                      <p className="text-sm text-ossohub-navy font-medium truncate">{exam.title}</p>
                      <p className="text-xs text-ossohub-slate">
                        {exam.num_questions} questões · {exam.duration_minutes} min ·{" "}
                        {status === "agendada" && `abre ${new Date(exam.opens_at).toLocaleString("pt-BR")}`}
                        {status === "aberta" && `encerra ${new Date(exam.closes_at).toLocaleString("pt-BR")}`}
                        {status === "encerrada" && "encerrada"}
                      </p>
                    </div>
                    {!isPreceptor && status === "aberta" && !already && (
                      <Button size="sm" onClick={() => handleStartExam(exam.id)} disabled={startingExamId === exam.id}>
                        {startingExamId === exam.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Iniciar"}
                      </Button>
                    )}
                    {!isPreceptor && already && <span className="text-xs text-ossohub-green font-medium">Respondida</span>}
                    {isPreceptor && status === "encerrada" && !exam.summary_posted && (
                      <Button size="sm" variant="outline" onClick={() => handleCloseAndPost(exam.id)}>Publicar resultado</Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mensagens */}
        <div className="flex-1 ossohub-card p-4 mb-3 overflow-y-auto max-h-[50vh] space-y-3">
          {messages.length === 0 ? (
            <p className="text-sm text-ossohub-slate text-center py-8">Nenhuma mensagem ainda. Diga oi!</p>
          ) : (
            messages.map((m) => {
              if (m.message_type === "system") {
                return (
                  <div key={m.id} className="text-center">
                    <pre className="inline-block whitespace-pre-wrap text-left text-xs bg-slate-100 text-ossohub-navy rounded-xl px-4 py-2 font-sans">
                      {m.body}
                    </pre>
                  </div>
                );
              }
              const isMe = m.sender_id === user.id;
              return (
                <div key={m.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className="h-7 w-7 shrink-0 rounded-full bg-ossohub-green/10 text-ossohub-green text-[10px] font-semibold flex items-center justify-center">
                    {getInitials(m.sender?.full_name ?? "?")}
                  </div>
                  <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`rounded-2xl px-3 py-2 text-sm ${isMe ? "bg-ossohub-green text-white" : "bg-slate-100 text-ossohub-navy"}`}>
                      {m.message_type === "image" && m.image_url && <ChatImage path={m.image_url} />}
                      {m.body && <p className="whitespace-pre-wrap break-words">{m.body}</p>}
                    </div>
                    <span className="text-[10px] text-ossohub-slate mt-0.5">{m.sender?.full_name} · {formatRelativeDate(m.created_at)}</span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Composer */}
        <div className="ossohub-card p-2 flex items-center gap-2 relative">
          <button onClick={() => setShowEmoji((v) => !v)} className="p-2 text-ossohub-slate hover:text-ossohub-navy">
            <Smile className="h-5 w-5" />
          </button>
          {showEmoji && (
            <div className="absolute bottom-full left-0 mb-2 grid grid-cols-6 gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-10">
              {EMOJIS.map((e) => (
                <button key={e} onClick={() => { setText((t) => t + e); setShowEmoji(false); }} className="text-xl hover:scale-110 transition-transform">
                  {e}
                </button>
              ))}
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleSendImage} />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-ossohub-slate hover:text-ossohub-navy">
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendText(); } }}
            placeholder="Escreva uma mensagem..."
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ossohub-green"
          />
          <Button size="sm" onClick={handleSendText} disabled={sending || !text.trim()}>
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
