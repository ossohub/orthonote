"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Flame, Clock, Star, Users, Stethoscope, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { XPProgressBar } from "@/components/XPProgressBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import type { Post, Profile, PostType } from "@/lib/types";

type FilterType = "all" | PostType;
type SortType = "recent" | "popular" | "featured";

const FILTER_BUTTONS: { type: FilterType; label: string; icon: React.ElementType }[] = [
  { type: "all",              label: "Todos",       icon: Flame },
  { type: "clinical_case",   label: "Casos",        icon: Stethoscope },
  { type: "scientific_article", label: "Artigos",   icon: BookOpen },
  { type: "experience",      label: "Experiências", icon: MessageCircle },
  { type: "question",        label: "Perguntas",    icon: HelpCircle },
];

interface FeedClientProps {
  initialPosts: Post[];
  currentUserId: string;
  profile: Profile | null;
}

export function FeedClient({ initialPosts, currentUserId, profile }: FeedClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("recent");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Realtime: novos posts
  useEffect(() => {
    const channel = supabase
      .channel("feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, async (payload) => {
        // Buscar post completo com autor
        const { data } = await supabase
          .from("posts")
          .select(`*, author:profiles!posts_user_id_fkey(*)`)
          .eq("id", payload.new.id)
          .single();
        if (data) setPosts((prev) => [{ ...data, is_liked_by_me: false }, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  async function loadMore() {
    setLoading(true);
    const lastPost = posts[posts.length - 1];
    const { data } = await supabase
      .from("posts")
      .select(`*, author:profiles!posts_user_id_fkey(*)`)
      .order("created_at", { ascending: false })
      .lt("created_at", lastPost.created_at)
      .limit(10);

    const { data: myLikes } = await supabase
      .from("likes").select("post_id").eq("user_id", currentUserId);
    const likedIds = new Set(myLikes?.map((l) => l.post_id) ?? []);

    const newPosts = (data ?? []).map((p) => ({ ...p, is_liked_by_me: likedIds.has(p.id) }));
    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);
  }

  // Filtrar e ordenar
  const filtered = posts
    .filter((p) => filter === "all" || p.type === filter)
    .sort((a, b) => {
      if (sort === "popular") return b.likes_count - a.likes_count;
      if (sort === "featured") return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="ossohub-container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar esquerda — Perfil resumido */}
        <aside className="hidden lg:block lg:col-span-1">
          {profile && (
            <div className="ossohub-card p-5 sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.photo_url ?? undefined} />
                  <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-ossohub-navy text-sm line-clamp-1">{profile.full_name}</div>
                  <UserLevelBadge xp={profile.total_xp} size="sm" showName />
                </div>
              </div>
              <XPProgressBar xp={profile.total_xp} />
              <div className="mt-4">
                <Button className="w-full" size="sm" asChild>
                  <Link href="/post/new"><Plus className="h-4 w-4" /> Publicar</Link>
                </Button>
              </div>
            </div>
          )}
        </aside>

        {/* Feed principal */}
        <main className="lg:col-span-2 space-y-4">
          {/* Filtros */}
          <div className="ossohub-card p-3">
            <div className="flex gap-1 flex-wrap">
              {FILTER_BUTTONS.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === type
                      ? "bg-ossohub-green text-white"
                      : "text-ossohub-slate hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}

              <div className="ml-auto flex gap-1">
                {(["recent", "popular", "featured"] as SortType[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      sort === s ? "bg-slate-200 text-ossohub-navy" : "text-ossohub-slate hover:bg-slate-100"
                    }`}
                  >
                    {{ recent: "Recentes", popular: "Populares", featured: "Destaques" }[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          {filtered.length === 0 ? (
            <div className="ossohub-card p-12 text-center">
              <p className="text-ossohub-slate">Nenhum post encontrado.</p>
              <Button className="mt-4" asChild>
                <Link href="/post/new">Seja o primeiro a publicar</Link>
              </Button>
            </div>
          ) : (
            filtered.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={currentUserId} />
            ))
          )}

          {/* Carregar mais */}
          {filtered.length >= 20 && (
            <Button variant="outline" className="w-full" onClick={loadMore} disabled={loading}>
              {loading ? "Carregando..." : "Carregar mais"}
            </Button>
          )}
        </main>

        {/* Sidebar direita — Sugestões */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="ossohub-card p-5 sticky top-20">
            <h3 className="text-sm font-semibold text-ossohub-navy mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-ossohub-green" /> Conecte-se
            </h3>
            <p className="text-xs text-ossohub-slate">
              Explore perfis e especialidades na aba{" "}
              <Link href="/explore" className="text-ossohub-green hover:underline font-medium">Explorar</Link>.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-ossohub-navy mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> Em Destaque
              </h3>
              {posts.filter((p) => p.is_featured).slice(0, 3).map((p) => (
                <Link key={p.id} href={`/post/${p.id}`}
                  className="block py-2 text-xs text-ossohub-slate hover:text-ossohub-navy transition-colors line-clamp-2 border-b border-slate-50 last:border-0">
                  ⭐ {p.title}
                </Link>
              ))}
              {posts.filter((p) => p.is_featured).length === 0 && (
                <p className="text-xs text-slate-400">Nenhum destaque ainda.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
