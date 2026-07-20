export function PostCardSkeleton() {
  return (
    <div className="ossohub-card p-5 animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-4">
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-5/6 bg-slate-100 rounded" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
        <div className="h-6 w-14 bg-slate-100 rounded-full" />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
        <div className="h-4 w-16 bg-slate-100 rounded" />
        <div className="h-4 w-20 bg-slate-100 rounded" />
      </div>
    </div>
  );
}
