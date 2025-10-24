export default function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-slate-200 border-t-slate-900',
          sizeClasses[size]
        )}
      />
    </div>
  );
}