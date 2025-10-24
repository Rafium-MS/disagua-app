import { Toaster as Sonner } from 'sonner';

export default function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'rounded-lg shadow-lg',
          title: 'font-semibold',
          description: 'text-sm',
          success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          error: 'bg-rose-50 text-rose-900 border-rose-200',
          warning: 'bg-amber-50 text-amber-900 border-amber-200',
          info: 'bg-blue-50 text-blue-900 border-blue-200',
        },
      }}
    />
  );
}