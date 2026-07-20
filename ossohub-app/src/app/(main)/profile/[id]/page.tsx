import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ProfilePageClient } from "./ProfilePageClient";

interface Props { params: Promise<{ id: string }> }

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", id).single();
  if (!profile) notFound();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", id);

  const { data: followData } = await supabase
    .from("follows")
    .select("id")
    .match({ follower_id: user.id, following_id: id })
    .single();

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", id);

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", id);

  return (
    <ProfilePageClient
      profile={profile}
      posts={posts ?? []}
      achievements={achievements ?? []}
      isOwnProfile={user.id === id}
      isFollowing={!!followData}
      followersCount={followersCount ?? 0}
      followingCount={followingCount ?? 0}
      currentUserId={user.id}
    />
  );
}
