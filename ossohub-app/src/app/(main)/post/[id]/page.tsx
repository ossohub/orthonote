import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { PostPageClient } from "./PostPageClient";

interface Props { params: Promise<{ id: string }> }

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: post } = await supabase
    .from("posts")
    .select(`*, author:profiles!posts_user_id_fkey(*)`)
    .eq("id", id)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select(`*, author:profiles!comments_user_id_fkey(*)`)
    .eq("post_id", id)
    .is("parent_comment_id", null)
    .order("created_at", { ascending: true });

  const { data: myLike } = await supabase
    .from("likes")
    .select("id")
    .match({ post_id: id, user_id: user.id })
    .single();

  return (
    <PostPageClient
      post={{ ...post, is_liked_by_me: !!myLike }}
      initialComments={comments ?? []}
      currentUserId={user.id}
    />
  );
}
