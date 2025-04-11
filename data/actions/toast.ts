'use server';

import { cookies } from 'next/headers';

export async function toastMessage(message: string, type: 'success' | 'error' | 'info') {
  const cookieStore = await cookies();
  const id = crypto.randomUUID();
  cookieStore.set(`toast-${type}-${id}`, message, {
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });
}

export async function dismissToast(toastId: string) {
  const cookieStore = await cookies();
  cookieStore.delete(toastId);
}
