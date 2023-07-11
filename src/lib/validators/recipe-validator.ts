import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  url: z.string(),
  servings: z.number(),
  isPublic: z.boolean(),
  prepHours: z.number(),
  prepMinutes: z.number(),
  cookHours: z.number(),
  cookMinutes: z.number(),
  instructions: z.string(),
  ingredients: z.string(),
  // notes: z.array(z.string()),
  image: z.string(),

  authorId: z.number().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
