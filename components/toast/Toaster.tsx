import { cookies } from 'next/headers';
import { Toasts } from './Toasts';

type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export async function Toaster() {
  const cookieStore = await cookies();
  const toasts: Toast[] = cookieStore
    .getAll()
    .filter(cookie => {
      return cookie.name.startsWith('toast-') && cookie.value;
    })
    .map(cookie => {
      return {
        id: cookie.name,
        message: cookie.value,
        type: cookie.name.split('-')[1] as ToastType,
      };
    });

  return <Toasts toasts={toasts} />;
}
