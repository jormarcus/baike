import prisma from '@/lib/prismadb';
import { getCurrentUser } from './user-actions';

export async function getAllergies() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const allergies = await prisma.allergy.findMany({
    where: {
      userId: user.id,
    },
    include: {
      ingredients: true,
    },
  });

  console.log('allergies', allergies);

  return allergies;
}

export async function createAllergies(ingredientIds: number[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const newAllergies = await prisma.allergy.create({
    data: {
      userId: user.id,
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
    },
    include: {
      ingredients: true,
    },
  });

  console.log('created allergies', newAllergies);

  return newAllergies;
}

export async function updateAllergies(ingredientIds: number[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const allergies = await prisma.allergy.update({
    where: {
      id: user.id,
    },
    data: {
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
    },
    include: {
      ingredients: true,
    },
  });

  console.log('updated allergies', allergies);

  return allergies;
}

export async function getAvoidances() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const avoidances = await prisma.avoidance.findMany({
    where: {
      userId: user.id,
    },
    include: {
      ingredients: true,
    },
  });

  console.log('avoidances', avoidances);

  return avoidances;
}

export async function createAvoidances(ingredientIds: number[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const newAvoidances = await prisma.avoidance.create({
    data: {
      userId: user.id,
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
    },
    include: {
      ingredients: true,
    },
  });

  console.log('created Avoidances', newAvoidances);

  return newAvoidances;
}
