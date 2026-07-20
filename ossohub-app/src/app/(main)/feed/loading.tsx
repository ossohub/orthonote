import { PostCardSkeleton } from "@/components/PostCardSkeleton";

export default function FeedLoading() {
  return (
    <div className="ossohub-container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block">
          <div className="ossohub-card p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-slate-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-3 w-20 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full" />
            <div className="h-9 w-full bg-slate-100 rounded-xl mt-4" />
          </div>
        </div>

        {/* Posts skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="ossohub-card p-3 h-12 animate-pulse bg-white" />
          {Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>

        {/* Sidebar direita skeleton */}
        <div className="hidden lg:block">
          <div className="ossohub-card p-5 h-48 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
