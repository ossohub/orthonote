"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, Stethoscope, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { createClient } from "@/lib/supabase/client";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import type { Post } from "@/lib/types";

const POST_TYPE_CONFIG = {
  clinical_case:      { label: "Caso Clínico",  icon: Stethoscope, color: "bg-purple-100 text-purple-700" },
  scientific_article: { label: "Artigo",         icon: BookOpen,     color: "bg-blue-100 text-blue-700"   },
  experience:         { label: "Experiência",    icon: MessageCircle,color: "bg-teal-100 text-teal-700"   },
  question:           { label: "Pergunta",       icon: HelpCircle,   color: "bg-amber-100 text-amber-700" },
};

interface PostCardProps {
  post: Post;
  currentUserId?: string;
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [liked, setLiked] = useState(post.is_liked_by_me ?? false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);
  const supabase = createClient();

  const typeConfig = POST_TYPE_CONFIG[post.type];
  const TypeIcon = typeConfig.icon;
  const author = post.author;

  async function handleLike() {
    if (!currentUserId || isLiking) return;
    setIsLiking(true);

    // Optimistic update
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
    <article className="ossohub-card p-5 hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Link href={`/profile/${post.user_id}`}>
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={author?.photo_url ?? undefined} alt={author?.full_name} />
            <AvatarFallback>{getInitials(author?.full_name ?? "?")}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${post.user_id}`} className="font-semibold text-ossohub-navy hover:underline text-sm truncate">
              {author?.full_name ?? "Ortopedista"}
            </Link>
            {author && (
              <UserLevelBadge xp={author.total_xp} size="sm" showName={false} />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-ossohub-slate">
              {author?.city_state ?? "Brasil"}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-ossohub-slate">
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
        <h2 className="font-semibold text-ossohub-navy group-hover:text-ossohub-green transition-colors mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-ossohub-slate line-clamp-3 leading-relaxed">
          {post.content}
        </p>
      </Link>

      {/* Imagens (preview) */}
      {post.image_urls.length > 0 && (
        <Link href={`/post/${post.id}`} className="mt-3 block">
          <div className={`grid gap-2 rounded-xl overflow-hidden ${post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {post.image_urls.slice(0, 4).map((url, i) => (
              <div key={i} className="relative aspect-video bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                {i === 3 && post.image_urls.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                    +{post.image_urls.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Link>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal text-ossohub-slate">
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 5 && (
            <Badge variant="outline" className="text-xs font-normal text-slate-400">
              +{post.tags.length - 5}
            </Badge>
          )}
        </div>
      )}

      {/* Footer: ações */}
      <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-100">
        {/* Like */}
        <button
          onClick={handleLike}
          disabled={!currentUserId}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            liked
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-ossohub-slate hover:bg-slate-100 hover:text-ossohub-navy"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span>{likesCount}</span>
        </button>

        {/* Comentar */}
        <Link
          href={`/post/${post.id}#comments`}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ossohub-slate hover:bg-slate-100 hover:text-ossohub-navy transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments_count}</span>
        </Link>

        {/* Compartilhar */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ossohub-slate hover:bg-slate-100 hover:text-ossohub-navy transition-colors"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {/* Featured badge */}
        {post.is_featured && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            ⭐ Destaque
          </span>
        )}
      </div>
    </article>
  );
}
