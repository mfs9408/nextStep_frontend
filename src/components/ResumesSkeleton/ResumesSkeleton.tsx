import { Skeleton } from "@/components/ui/skeleton";

const ResumesSkeleton = () => (
  <div className="space-y-3">
    loading
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="rounded-xl border bg-card p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full space-y-2">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ResumesSkeleton;
