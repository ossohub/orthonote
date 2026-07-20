import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FeedClient } from "./FeedClient";

export default async function FeedPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Buscar posts com autor
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles!posts_user_id_fkey(id, full_name, photo_url, total_xp, current_level, city_state, specialties)
    `)
    .order("created_at", { ascending: false })
    .limit(20);

  // Buscar likes do usuário atual
  const { data: myLikes } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", user.id);

  const likedPostIds = new Set(myLikes?.map((l) => l.post_id) ?? []);

  const postsWithLikes = (posts ?? []).map((p) => ({
    ...p,
    is_liked_by_me: likedPostIds.has(p.id),
  }));

  // Buscar perfil do usuário
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return <FeedClient initialPosts={postsWithLikes} currentUserId={user.id} profile={profile} />;
}
