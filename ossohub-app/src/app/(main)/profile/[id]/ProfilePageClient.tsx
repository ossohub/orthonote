"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, UserMinus, Pencil, MapPin, Award, BarChart2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { XPProgressBar } from "@/components/XPProgressBar";
import { AchievementBadge } from "@/components/AchievementBadge";
import { PostCard } from "@/components/PostCard";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import { BADGES } from "@/lib/xp";
import type { Profile, Post, Achievement, BadgeKey } from "@/lib/types";

type Tab = "posts" | "achievements" | "stats";

interface Props {
  profile: Profile;
  posts: Post[];
  achievements: Achievement[];
  isOwnProfile: boolean;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  currentUserId: string;
}

export function ProfilePageClient({
  profile, posts, achievements, isOwnProfile,
  isFollowing: initialFollowing, followersCount: initFollowers,
  followingCount, currentUserId,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [following, setFollowing] = useState(initialFollowing);
  const [followersCount, setFollowersCount] = useState(initFollowers);
  const supabase = createClient();

  const unlockedKeys = new Set(achievements.map((a) => a.badge_key));
  const allBadgeKeys = Object.keys(BADGES) as BadgeKey[];

  async function toggleFollow() {
    if (following) {
      await supabase.from("follows").delete().match({ follower_id: currentUserId, following_id: profile.id });
      setFollowing(false);
      setFollowersCount((c) => c - 1);
      toast.info(`Você deixou de seguir ${profile.full_name}`);
    } else {
      await supabase.from("follows").insert({ follower_id: currentUserId, following_id: profile.id });
      setFollowing(true);
      setFollowersCount((c) => c + 1);
      toast.success(`Seguindo ${profile.full_name}!`);
    }
  }

  const totalLikes = posts.reduce((sum, p) => sum + p.likes_count, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments_count, 0);

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-3xl">

        {/* Header do perfil */}
        <div className="ossohub-card p-6 mb-5">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={profile.photo_url ?? undefined} />
                <AvatarFallback className="text-2xl">{getInitials(profile.full_name)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <UserLevelBadge xp={profile.total_xp} size="md" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-ossohub-navy">{profile.full_name}</h1>
                  <p className="text-sm text-ossohub-slate mt-0.5">CRM {profile.crm}{profile.rqe ? ` · RQE ${profile.rqe}` : ""}</p>
                </div>
                {isOwnProfile ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile/edit"><Pencil className="h-3.5 w-3.5" /> Editar perfil</Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant={following ? "outline" : "default"}
                    onClick={toggleFollow}
                  >
                    {following
                      ? <><UserMinus className="h-3.5 w-3.5" /> Seguindo</>
                      : <><UserPlus className="h-3.5 w-3.5" /> Seguir</>}
                  </Button>
                )}
              </div>

              {profile.bio && (
                <p className="text-sm text-ossohub-slate mt-3 leading-relaxed">{profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 mt-3">
                {profile.city_state && (
                  <span className="flex items-center gap-1 text-xs text-ossohub-slate">
                    <MapPin className="h-3.5 w-3.5" />{profile.city_state}
                  </span>
                )}
                <span className="text-xs text-ossohub-slate">
                  <strong className="text-ossohub-navy">{followersCount}</strong> seguidores
                </span>
                <span className="text-xs text-ossohub-slate">
                  <strong className="text-ossohub-navy">{followingCount}</strong> seguindo
                </span>
                <span className="text-xs text-ossohub-slate">
                  <strong className="text-ossohub-navy">{posts.length}</strong> publicações
                </span>
              </div>

              {/* Especialidades */}
              {profile.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {profile.specialties.map((s) => (
                    <Badge key={s} variant="green-light" className="text-xs">{s}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <XPProgressBar xp={profile.total_xp} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 mb-5">
          {([
            { id: "posts"        as Tab, label: "Publicações", icon: FileText },
            { id: "achievements" as Tab, label: "Conquistas",  icon: Award },
            { id: "stats"        as Tab, label: "Estatísticas",icon: BarChart2 },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === id
                  ? "border-ossohub-green text-ossohub-green"
                  : "border-transparent text-ossohub-slate hover:text-ossohub-navy"
              }`}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        {/* Aba: Publicações */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="ossohub-card p-12 text-center">
                <p className="text-ossohub-slate">Nenhuma publicação ainda.</p>
                {isOwnProfile && (
                  <Button className="mt-4" asChild>
                    <Link href="/post/new">Fazer primeira publicação</Link>
                  </Button>
                )}
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={currentUserId} />
              ))
            )}
          </div>
        )}

        {/* Aba: Conquistas */}
        {activeTab === "achievements" && (
          <div className="ossohub-card p-6">
            <p className="text-sm text-ossohub-slate mb-6">
              {unlockedKeys.size} de {allBadgeKeys.length} badges conquistados
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
              {allBadgeKeys.map((key) => (
                <AchievementBadge
                  key={key}
                  badgeKey={key}
                  unlocked={unlockedKeys.has(key)}
                  size="md"
                  showLabel
                />
              ))}
            </div>
          </div>
        )}

        {/* Aba: Estatísticas */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "XP Total",       value: profile.total_xp },
              { label: "Publicações",    value: posts.length },
              { label: "Curtidas recebidas", value: totalLikes },
              { label: "Comentários",    value: totalComments },
              { label: "Badges",         value: achievements.length },
              { label: "Seguidores",     value: followersCount },
              { label: "Seguindo",       value: followingCount },
              { label: "Nível atual",    value: profile.current_level },
            ].map(({ label, value }) => (
              <div key={label} className="ossohub-card p-4 text-center">
                <div className="text-2xl font-bold text-ossohub-navy">{value}</div>
                <div className="text-xs text-ossohub-slate mt-1">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
