import { cookies } from 'next/headers';
import { Toasts } from './Toasts';

export async function Toaster() {
  const cookieStore = await cookies();
  const toasts = cookieStore
    .getAll()
    .filter(cookie => {
      return cookie.name.startsWith('toast-') && cookie.value;
    })
    .map(cookie => {
      return {
        id: cookie.name,
        message: cookie.value,
        type: cookie.name.split('-')[1] as 'success' | 'error' | 'info',
      };
    });

  return <Toasts toasts={toasts} />;
}
