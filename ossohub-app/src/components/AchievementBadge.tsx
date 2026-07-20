import { BADGES } from "@/lib/xp";
import type { BadgeKey } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  badgeKey: BadgeKey;
  unlocked?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function AchievementBadge({
  badgeKey,
  unlocked = true,
  size = "md",
  showLabel = true,
}: AchievementBadgeProps) {
  const badge = BADGES[badgeKey];

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 group relative",
        !unlocked && "opacity-40 grayscale"
      )}
    >
      {/* Badge icon */}
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border-2 transition-transform group-hover:scale-105",
          unlocked ? badge.color : "bg-slate-100 text-slate-400 border-slate-200",
          unlocked ? "border-transparent" : "",
          {
            "h-10 w-10 text-lg": size === "sm",
            "h-14 w-14 text-2xl": size === "md",
            "h-20 w-20 text-3xl": size === "lg",
          }
        )}
      >
        {badge.emoji}
      </div>

      {/* Nome */}
      {showLabel && (
        <span
          className={cn(
            "text-center font-medium leading-tight",
            {
              "text-xs max-w-[64px]":  size === "sm",
              "text-xs max-w-[80px]":  size === "md",
              "text-sm max-w-[96px]":  size === "lg",
            },
            unlocked ? "text-ossohub-navy" : "text-slate-400"
          )}
        >
          {badge.name}
        </span>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block">
        <div className="bg-ossohub-navy text-white text-xs rounded-lg px-3 py-2 max-w-[160px] text-center shadow-lg whitespace-normal">
          {unlocked ? badge.description : `Bloqueado: ${badge.description}`}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ossohub-navy" />
        </div>
      </div>
    </div>
  );
}
