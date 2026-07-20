import { getLevelFromXP, getProgressToNextLevel, LEVELS } from "@/lib/xp";
import { cn } from "@/lib/utils";

interface XPProgressBarProps {
  xp: number;
  className?: string;
}

export function XPProgressBar({ xp, className }: XPProgressBarProps) {
  const level = getLevelFromXP(xp);
  const { current, needed, percent, isMax } = getProgressToNextLevel(xp);
  const config = LEVELS[level];
  const nextConfig = level < 5 ? LEVELS[(level + 1) as 2 | 3 | 4 | 5] : null;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Nível atual → próximo */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-ossohub-navy">
          {config.emoji} Nv.{level} {config.name}
        </span>
        {!isMax && nextConfig && (
          <span className="text-ossohub-slate text-xs">
            {nextConfig.emoji} {nextConfig.name}
          </span>
        )}
      </div>

      {/* Barra de progresso */}
      <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-ossohub-green transition-all duration-700"
          style={{ width: `${isMax ? 100 : percent}%` }}
        />
      </div>

      {/* XP info */}
      <div className="flex items-center justify-between text-xs text-ossohub-slate">
        <span>{xp} XP total</span>
        {isMax ? (
          <span className="text-ossohub-green font-medium">Nível máximo atingido!</span>
        ) : (
          <span>{current} / {needed} XP para o próximo nível</span>
        )}
      </div>
    </div>
  );
}
