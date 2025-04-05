import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACCOUNTS = [
  {
    email: 'jane.smith@gmail.com',
    id: 'a833bc10-64dd-4069-8573-4bbb4b0065ed',
    name: 'Jane Smith',
    plan: 'free',
    type: 'personal',
  },
  {
    email: 'jane.smith@work.com',
    id: '9e525f6f-b60e-4258-8c30-c289619525d6',
    name: 'Jane Doe Smith',
    plan: 'pro',
    type: 'business',
  },
  {
    email: 'janesmith85@hotmail.com',
    id: 'd71ab200-18ed-4384-a4a7-a907bf169c9f',
    inactive: true,
    name: 'Jane S.',
    plan: 'free',
    type: 'personal',
  },
];

async function seedAccounts() {
  await Promise.all(
    ACCOUNTS.map(account => {
      return prisma.account.create({
        data: {
          email: account.email,
          id: account.id,
          inactive: account.inactive,
          name: account.name,
          plan: account.plan,
          type: account.type,
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
