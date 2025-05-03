import { Mail, Phone, VideoIcon } from 'lucide-react';
import React from 'react';

export default function UserActions() {
  return (
    <div className="flex gap-5 text-white dark:text-black">
      <UserAction>
        <span className="sr-only">Send message</span>
        <Mail aria-hidden="true" width={20} height={20} />
      </UserAction>
      <UserAction>
        <span className="sr-only">Start video call</span>
        <VideoIcon aria-hidden="true" width={20} height={20} />
      </UserAction>
      <UserAction>
        <span className="sr-only">Start phone call</span>
        <Phone aria-hidden="true" width={20} height={20} />
      </UserAction>
    </div>
  );
}

function UserAction({ children }: { children: React.ReactNode }) {
  return (
    <button className="hover:bg-gray cursor-pointer rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
      {children}
    </button>
  );
}
