export default function ProfileLoading() {
  return (
    <div className="bg-ossohub-bg-light min-h-screen py-6">
      <div className="ossohub-container max-w-3xl animate-pulse">
        <div className="ossohub-card p-6 mb-5">
          <div className="flex gap-5">
            <div className="h-24 w-24 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 bg-slate-200 rounded" />
              <div className="h-4 w-32 bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
              </div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="h-2.5 w-full bg-slate-200 rounded-full" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="flex gap-4 mb-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 w-28 bg-slate-200 rounded-lg" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="ossohub-card p-5 h-36 animate-pulse bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
