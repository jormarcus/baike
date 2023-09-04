'use server';

import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';
import { parseIngredient } from 'parse-ingredient';

import { formatSafeRecipe } from '@/helpers/format-dto';
import { getCurrentUser } from './user-actions';
import { Recipe } from '@/lib/validators/recipe-validator';
import { Ingredient } from '@/lib/validators/ingredient-validator';
import { CollectionWithRecipeNames, SafeRecipe } from '@/types';
import { capitalizeFirstLetter, omit } from '@/lib/utils';
import { Recipe as PrismaRecipe } from '@prisma/client';
import { Ingredient as PrismaIngredient } from '@prisma/client';

function parseIngredients(ingredients: { input: string; id?: number }[]) {
  return ingredients.map((ingredient, index) => {
    const parsedIngredient = parseIngredient(ingredient.input)[0];
    return {
      name: capitalizeFirstLetter(parsedIngredient.description),
      quantity: parsedIngredient.quantity,
      quantity2: parsedIngredient.quantity2,
      unitOfMeasure: parsedIngredient.unitOfMeasure,
      unitOfMeasureID: parsedIngredient.unitOfMeasureID,
      isGroupHeader: parsedIngredient.isGroupHeader,
      input: ingredient.input,
      id: ingredient.id,
      order: index,
    };
  });
}

export async function createRecipe(recipe: Recipe) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const ingredients: Ingredient[] = parseIngredients(
    recipe.ingredients.map((i) => ({ input: i.input }))
  );

  // remove ingredients property from recipe object
  const formattedRecipe = omit('ingredients', recipe);

  const newRecipe = await prisma.recipe.create({
    data: {
      ...formattedRecipe,
      authorId: user.id,
      ingredients: {
        create: ingredients,
      },
    },
    include: {
      ingredients: true,
    },
  });
  return formatSafeRecipe(newRecipe);
}

export async function updateRecipe(
  recipeId: number,
  recipe: Recipe,
  deleteIngredients: number[] = []
) {
  if (recipe.id === null) {
    throw new Error('Recipe id cannot be null');
  }

  const newIngredients: Ingredient[] = parseIngredients(
    recipe.ingredients.filter((i) => !i.id).map((i) => ({ input: i.input }))
  );
  const updatedIngredients: Ingredient[] = parseIngredients(
    recipe.ingredients
      .filter((i) => i.isUpdated)
      .map((i) => ({ input: i.input, id: i.id }))
  );

  // remove ingredients property fr pinom recipe object
  const formattedRecipe = omit('ingredients', recipe);

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      ...formattedRecipe,
      ingredients: {
        create: newIngredients,
        update: updatedIngredients,
        delete: deleteIngredients.map((id) => ({ id })),
      },
    },
    include: {
      ingredients: true,
    },
  });

  return formatSafeRecipe(updatedRecipe);
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
      collections: {
        take: 5,
        select: {
          id: true,
          name: true,
        },
      },
      ingredients: {
        orderBy: {
          order: 'asc',
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
    orderBy: {
      name: 'asc',
    },
  });

  return recipes.map((recipe: PrismaRecipe) => formatSafeRecipe(recipe));
}

export async function getRecipesWithCollectionsByUserId(
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
    include: {
      collections: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return recipes.map((recipe: PrismaRecipe) => formatSafeRecipe(recipe));
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

  return recipes.map((recipe: PrismaRecipe) => formatSafeRecipe(recipe));
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

  return recipes.map((recipe: PrismaRecipe) => formatSafeRecipe(recipe));
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
  collections: CollectionWithRecipeNames[],
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
    if (collection.recipes.length > 0) {
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

export async function searchRecipes(
  query: string,
  param = '',
  skip = 0,
  take = 10
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }

  let includeObj = undefined;
  if (param === 'collections') {
    includeObj = {
      collections: {
        select: {
          id: true,
          name: true,
        },
      },
    };
  }
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: user.id,
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
    skip,
    take,
    include: includeObj,
  });

  return recipes.map((recipe: PrismaRecipe) => formatSafeRecipe(recipe));
}

export async function updateIngredientsOrder(ingredients: PrismaIngredient[]) {
  await prisma.$transaction(async (transaction) => {
    for (const ingredient of ingredients) {
      await transaction.ingredient.update({
        where: { id: ingredient.id },
        data: { order: ingredient.order },
      });
    }
  });
}
