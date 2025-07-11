import Image from 'next/image';
import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { getCurrentAccount } from '@/data/services/auth';

export default async function AccountCircle() {
  const currentAccount = await getCurrentAccount();

  return (
    <div className="flex flex-col items-center gap-4 md:gap-10">
      <div className="bg-section size-20 rounded-full md:size-30 lg:size-[150px]">
        <ViewTransition>
          <Image
            src={'/' + currentAccount?.id + '.jpg'}
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full"
          />
        </ViewTransition>
      </div>
    </div>
  );
}

export function AccountCircleSkeleton() {
  return <div className="dark:bg-section size-[80px] rounded-full bg-gray-300 md:size-30 lg:size-[150px]" />;
}
