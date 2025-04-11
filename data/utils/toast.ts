import { toastMessage } from '../actions/toast';

export const toast = {
  async error(message: string) {
    await toastMessage(message, 'error');
  },
  async info(message: string) {
    await toastMessage(message, 'info');
  },
  async success(message: string) {
    await toastMessage(message, 'success');
  },
};
