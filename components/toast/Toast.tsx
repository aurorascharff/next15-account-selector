import { toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { ToastType } from '@/types/toast';
import { cn } from '@/utils/cn';
import { CloseIcon } from '../ui/icons/CloseIcon';

const background = {
  error: 'bg-red-500',
  info: 'bg-yellow-400',
  success: 'bg-green-500',
};
const text = {
  error: 'text-white outline-white',
  info: 'text-black outline-black',
  success: 'text-white outline-white',
};

type Props = {
  message: string;
  id: string;
  type: ToastType;
};

export function Toast({ message, id, type }: Props) {
  const toastBackground = background[type];
  const toastText = text[type];

  return (
    <div
      className={cn(
        toastBackground,
        toastText,
        'flex items-center justify-between gap-4 rounded-lg px-4 py-2 text-sm shadow-md',
      )}
    >
      <span className="sr-only">{type}</span>
      <p>{message}</p>
      <form
        action={async () => {
          sonnerToast.dismiss(id);
          await dismissToast(id);
        }}
      >
        <button className="rounded-full p-1 hover:outline" type="submit">
          <span className="sr-only">Close</span>
          <CloseIcon width={12} height={12} aria-hidden="true" className={toastText} />
        </button>
      </form>
    </div>
  );
}
