import prisma from '@/lib/prismadb';
import { seedUsers } from './seedUsers';
import { seedRecipes } from './seedRecipes';
import { seedIngredients } from './seedIngredients';

async function main() {
  await seedUsers();
  await seedRecipes();
  await seedIngredients();
  console.log('Seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
