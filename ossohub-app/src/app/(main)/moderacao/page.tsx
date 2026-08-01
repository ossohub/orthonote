"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldCheck, Check, X, Stethoscope, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { formatRelativeDate } from "@/lib/utils";
import type { Post, Profile } from "@/lib/types";

// Rota escondida (não aparece na Sidebar) — só quem tem profiles.app_role =
// 'admin' consegue realmente aprovar/rejeitar, isso é garantido pela RPC
// moderate_post no banco (que checa app_private.is_admin() via auth.uid()
// no servidor). Esse check aqui é só pra não mostrar a tela pra quem não é
// admin; não é a camada de segurança real.

const POST_TYPE_LABELS: Record<string, { label: string; icon: React.ElementType }> = {
  clinical_case:      { label: "Caso Clínico", icon: Stethoscope },
  scientific_article: { label: "Artigo",        icon: BookOpen },
  experience:         { label: "Experiência",   icon: MessageCircle },
  question:           { label: "Pergunta",      icon: HelpCircle },
};

export default function ModeracaoPage() {
  const { user, profile, loading: userLoading } = useUser();
  const isAdmin = profile?.app_role === "admin";
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading) return;
    if (!user || !isAdmin) { setLoading(false); return; }
    loadPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoading, user?.id, isAdmin]);

  async function loadPending() {
    setLoading(true);
    const { data, error } = await supabase.rpc("get_pending_posts");
    if (error || !data) { setLoading(false); return; }

    const rows = data as Post[];
    setPosts(rows);

    const userIds = Array.from(new Set(rows.map((p) => p.user_id)));
    if (userIds.length > 0) {
      const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds);
      const map: Record<string, Profile> = {};
      (profiles ?? []).forEach((p) => { map[p.id] = p as Profile; });
      setAuthors(map);
    }
    setLoading(false);
  }

  async function decide(postId: string, decision: "approved" | "rejected") {
    setBusyId(postId);
    const { error } = await supabase.rpc("moderate_post", { p_post_id: postId, p_decision: decision });
    if (error) {
      toast.error("Erro ao registrar decisão");
    } else {
      toast.success(decision === "approved" ? "Publicação aprovada" : "Publicação rejeitada");
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
    setBusyId(null);
  }

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ossohub-slate" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm text-ossohub-slate">Você não tem acesso a esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ossohub-canvas py-8">
      <div className="ossohub-container max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="h-6 w-6 text-ossohub-green" />
          <h1 className="text-2xl font-bold text-ossohub-navy">Moderação de publicações</h1>
        </div>

        {posts.length === 0 ? (
          <div className="ossohub-card p-8 text-center text-sm text-ossohub-slate">
            Nenhuma publicação pendente. 🎉
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const author = authors[post.user_id];
              const typeInfo = POST_TYPE_LABELS[post.type];
              const TypeIcon = typeInfo?.icon ?? HelpCircle;
              return (
                <div key={post.id} className="ossohub-card p-5">
                  <div className="flex items-center gap-2 text-xs text-ossohub-slate mb-2">
                    <TypeIcon className="h-3.5 w-3.5" />
                    <span className="font-medium">{typeInfo?.label ?? post.type}</span>
                    <span>·</span>
                    <span>{author?.full_name ?? "Autor desconhecido"}</span>
                    <span>·</span>
                    <span>{formatRelativeDate(post.created_at)}</span>
                  </div>

                  <Link href={`/post/${post.id}`} className="font-semibold text-ossohub-navy hover:underline block mb-1">
                    {post.title}
                  </Link>
                  <p className="text-sm text-ossohub-slate line-clamp-3 mb-3">{post.content}</p>

                  {post.video_url && (
                    <video src={post.video_url} controls className="w-full max-h-72 rounded-xl bg-black mb-3" />
                  )}

                  {post.image_urls.length > 0 && (
                    <div className={`grid gap-2 rounded-xl overflow-hidden mb-3 ${post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {post.image_urls.map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={url} alt={`Imagem ${i + 1}`} className="w-full h-auto max-h-72 object-cover rounded-xl" />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={busyId === post.id}
                      onClick={() => decide(post.id, "rejected")}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" /> Rejeitar
                    </Button>
                    <Button size="sm" disabled={busyId === post.id} onClick={() => decide(post.id, "approved")}>
                      {busyId === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Aprovar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
