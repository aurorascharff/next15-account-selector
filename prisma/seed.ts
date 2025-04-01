import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACCOUNTS = [
  {
    email: 'john.doe@example.com',
    id: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    name: 'John Doe',
    plan: 'free',
  },
  {
    email: 'jane.smith@example.com',
    id: '9e525f6f-b60e-4258-8c30-c289619525d6',
    name: 'Jane Smith',
    plan: 'pro',
  },
];

async function seedAccounts() {
  await Promise.all(
    ACCOUNTS.map(account => {
      return prisma.account.create({
        data: {
          email: account.email,
          id: account.id,
          name: account.name,
          plan: account.plan,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully create account records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create account records', e);
    });
}

seedAccounts();
