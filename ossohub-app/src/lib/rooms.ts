import { createClient } from "@/lib/supabase/client";
import type { DiscussionRoom, RoomMessage, RoomKind } from "@/lib/types";

// ============================================================
// Salas de discussão (chat da equipe) — criadas pelo preceptor
// ============================================================
// O bucket "room-images" é privado: o caminho gravado em
// room_messages.image_url é o *path* dentro do bucket (não uma URL
// pública), e a UI resolve uma signed URL temporária na hora de exibir
// (getRoomImageUrl). Isso garante que só participantes da sala (RLS de
// storage.objects via is_room_participant) conseguem ver as imagens.

export async function listRooms(teamId: string): Promise<DiscussionRoom[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("discussion_rooms")
    .select("*, creator:profiles!discussion_rooms_created_by_fkey(*)")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as DiscussionRoom[];
}

export async function getRoom(roomId: string): Promise<DiscussionRoom | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("discussion_rooms")
    .select("*, creator:profiles!discussion_rooms_created_by_fkey(*)")
    .eq("id", roomId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as DiscussionRoom | null;
}

export async function createRoom(teamId: string, name: string, kind: RoomKind = "geral"): Promise<DiscussionRoom> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const { data, error } = await supabase
    .from("discussion_rooms")
    .insert({ team_id: teamId, created_by: user.id, name, kind })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as DiscussionRoom;
}

export async function deleteRoom(roomId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("discussion_rooms").delete().eq("id", roomId);
  if (error) throw new Error(error.message);
}

export async function listMessages(roomId: string): Promise<RoomMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("room_messages")
    .select("*, sender:profiles!room_messages_sender_id_fkey(*)")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as RoomMessage[];
}

export async function sendTextMessage(roomId: string, body: string): Promise<RoomMessage> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const trimmed = body.trim();
  if (!trimmed) throw new Error("Mensagem vazia");
  if (trimmed.length > 4000) throw new Error("Mensagem muito longa (máx. 4000 caracteres)");

  const { data, error } = await supabase
    .from("room_messages")
    .insert({ room_id: roomId, sender_id: user.id, body: trimmed, message_type: "text" })
    .select("*, sender:profiles!room_messages_sender_id_fkey(*)")
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as RoomMessage;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

export async function sendImageMessage(roomId: string, file: File, caption?: string): Promise<RoomMessage> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Formato de imagem não suportado (use JPG, PNG, WEBP ou GIF)");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Imagem muito grande (máx. 8MB)");
  }

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  // path começa com o room_id — é o que a RLS de storage.objects usa
  // (is_room_participant) para decidir quem pode ler/escrever.
  const path = `${roomId}/${user.id}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("room-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await supabase
    .from("room_messages")
    .insert({
      room_id: roomId,
      sender_id: user.id,
      body: caption?.trim() || null,
      image_url: path,
      message_type: "image",
    })
    .select("*, sender:profiles!room_messages_sender_id_fkey(*)")
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as RoomMessage;
}

// Resolve o path privado gravado em image_url para uma URL temporária
// assinada (expira em 1h) — só funciona para quem passa na RLS de
// storage.objects (participante da sala).
export async function getRoomImageUrl(path: string): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("room-images").createSignedUrl(path, 3600);
  if (error) return null;
  return data.signedUrl;
}

export async function deleteMessage(messageId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("room_messages").delete().eq("id", messageId);
  if (error) throw new Error(error.message);
}

// Assina o canal Realtime da sala — chame `channel.unsubscribe()` ao desmontar.
export function subscribeToRoom(roomId: string, onInsert: (message: RoomMessage) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel(`room-${roomId}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${roomId}` },
      async (payload) => {
        const row = payload.new as RoomMessage;
        // busca o sender pra já entregar populado (o payload do realtime não traz joins)
        const { data: sender } = await supabase.from("profiles").select("*").eq("id", row.sender_id).maybeSingle();
        onInsert({ ...row, sender: sender ?? undefined });
      }
    )
    .subscribe();
  return channel;
}
