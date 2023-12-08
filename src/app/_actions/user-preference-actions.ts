'use server';

import { Avoidance } from '@prisma/client';

import prisma from '@/lib/prismadb';
import { getSession } from './user-actions';

export async function getAvoidances() {
  return await prisma.avoidance.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getUserAvoidances() {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error('Session not found');
  }

  // use the session email to get the user
  // so we do not have to get the user twice
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      avoidances: true,
    },
  });

  if (!currentUser) {
    throw new Error('User not found');
  }

  return currentUser.avoidances;
}

export async function addAvoidancesToUser(avoidances: Avoidance[]) {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error('Session not found');
  }

  const updatedUser = await prisma.user.update({
    where: {
      email: session.user.email as string,
    },
    data: {
      avoidances: {
        connect: avoidances.map((avoidance) => ({ id: avoidance.id })),
      },
    },
    include: {
      avoidances: true,
    },
  });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser.avoidances;
}
