import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  // Password : test
  await prisma.todo.create({
    data: {
      name: 'Todo1',
      deadline: new Date('2023-09-01'),
      employee: 'Julien',
    },
  });
  await prisma.todo.create({
    data: {
      name: 'Todo2',
      deadline: new Date('2023-10-01'),
      employee: 'Axel',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
