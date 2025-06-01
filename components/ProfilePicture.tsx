import Image from 'next/image';
import React, { use } from 'react';

import type { Account } from '@prisma/client';

type Props = {
  currentAccountPromise: Promise<Account | null>;
};

export default function ProfilePicture({ currentAccountPromise }: Props) {
  const currentAccount = use(currentAccountPromise);

  return (
    <div className="flex flex-col items-center gap-4 md:gap-10">
      <div className="bg-section size-20 rounded-full md:size-30 lg:size-[150px]">
        <Image
          src={'/' + currentAccount?.id + '.jpg'}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export function ProfilePictureSkeleton() {
  return <div className="dark:bg-section size-[80px] rounded-full bg-gray-300 md:size-[150px]" />;
}
