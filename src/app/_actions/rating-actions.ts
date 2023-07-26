'use server';

import prisma from '@/lib/prismadb';
import { getCurrentUser } from './user-actions';

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
}
