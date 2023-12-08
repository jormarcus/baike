'use server';

import prisma from '@/lib/prismadb';
import { getCurrentUser } from './user-actions';
import { revalidatePath } from 'next/cache';

export async function upsertRating(
  rating: number,
  recipeId: number,
  ratingId: number | undefined
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  if (ratingId) {
    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (existingRating) {
      // Update the existing rating
      await prisma.rating.update({
        where: { id: existingRating.id },
        data: { rating },
      });
    }
  } else {
    // Create a new rating and update the recipe's average rating in a single query
    await prisma.rating.create({
      data: {
        rating,
        recipeId,
        userId: user.id,
      },
    });
  }

  const {
    _avg: { rating: averageRating },
  } = await prisma.rating.aggregate({
    where: {
      recipeId,
    },
    _avg: {
      rating: true,
    },
  });

  if (!averageRating) {
    throw new Error('Average rating not found');
  }

  // Update the recipe's average rating
  await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      averageRating,
    },
  });

  revalidatePath(`/recipe/${recipeId}`);
}
