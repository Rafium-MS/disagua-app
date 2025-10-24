// app/frontend/src/components/ui/Skeleton.jsx
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-slate-200',
        className
      )}
      {...props}
    />
  );
}

export function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}