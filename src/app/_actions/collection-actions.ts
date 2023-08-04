'use server';

import prisma from '@/lib/prismadb';
import { Collection } from '@prisma/client';
import { getCurrentUser } from './user-actions';
import { formatSafeCollection } from '@/helpers/format-dto';
import { revalidatePath } from 'next/cache';

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
  });

  if (revalidatePage) {
    revalidatePath('/collections');
  }

  return formatSafeCollection(newCollection);
}

export async function getCollectionById(id: number) {
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

  return formatSafeCollection(
    collection,
    collection.recipes.length > 0,
    collection.recipes
  );
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

  return collections.map((collection: Collection) =>
    formatSafeCollection(
      collection,
      collection.recipes.length > 0,
      collection.recipes
    )
  );
}

export async function getCollectionsWithRecipesByUserIdAndRecipeId(
  userId: number,
  recipeId: number
) {
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      recipes: {
        where: {
          id: recipeId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const collectionsWithRecipe = collections.map((collection: Collection) => ({
    ...collection,
    hasRecipe: collection.recipes.length > 0,
  }));

  return collectionsWithRecipe.map((collection: Collection) =>
    formatSafeCollection(collection, collection.hasRecipe)
  );
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

  const collectionRecipes = await prisma.collection.update({
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

  revalidatePath(`/collection/${collectionId}`);
}
