// app/frontend/src/hooks/useToast.js
import { toast } from 'sonner';

export function useToast() {
  return {
    success: (message, description) => {
      toast.success(message, { description });
    },
    error: (message, description) => {
      toast.error(message, { description });
    },
    warning: (message, description) => {
      toast.warning(message, { description });
    },
    info: (message, description) => {
      toast.info(message, { description });
    },
    promise: (promise, messages) => {
      return toast.promise(promise, messages);
    },
  };
}