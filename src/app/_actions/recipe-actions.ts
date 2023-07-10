'use server';

import prisma from '@/lib/prismadb';

import { formatSafeRecipe } from '@/helpers/format-dto';
import { getCurrentUser } from './user-actions';
import { Recipe } from '@/lib/validators/recipe-validator';
import { SafeRecipe } from '@/types';

export async function createRecipe(recipe: Recipe) {
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
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
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
  const userRecipes = await prisma.userRecipeCollection.findMany({
    where: {
      userId,
    },
    include: {
      recipe: true,
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return userRecipes.map((userRecipe) => formatSafeRecipe(userRecipe.recipe));
}

export async function updateRecipe(recipe: SafeRecipe) {
  const { createdAt, updatedAt } = recipe;

  if (recipe.id === null) {
    throw new Error('Recipe id cannot be null');
  }

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      ...recipe,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
    },
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
      isPrivate: false,
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
      isPrivate: false,
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
    image: null,
    prepHours: 10,
    prepMinutes: 10,
    cookHours: 5,
    cookMinutes: 5,
    servings: 1,
    isPrivate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // averageRating: 5,
    // ratingsCount: 1,
    // likesCount: 1,
    // notesCount: 0,
    instructions: [],
    ingredients: [],
    // reviewsCount: 1,
    authorId: 1,
    url: '',
  };
}
