'use server';

import prisma from '@/lib/prismadb';
import { convertToInterval } from '@/helpers/date-time-helper';
import { SafeRecipe } from '../../types';
import { formatSafeRecipe } from '@/helpers/format-dto';
import { isNullOrUndefined } from '@/lib/utils';

export async function createRecipe(recipe: SafeRecipe) {
  const { prepTime, cookTime, createdAt, updatedAt } = recipe;
  const prepTimeStr: string = !isNullOrUndefined(prepTime)
    ? convertToInterval(prepTime)
    : '';
  const cookTimeStr: string = !isNullOrUndefined(cookTime)
    ? convertToInterval(cookTime)
    : '';

  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipe,
      prepTime: prepTimeStr,
      cookTime: cookTimeStr,
      isPrivate: recipe.isPrivate || false,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
    },
  });

  return formatSafeRecipe(newRecipe);
}

export async function getRecipeById(id: string) {
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
  userId: string,
  pageNumber: number,
  pageSize: number
) {
  const userRecipes = await prisma.userRecipeCollection.findMany({
    where: {
      userId: userId,
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
  const { prepTime, cookTime, createdAt, updatedAt } = recipe;
  const prepTimeStr: string = !isNullOrUndefined(prepTime)
    ? convertToInterval(prepTime)
    : '';
  const cookTimeStr: string = !isNullOrUndefined(cookTime)
    ? convertToInterval(cookTime)
    : '';

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      ...recipe,
      prepTime: prepTimeStr,
      cookTime: cookTimeStr,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
    },
  });

  return formatSafeRecipe(updatedRecipe);
}

export async function deleteRecipe(id: string) {
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
      likesCount: 'desc',
    },
    take: 10,
  });

  return recipes.map((recipe) => formatSafeRecipe(recipe));
}
