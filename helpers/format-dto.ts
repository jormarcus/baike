import { SafeRecipe } from '@/app/types';
import { formatDuration, getTimeInMinutes } from '@/helpers/date-time-helper';
import { Recipe } from '@prisma/client';

export function formatSafeRecipe(recipe: Recipe): SafeRecipe {
  const { prepTime, cookTime } = recipe;
  return {
    ...recipe,
    prepTimeStr: prepTime ? formatDuration(prepTime.getTime()) : null,
    prepTime: prepTime ? getTimeInMinutes(prepTime.getTime()) : null,
    cookTimeStr: cookTime ? formatDuration(cookTime.getTime()) : null,
    cookTime: cookTime ? getTimeInMinutes(cookTime.getTime()) : null,
    createdAt: recipe.createdAt?.toISOString() ?? '',
    updatedAt: recipe.updatedAt?.toISOString() ?? '',
  };
}
