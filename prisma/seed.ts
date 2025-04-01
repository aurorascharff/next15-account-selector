import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACCOUNTS = [
  {
    name: 'John Doe',
    plan: 'free',
  },
  {
    name: 'Jane Smith',
    plan: 'paid',
  },
];

async function seedAccounts() {
  await Promise.all(
    ACCOUNTS.map(account => {
      return prisma.account.create({
        data: {
          name: account.name,
          plan: account.plan,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create message records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create message records', e);
    });
}

seedAccounts();
