import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ExploreClient } from "./ExploreClient";

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Usuários sugeridos (quem ainda não segue)
  const { data: follows } = await supabase
    .from("follows").select("following_id").eq("follower_id", user.id);
  const followingIds = follows?.map((f) => f.following_id) ?? [];

  const { data: suggested } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .not("id", "in", `(${[...followingIds, user.id].join(",")})`)
    .order("total_xp", { ascending: false })
    .limit(12);

  // Posts em destaque
  const { data: featured } = await supabase
    .from("posts")
    .select(`*, author:profiles!posts_user_id_fkey(*)`)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <ExploreClient
      suggestedUsers={suggested ?? []}
      featuredPosts={featured ?? []}
      currentUserId={user.id}
    />
  );
}
