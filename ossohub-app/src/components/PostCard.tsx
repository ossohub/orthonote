"use client";

import Link from "next/link";
import { useState } from "react";
import { Hammer, MessageSquare, Share2, Stethoscope, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { createClient } from "@/lib/supabase/client";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import type { Post } from "@/lib/types";

const POST_TYPE_CONFIG = {
  clinical_case:      { label: "Caso Clínico",  icon: Stethoscope, color: "bg-purple-900/60 text-purple-300 border border-purple-700/50" },
  scientific_article: { label: "Artigo",         icon: BookOpen,     color: "bg-sky-900/60 text-sky-300 border border-sky-700/50"         },
  experience:         { label: "Experiência",    icon: MessageCircle,color: "bg-teal-900/60 text-teal-300 border border-teal-700/50"       },
  question:           { label: "Pergunta",       icon: HelpCircle,   color: "bg-amber-900/60 text-amber-300 border border-amber-700/50"   },
};

interface PostCardProps {
  post: Post;
  currentUserId?: string;
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [liked, setLiked] = useState(post.is_liked_by_me ?? false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const supabase = createClient();

  const typeConfig = POST_TYPE_CONFIG[post.type];
  const TypeIcon = typeConfig.icon;
  const author = post.author;

  async function handleLike() {
    if (!currentUserId || isLiking) return;
    setIsLiking(true);
    setStrikeCount((n) => n + 1);

    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1));

    if (wasLiked) {
      await supabase.from("likes").delete().match({ post_id: post.id, user_id: currentUserId });
    } else {
      await supabase.from("likes").insert({ post_id: post.id, user_id: currentUserId });
    }

    setIsLiking(false);
  }

  function handleShare() {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    toast.success("Link copiado!");
  }

  return (
    <article className="ossohub-card p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Link href={`/profile/${post.user_id}`}>
          <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/10">
            <AvatarImage src={author?.photo_url ?? undefined} alt={author?.full_name} />
            <AvatarFallback className="bg-ossohub-navy-card text-slate-400 text-xs font-semibold">
              {getInitials(author?.full_name ?? "?")}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${post.user_id}`} className="font-semibold text-white hover:text-emerald-400 transition-colors text-sm truncate">
              {author?.full_name ?? "Ortopedista"}
            </Link>
            {author && (
              <UserLevelBadge xp={author.total_xp} size="sm" showName={false} />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-500">
              {author?.city_state ?? "Brasil"}
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-xs text-slate-500">
              {formatRelativeDate(post.created_at)}
            </span>
          </div>
        </div>

        {/* Tipo do post */}
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shrink-0 ${typeConfig.color}`}>
          <TypeIcon className="h-3 w-3" />
          {typeConfig.label}
        </span>
      </div>

      {/* Título + preview */}
      <Link href={`/post/${post.id}`} className="block group">
        <h2 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2"
          style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
          {post.title}
        </h2>
        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
          {post.content}
        </p>
      </Link>

      {/* Vídeo */}
      {post.video_url && (
        <Link href={`/post/${post.id}`} className="mt-3 block">
          <video
            src={post.video_url}
            className="w-full max-h-72 rounded-xl"
            style={{ background: "#0A1628" }}
            muted
            preload="metadata"
          />
        </Link>
      )}

      {/* Imagens */}
      {post.image_urls.length > 0 && (
        <Link href={`/post/${post.id}`} className="mt-3 block">
          <div className={`grid gap-2 rounded-xl overflow-hidden ${post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {post.image_urls.slice(0, 4).map((url, i) => (
              <div key={i} className="relative aspect-video" style={{ background: "#0A1628" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                {i === 3 && post.image_urls.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                    +{post.image_urls.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Link>
      )}

      {/* Em análise */}
      {post.moderation_status === "pending" && post.user_id === currentUserId && (
        <p className="mt-3 rounded-lg px-3 py-1.5 text-xs font-medium text-amber-400"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
          ⏳ Em análise da moderação — só você vê esta publicação por enquanto
        </p>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal text-slate-500 border-white/10 bg-white/5">
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 5 && (
            <Badge variant="outline" className="text-xs font-normal text-slate-600 border-white/8 bg-white/4">
              +{post.tags.length - 5}
            </Badge>
          )}
        </div>
      )}

      {/* Footer: ações */}
      <div className="flex items-center gap-1 mt-4 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Like */}
        <button
          onClick={handleLike}
          disabled={!currentUserId}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            liked
              ? "text-red-400 bg-red-900/30"
              : "text-slate-500 hover:bg-white/6 hover:text-slate-300"
          }`}
        >
          <Hammer
            key={strikeCount}
            className={`h-4 w-4 ${liked ? "fill-current" : ""} ${strikeCount > 0 ? "martelada-swing" : ""}`}
          />
          <span>{likesCount}</span>
        </button>

        {/* Comentar */}
        <Link
          href={`/post/${post.id}#comments`}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-white/6 hover:text-slate-300 transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments_count}</span>
        </Link>

        {/* Compartilhar */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-white/6 hover:text-slate-300 transition-colors"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {/* Featured badge */}
        {post.is_featured && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-amber-300"
            style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
            ⭐ Destaque
          </span>
        )}
      </div>
    </article>
  );
}
