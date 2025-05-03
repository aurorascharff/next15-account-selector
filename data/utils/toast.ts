import { toastMessage } from '../actions/toast';

export const toast = {
  async error(message: string) {
    await toastMessage(message, 'error');
  },
  async success(message: string) {
    await toastMessage(message, 'success');
  },
};
