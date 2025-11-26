import { toast as sonnerToast } from 'sonner';
import { Toast } from '@/components/toast/Toast';

export const toast = {
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },
  dismissAll: () => {
    return sonnerToast.dismiss();
  },
  error: (message: string) => {
    return sonnerToast.custom(id => {
      return (
        <Toast
          message={message}
          id={String(id)}
          type="error"
          onDismiss={() => {
            return sonnerToast.dismiss(id);
          }}
        />
      );
    });
  },
  success: (message: string) => {
    return sonnerToast.custom(id => {
      return (
        <Toast
          message={message}
          id={String(id)}
          type="success"
          onDismiss={() => {
            return sonnerToast.dismiss(id);
          }}
        />
      );
    });
  },
};
