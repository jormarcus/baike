'use server';

import prisma from '@/lib/prismadb';
import { Collection } from '@prisma/client';
import { getCurrentUser } from './user-actions';
import { formatSafeCollection } from '@/helpers/format-dto';

export async function createCollection(name: string) {
  console.log('creating collection: ', name);
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const newCollection = await prisma.collection.create({
    data: {
      name,
      userId: user.id,
    },
  });
  return formatSafeCollection(newCollection);
}

export async function getCollectionById(id: number) {
  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
  });

  if (!collection) {
    return null;
  }

  return formatSafeCollection(collection);
}

export async function getCollectionsByUserId(userId: number) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      recipes: {
        take: 5,
        select: {
          name: true,
          imageSrc: true,
        },
      },
    },
  });

  return collections.map((collection) => formatSafeCollection(collection));
}

export async function updateCollection(collection: Collection) {
  if (collection.id === null) {
    throw new Error('Collection id cannot be null');
  }

  const updatedCollection = await prisma.collection.update({
    where: {
      id: collection.id,
    },
    data: collection,
  });

  return formatSafeCollection(updatedCollection);
}

export async function deleteCollection(id: number) {
  const deletedCollection = await prisma.collection.delete({
    where: {
      id,
    },
  });

  return formatSafeCollection(deletedCollection);
}
