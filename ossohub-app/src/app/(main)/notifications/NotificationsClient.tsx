"use client";

import Link from "next/link";
import { Bell, Heart, MessageSquare, UserPlus, Award, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import type { Notification } from "@/lib/types";

const TYPE_CONFIG = {
  new_like:      { icon: Heart,        color: "text-red-500",    bg: "bg-red-50" },
  new_comment:   { icon: MessageSquare,color: "text-blue-500",   bg: "bg-blue-50" },
  new_follower:  { icon: UserPlus,     color: "text-teal-500",   bg: "bg-teal-50" },
  badge_unlocked:{ icon: Award,        color: "text-amber-500",  bg: "bg-amber-50" },
  post_featured: { icon: Star,         color: "text-purple-500", bg: "bg-purple-50" },
};

export function NotificationsClient({ initialNotifications }: { initialNotifications: Notification[] }) {
  if (initialNotifications.length === 0) {
    return (
      <div className="bg-ossohub-bg-light min-h-screen py-6">
        <div className="ossohub-container max-w-2xl">
          <h1 className="text-2xl font-bold text-ossohub-navy mb-6 flex items-center gap-2">
            <Bell className="h-6 w-6 text-ossohub-green" /> Notificações
          </h1>
          <div className="ossohub-card p-12 text-center">
            <Bell className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-ossohub-slate">Nenhuma notificação ainda.</p>
            <p className="text-sm text-slate-400 mt-1">Elas aparecerão aqui quando alguém interagir com você.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-2xl">
        <h1 className="text-2xl font-bold text-ossohub-navy mb-6 flex items-center gap-2">
          <Bell className="h-6 w-6 text-ossohub-green" /> Notificações
        </h1>

        <div className="ossohub-card divide-y divide-slate-100">
          {initialNotifications.map((n) => {
            const config = TYPE_CONFIG[n.type];
            const Icon = config.icon;
            const href = n.reference_id
              ? n.type === "new_follower" ? `/profile/${n.actor_id}` : `/post/${n.reference_id}`
              : "#";

            return (
              <Link
                key={n.id}
                href={href}
                className={`flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors ${!n.read ? "bg-ossohub-green-light/20" : ""}`}
              >
                {/* Ícone do tipo */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>

                {/* Avatar do ator */}
                {n.actor && (
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={n.actor.photo_url ?? undefined} />
                    <AvatarFallback className="text-xs">{getInitials(n.actor.full_name)}</AvatarFallback>
                  </Avatar>
                )}

                {/* Mensagem */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ossohub-navy">{n.message}</p>
                  <p className="text-xs text-ossohub-slate mt-0.5">{formatRelativeDate(n.created_at)}</p>
                </div>

                {!n.read && (
                  <div className="h-2 w-2 rounded-full bg-ossohub-green shrink-0 mt-2" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
