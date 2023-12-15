'use server';

import prisma from '@/lib/prismadb';
import { Collection } from '@prisma/client';
import { getCurrentUser } from './user-actions';
import {
  formatSafeCollection,
  formatSafeCollectionWithRecipes,
} from '@/helpers/format-dto';
import { revalidatePath } from 'next/cache';
import {
  CollectionWithRecipeNames,
  CollectionWithRecipes,
  SafeCollection,
} from '@/types';

export async function createCollection(name: string, revalidatePage: boolean) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const newCollection = await prisma.collection.create({
    data: {
      name,
      userId: user.id,
    },
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (revalidatePage) {
    revalidatePath('/collections');
  }

  return newCollection;
}

export async function getCollectionTotalCount(query: string): Promise<number> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.collection.count({
    where: {
      AND: [
        { userId: user.id },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}

export async function getCollectionWithRecipesById(id: number) {
  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      recipes: true,
    },
  });

  if (!collection) {
    return null;
  }

  return formatSafeCollectionWithRecipes(collection);
}

export async function getFirstCollectionWithRecipes() {
  const collection = await prisma.collection.findFirst({
    orderBy: {
      name: 'asc',
    },
    include: {
      recipes: true,
    },
  });

  if (!collection) {
    return null;
  }

  return formatSafeCollectionWithRecipes(collection);
}

export async function getCollectionsByUserId(userId: number) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
  });

  return collections.map((collection: Collection) =>
    formatSafeCollection(collection)
  );
}

export async function getCollectionsWithRecipesByUserId(userId: number) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      recipes: {
        take: 5,
      },
    },
  });

  return collections.map((collection: CollectionWithRecipes) =>
    formatSafeCollection(collection)
  );
}

// used when adding collections to a recipe and to see which collections a recipe is already in
export async function getCollectionsWithRecipeNameByRecipeId(
  recipeId: number
): Promise<CollectionWithRecipeNames[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const collections = await prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    include: {
      recipes: {
        where: {
          id: recipeId,
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return collections;
}

// for collections page initial load
export async function getCollectionsWithCount(query = ''): Promise<{
  collections: SafeCollection[];
  totalCount: number;
}> {
  const collections = await getPaginatedCollections(query);
  const totalCount = await getCollectionTotalCount(query);

  return { collections, totalCount };
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

export async function addRecipesToCollection(
  newRecipeIds: number[],
  removedRecipeIds: number[],
  collectionId: number
) {
  const newCollectionRecipes = newRecipeIds.map((id) => ({
    id,
  }));
  const removedCollectionRecipes = removedRecipeIds.map((id) => ({
    id,
  }));

  await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      recipes: {
        connect:
          newCollectionRecipes.length > 0 ? newCollectionRecipes : undefined,
        disconnect:
          removedCollectionRecipes.length > 0
            ? removedCollectionRecipes
            : undefined,
      },
    },
  });

  revalidatePath(`/collections/${collectionId}`);
}

// collections page search/infscroll
export async function getPaginatedCollections(query = '', skip = 0, take = 10) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  const collections = await prisma.collection.findMany({
    where: {
      AND: [
        { userId: user.id },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      recipes: {
        take: 9,
      },
    },
    orderBy: {
      name: 'asc',
    },
    skip,
    take,
  });

  return collections.map(formatSafeCollectionWithRecipes);
}
