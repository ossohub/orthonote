import { cn } from "@/lib/utils";

export type Level = 1 | 2 | 3 | 4 | 5;

const LEVEL_CONFIG: Record<
  Level,
  { name: string; emoji: string; className: string; minXP: number; maxXP: number | null }
> = {
  1: { name: "Aprendiz",    emoji: "🦴", className: "level-aprendiz",    minXP: 0,    maxXP: 150 },
  2: { name: "Residente",   emoji: "🩺", className: "level-residente",   minXP: 151,  maxXP: 400 },
  3: { name: "Especialista",emoji: "⚕️", className: "level-especialista", minXP: 401,  maxXP: 800 },
  4: { name: "Mestre",      emoji: "🏆", className: "level-mestre",      minXP: 801,  maxXP: 1500 },
  5: { name: "Lenda",       emoji: "⭐", className: "level-lenda",       minXP: 1501, maxXP: null },
};

export function getLevelFromXP(xp: number): Level {
  if (xp >= 1501) return 5;
  if (xp >= 801)  return 4;
  if (xp >= 401)  return 3;
  if (xp >= 151)  return 2;
  return 1;
}

export function getXPProgress(xp: number): { current: number; needed: number; percent: number } {
  const level = getLevelFromXP(xp);
  const config = LEVEL_CONFIG[level];
  const current = xp - config.minXP;
  const needed = config.maxXP !== null ? config.maxXP - config.minXP : 0;
  const percent = needed > 0 ? Math.min(100, Math.round((current / needed) * 100)) : 100;
  return { current, needed, percent };
}

interface UserLevelBadgeProps {
  xp: number;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function UserLevelBadge({ xp, size = "sm", showName = false }: UserLevelBadgeProps) {
  const level = getLevelFromXP(xp);
  const config = LEVEL_CONFIG[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        config.className,
        {
          "text-xs px-2 py-0.5": size === "sm",
          "text-sm px-3 py-1":   size === "md",
          "text-base px-4 py-1.5": size === "lg",
        }
      )}
    >
      <span>{config.emoji}</span>
      {showName && <span>Nv.{level} {config.name}</span>}
      {!showName && <span>{level}</span>}
    </span>
  );
}
