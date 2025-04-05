import React from 'react';
import { getCurrentAccount } from '@/data/services/account';

export default async function WelcomeMessage() {
  const currentAccount = await getCurrentAccount();

  return <h1 className="text-3xl"> Welcome, {currentAccount?.name}!</h1>;
}

export function WelcomeMessageSkeleton() {
  return (
    <h1 className="text-3xl">
      Welcome,
      <span className="text-gray ml-4">...</span>
    </h1>
  );
}
