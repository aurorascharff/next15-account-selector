export type ToastType = 'success' | 'error';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};
