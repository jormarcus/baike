const { PrismaClient } = require('@prisma/client');

const { seedAvoidances } = require('./seedAvoidances');
const { seedIngredients } = require('./seedIngredients');
const { seedRecipes } = require('./seedRecipes');
const { seedUsers } = require('./seedUsers');
const { seedCuisines } = require('./seedCuisines');

const prisma = new PrismaClient();

async function seed() {
  await seedAvoidances();
  await seedUsers();
  await seedIngredients();
  await seedCuisines();
  await seedRecipes();
  console.log('Seed completed');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
