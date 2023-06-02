'use server';

// TODO check if use server is needed, may need to add experimental arg to config

import prisma from '@/lib/prismadb';
import { convertToInterval } from '@/helpers/date-time-helper';
import { SafeRecipe } from '../types';
import { formatSafeRecipe } from '@/helpers/format-dto';
import { isNullOrUndefined } from '@/lib/utils';

export async function createRecipe(recipe: SafeRecipe) {
  const { prepTime, cookTime } = recipe;
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
    },
  });

  console.log('Created recipe:', newRecipe);

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
