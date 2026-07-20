import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, UserMinus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserLevelBadge } from "@/components/UserLevelBadge";
import { getInitials } from "@/lib/utils";

export default async function NetworkPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Quem eu sigo
  const { data: followingData } = await supabase
    .from("follows")
    .select("following_id, profiles!follows_following_id_fkey(*)")
    .eq("follower_id", user.id);

  // Quem me segue
  const { data: followersData } = await supabase
    .from("follows")
    .select("follower_id, profiles!follows_follower_id_fkey(*)")
    .eq("following_id", user.id);

  const following = followingData?.map((f) => f.profiles).filter(Boolean) ?? [];
  const followers = followersData?.map((f) => f.profiles).filter(Boolean) ?? [];

  function ProfileCard({ profile }: { profile: Record<string, unknown> }) {
    return (
      <Link href={`/profile/${profile.id}`}
        className="ossohub-card flex items-center gap-3 p-4 hover:border-slate-300 transition-all">
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage src={(profile.photo_url as string) ?? undefined} />
          <AvatarFallback>{getInitials(profile.full_name as string)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ossohub-navy text-sm truncate">{profile.full_name as string}</span>
            <UserLevelBadge xp={profile.total_xp as number} size="sm" />
          </div>
          <p className="text-xs text-ossohub-slate mt-0.5 truncate">{profile.city_state as string}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {((profile.specialties as string[]) ?? []).slice(0, 2).map((s) => (
              <Badge key={s} variant="green-light" className="text-xs px-1.5">{s}</Badge>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-4xl">
        <h1 className="text-2xl font-bold text-ossohub-navy mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-ossohub-green" /> Minha Rede
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Seguindo */}
          <div>
            <h2 className="text-sm font-semibold text-ossohub-navy mb-3">
              Seguindo ({following.length})
            </h2>
            {following.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-ossohub-slate text-sm">
                <Users className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                Você ainda não segue ninguém.{" "}
                <Link href="/explore" className="text-ossohub-green hover:underline font-medium">
                  Explore perfis
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {following.map((p) => p && <ProfileCard key={p.id as string} profile={p as Record<string, unknown>} />)}
              </div>
            )}
          </div>

          {/* Seguidores */}
          <div>
            <h2 className="text-sm font-semibold text-ossohub-navy mb-3">
              Seguidores ({followers.length})
            </h2>
            {followers.length === 0 ? (
              <div className="ossohub-card p-8 text-center text-ossohub-slate text-sm">
                <UserMinus className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                Nenhum seguidor ainda. Publique conteúdo de qualidade para crescer!
              </div>
            ) : (
              <div className="space-y-3">
                {followers.map((p) => p && <ProfileCard key={p.id as string} profile={p as Record<string, unknown>} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
