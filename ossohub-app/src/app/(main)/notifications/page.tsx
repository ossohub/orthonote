import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NotificationsClient } from "./NotificationsClient";

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: notifications } = await supabase
    .from("notifications")
    .select(`*, actor:profiles!notifications_actor_id_fkey(id, full_name, photo_url, total_xp)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  // Marcar todas como lidas
  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false);

  return <NotificationsClient initialNotifications={notifications ?? []} />;
}
