"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import type { Profile, Post } from "@/lib/types";

interface Props {
  suggestedUsers: Profile[];
  featuredPosts: Post[];
  currentUserId: string;
}

export function ExploreClient({ suggestedUsers, featuredPosts, currentUserId }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [searching, setSearching] = useState(false);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const supabase = createClient();

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .or(`full_name.ilike.%${query}%,specialties.cs.{${query}}`)
      .neq("id", currentUserId)
      .limit(20);
    setResults(data ?? []);
    setSearching(false);
  }

  async function follow(userId: string, name: string) {
    await supabase.from("follows").insert({ follower_id: currentUserId, following_id: userId });
    setFollowed((s) => new Set([...s, userId]));
    toast.success(`Seguindo ${name}!`);
  }

  const displayUsers = results.length > 0 ? results : suggestedUsers;

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-4xl">
        <h1 className="text-2xl font-bold text-ossohub-navy mb-6">Explorar</h1>

        {/* Busca */}
        <div className="ossohub-card p-5 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                placeholder="Buscar por nome ou especialidade (ex: Joelho, Ombro)..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-ossohub-green focus:ring-2 focus:ring-ossohub-green/20 transition"
              />
            </div>
            <Button onClick={handleSearch} disabled={searching}>
              {searching ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Usuários */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-ossohub-navy mb-3">
              {results.length > 0 ? `${results.length} resultados` : "Sugestões de conexão"}
            </h2>
            <div className="space-y-3">
              {displayUsers.map((u) => (
                <div key={u.id} className="ossohub-card p-4 flex items-start gap-3">
                  <Link href={`/profile/${u.id}`}>
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={u.photo_url ?? undefined} />
                      <AvatarFallback>{getInitials(u.full_name)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${u.id}`} className="font-medium text-ossohub-navy hover:underline text-sm block truncate">
                      {u.full_name}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <UserLevelBadge xp={u.total_xp} size="sm" />
                      {u.city_state && <span className="text-xs text-ossohub-slate truncate">{u.city_state}</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {u.specialties.slice(0, 2).map((s) => (
                        <Badge key={s} variant="green-light" className="text-xs px-1.5">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  {!followed.has(u.id) && (
                    <button onClick={() => follow(u.id, u.full_name)}
                      className="shrink-0 rounded-lg p-1.5 text-ossohub-green hover:bg-ossohub-green-light transition-colors">
                      <UserPlus className="h-4 w-4" />
                    </button>
                  )}
                  {followed.has(u.id) && (
                    <span className="shrink-0 text-xs text-ossohub-slate">✓ Seguindo</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Posts em destaque */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-ossohub-navy mb-3">⭐ Posts em Destaque</h2>
            {featuredPosts.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-ossohub-slate text-sm">
                Nenhum post em destaque ainda.
              </div>
            ) : (
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <PostCard key={post.id} post={post} currentUserId={currentUserId} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
