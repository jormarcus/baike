'use server';

import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

import { formatSafeRecipe } from '@/helpers/format-dto';
import { getCurrentUser } from './user-actions';
import { Recipe } from '@/lib/validators/recipe-validator';
import { SafeCollection, SafeRecipe } from '@/types';

// used this from the form's action
// possibly delete in future
// export async function addRecipe(recipe: FormData) {
//   'use server';

//   console.log('creating recipe: ', recipe);
//   const user = await getCurrentUser();
//   if (!user) {
//     throw new Error('User not found');
//   }
//   const name = recipe.get('name') as string;
//   const url = recipe.get('url') as string;
//   const isPublic = recipe.get('isPublic') as string;
//   const servings = recipe.get('servings') as string;
//   const prepHours = recipe.get('prepHours') as string;
//   const prepMinutes = recipe.get('prepMinutes') as string;
//   const cookHours = recipe.get('cookHours') as string;
//   const cookMinutes = recipe.get('cookMinutes') as string;
//   const instructions = recipe.get('instructions') as string;
//   const ingredients = recipe.get('ingredients') as string;
//   const image = recipe.get('image') as string;

//   await prisma.recipe.create({
//     data: {
//       name,
//       url,
//       isPublic: isPublic === 'true',
//       servings: Number(servings),
//       prepHours: Number(prepHours),
//       prepMinutes: Number(prepMinutes),
//       cookHours: Number(cookHours),
//       cookMinutes: Number(cookMinutes),
//       ingredients: [ingredients],
//       instructions: [instructions],
//       imageSrc: image,
//       authorId: user.id,
//     },
//   });
// }

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
  revalidatePath(`/recipe/${newRecipe.id}`);
  // return formatSafeRecipe(newRecipe);
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
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: userId,
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return recipes.map((recipe) => formatSafeRecipe(recipe));
}

export async function updateRecipe(recipe: Recipe) {
  if (recipe.id === null) {
    throw new Error('Recipe id cannot be null');
  }

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipe.id,
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
    // averageRating: 5,
    // ratingsCount: 1,
    likesCount: 1,
    // notesCount: 0,
    instructions: [],
    ingredients: [],
    // reviewsCount: 1,
    authorId: 1,
    url: '',
    notes: '',
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

  return formatSafeRecipe(updatedRecipe);
}
