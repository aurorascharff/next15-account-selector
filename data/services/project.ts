import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentAccount } from './auth';

export async function getProjects() {
  await slow(1500);
  const currentAccount = await getCurrentAccount();

  return prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      accountId: currentAccount?.id,
    },
  });
}
