const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedAvoidances = async () => {
  const avoidances = [
    { name: 'Milk' },
    { name: 'Eggs' },
    { name: 'Fish' },
    { name: 'Crustacean shellfish' },
    { name: 'Tree nuts' },
    { name: 'Peanuts' },
    { name: 'Wheat' },
    { name: 'Soy' },
    { name: 'Sesame' },
    { name: 'Linseed' },
    { name: 'Peach' },
    { name: 'Banana' },
    { name: 'Avocado' },
    { name: 'Kiwi fruit' },
    { name: 'Passion fruit' },
    { name: 'Celery' },
    { name: 'Garlic' },
    { name: 'Mustard' },
    { name: 'Aniseed' },
    { name: 'Chamomile' },
    { name: 'Buckwheat' },
    { name: 'Sulfites' },
    { name: 'Alcohol' },
    { name: 'Gluten' },
    { name: 'Caffeine' },
    { name: 'Lactose' },
    { name: 'Meat' },
    { name: 'Mollusc' },
  ];

  for (const avoidance of avoidances) {
    await prisma.avoidance.create({
      data: avoidance,
    });
  }
};

module.exports = { seedAvoidances };
