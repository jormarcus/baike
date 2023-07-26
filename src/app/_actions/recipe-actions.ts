'use server';

import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

import { formatSafeRecipe } from '@/helpers/format-dto';
import { getCurrentUser } from './user-actions';
import { Recipe } from '@/lib/validators/recipe-validator';
import { SafeCollection, SafeRecipe } from '@/types';

export async function createRecipe(recipe: Recipe) {
  console.log('creating recipe: ', recipe);
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipe,
      authorId: user.id,
    },
  });
  return formatSafeRecipe(newRecipe);
}

export async function getRecipeById(id: number) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    // include the current users rating for the recipe
    include: {
      ratings: {
        where: {
          AND: [
            {
              recipeId: id,
            },
            {
              userId: user.id,
            },
          ],
        },
      },
      // getting collections from the user, not accounting for public collections
      collections: {
        take: 5,
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!recipe) {
    return null;
  }

  return formatSafeRecipe(recipe);
}

export async function getRecipesByUserId(
  userId: number,
  pageNumber: number,
  pageSize: number
) {
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: userId,
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return recipes.map((recipe) => formatSafeRecipe(recipe));
}

export async function updateRecipe(recipeId: number, recipe: Recipe) {
  if (recipe.id === null) {
    throw new Error('Recipe id cannot be null');
  }

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: recipe,
  });

  return formatSafeRecipe(updatedRecipe);
}

export async function deleteRecipe(id: number) {
  const deletedRecipe = await prisma.recipe.delete({
    where: {
      id,
    },
  });

  return formatSafeRecipe(deletedRecipe);
}

export async function getNewFeedRecipes() {
  const recipes = await prisma.recipe.findMany({
    where: {
      isPublic: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return recipes.map((recipe) => formatSafeRecipe(recipe));
}

export async function getPopularFeedRecipes() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const recipes = await prisma.recipe.findMany({
    where: {
      isPublic: true,
      createdAt: {
        gte: twoWeeksAgo,
      },
    },
    orderBy: {
      // likesCount: 'desc',
    },
    take: 10,
  });

  return recipes.map((recipe) => formatSafeRecipe(recipe));
}

export async function importRecipe(url: string): Promise<SafeRecipe> {
  console.log('importing recipe from url: ', url);
  // TODO - Replace this with call to flask app
  return {
    id: 1,
    name: 'test',
    imageSrc: null,
    prepHours: 10,
    prepMinutes: 10,
    cookHours: 5,
    cookMinutes: 5,
    servings: 1,
    isPublic: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    averageRating: 5,
    likesCount: 1,
    // notesCount: 0,
    instructions: [],
    ingredients: [],
    description: '',
    // reviewsCount: 1,
    authorId: 1,
    url: '',
    notes: '',
    ratings: [],
    collections: [],
  };
}

export async function addCollectionsToRecipe(
  collections: SafeCollection[],
  recipeId: number
) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      collections: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  const collectionsIdsToAdd: { id: number }[] = [];
  const collectionsIdsToRemove: { id: number }[] = [];

  collections.forEach((collection) => {
    if (collection.hasRecipe) {
      collectionsIdsToAdd.push({ id: collection.id });
    } else {
      collectionsIdsToRemove.push({ id: collection.id });
    }
  });

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      collections: {
        connect: collectionsIdsToAdd,
        disconnect: collectionsIdsToRemove,
      },
    },
    include: {
      collections: true,
    },
  });

  revalidatePath(`/recipe/${recipeId}`);

  return formatSafeRecipe(updatedRecipe);
}
