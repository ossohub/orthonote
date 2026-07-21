"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, MessageSquare, Share2, ArrowLeft, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { awardSelfXP } from "@/lib/xp";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import type { Post, Comment } from "@/lib/types";

const POST_TYPE_LABELS: Record<string, string> = {
  clinical_case:      "Caso Clínico",
  scientific_article: "Artigo Científico",
  experience:         "Experiência",
  question:           "Pergunta",
};

interface Props {
  post: Post;
  initialComments: Comment[];
  currentUserId: string;
}

export function PostPageClient({ post, initialComments, currentUserId }: Props) {
  const [liked, setLiked]           = useState(post.is_liked_by_me ?? false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [comments, setComments]     = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting]       = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const author = post.author;

  // Realtime: novos comentários
  useEffect(() => {
    const channel = supabase
      .channel(`post-${post.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "comments",
        filter: `post_id=eq.${post.id}`,
      }, async (payload) => {
        const { data } = await supabase
          .from("comments")
          .select(`*, author:profiles!comments_user_id_fkey(*)`)
          .eq("id", payload.new.id)
          .single();
        if (data && data.user_id !== currentUserId) {
          setComments((prev) => [...prev, data]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [post.id, currentUserId, supabase]);

  async function handleLike() {
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => wasLiked ? c - 1 : c + 1);

    if (wasLiked) {
      await supabase.from("likes").delete().match({ post_id: post.id, user_id: currentUserId });
    } else {
      await supabase.from("likes").insert({ post_id: post.id, user_id: currentUserId });
      // O XP para o autor do post é creditado automaticamente por um
      // trigger no banco (não confiamos mais no cliente pra dizer
      // "credite fulano" — isso permitia forjar XP para qualquer um).
    }
  }

  async function handleComment() {
    if (!commentText.trim() || posting) return;
    setPosting(true);

    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: post.id, user_id: currentUserId, content: commentText.trim() })
      .select(`*, author:profiles!comments_user_id_fkey(*)`)
      .single();

    if (!error && data) {
      setComments((prev) => [...prev, data]);
      setCommentText("");
      await awardSelfXP("comment", data.id);
      toast.success("+15 XP pelo comentário 💬");
    }

    setPosting(false);
  }

  const structuredData = post.structured_data;

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-2xl">
        {/* Voltar */}
        <Link href="/feed" className="inline-flex items-center gap-2 text-sm text-ossohub-slate hover:text-ossohub-navy mb-5 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao feed
        </Link>

        {/* Post completo */}
        <article className="ossohub-card p-6 mb-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <Link href={`/profile/${post.user_id}`}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={author?.photo_url ?? undefined} />
                <AvatarFallback>{getInitials(author?.full_name ?? "?")}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${post.user_id}`} className="font-semibold text-ossohub-navy hover:underline">
                  {author?.full_name}
                </Link>
                {author && <UserLevelBadge xp={author.total_xp} size="sm" showName />}
              </div>
              <div className="flex items-center gap-2 text-xs text-ossohub-slate mt-0.5">
                <span>{author?.city_state}</span>
                <span>·</span>
                <span>{formatRelativeDate(post.created_at)}</span>
                <span>·</span>
                <span className="font-medium">{POST_TYPE_LABELS[post.type]}</span>
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-xl font-bold text-ossohub-navy mb-4">{post.title}</h1>

          {/* Campos do caso clínico */}
          {structuredData && Object.keys(structuredData).length > 0 && (
            <div className="space-y-4 mb-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {structuredData.age_range && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Faixa etária</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy">{structuredData.age_range}</p></div>
              )}
              {structuredData.sex && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Sexo</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy">{{ M: "Masculino", F: "Feminino", outro: "Outro" }[structuredData.sex]}</p></div>
              )}
              {structuredData.mechanism && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Mecanismo / Queixa</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy whitespace-pre-line">{structuredData.mechanism}</p></div>
              )}
              {structuredData.physical_exam && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Exame Físico</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy whitespace-pre-line">{structuredData.physical_exam}</p></div>
              )}
              {structuredData.diagnosis && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Diagnóstico</span>
                  <p className="mt-0.5 text-sm font-medium text-ossohub-green whitespace-pre-line">{structuredData.diagnosis}</p></div>
              )}
              {structuredData.treatment && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Abordagem</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy whitespace-pre-line">{structuredData.treatment}</p></div>
              )}
              {structuredData.discussion && (
                <div><span className="text-xs font-semibold text-ossohub-slate uppercase tracking-wide">Discussão / Lições</span>
                  <p className="mt-0.5 text-sm text-ossohub-navy whitespace-pre-line">{structuredData.discussion}</p></div>
              )}
            </div>
          )}

          {/* Conteúdo */}
          <p className="text-ossohub-slate leading-relaxed whitespace-pre-line mb-4">{post.content}</p>

          {/* Imagens */}
          {post.image_urls.length > 0 && (
            <div className={`grid gap-2 rounded-xl overflow-hidden mb-4 ${post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {post.image_urls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt={`Imagem ${i + 1}`} className="w-full h-auto object-cover rounded-xl" />
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-ossohub-slate">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Ações */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
            <button onClick={handleLike} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${liked ? "text-red-500 bg-red-50" : "text-ossohub-slate hover:bg-slate-100"}`}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {likesCount} curtidas
            </button>
            <button onClick={() => commentsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ossohub-slate hover:bg-slate-100 transition-colors">
              <MessageSquare className="h-4 w-4" />
              {comments.length} comentários
            </button>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copiado!"); }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ossohub-slate hover:bg-slate-100 transition-colors ml-auto">
              <Share2 className="h-4 w-4" /> Compartilhar
            </button>
          </div>
        </article>

        {/* Comentários */}
        <div ref={commentsRef} id="comments" className="ossohub-card p-6">
          <h2 className="font-semibold text-ossohub-navy mb-5 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-ossohub-green" />
            {comments.length} Comentário{comments.length !== 1 ? "s" : ""}
          </h2>

          {/* Input novo comentário */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleComment(); }}
                rows={2}
                placeholder="Escreva um comentário construtivo... (+15 XP)"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition resize-none"
              />
            </div>
            <Button onClick={handleComment} disabled={posting || !commentText.trim()} size="icon" className="self-end h-10 w-10 shrink-0">
              {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          {/* Lista de comentários */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={comment.author?.photo_url ?? undefined} />
                  <AvatarFallback className="text-xs">{getInitials(comment.author?.full_name ?? "?")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Link href={`/profile/${comment.user_id}`} className="text-sm font-semibold text-ossohub-navy hover:underline">
                      {comment.author?.full_name}
                    </Link>
                    {comment.author && <UserLevelBadge xp={comment.author.total_xp} size="sm" />}
                    <span className="text-xs text-ossohub-slate ml-auto">{formatRelativeDate(comment.created_at)}</span>
                  </div>
                  <p className="text-sm text-ossohub-slate whitespace-pre-line">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-4">
                Seja o primeiro a comentar — ganhe +15 XP!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
