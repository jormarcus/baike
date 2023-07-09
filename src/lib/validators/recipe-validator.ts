import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  servings: z.string(),
  instructions: z.array(z.string()),
  ingredients: z.array(z.string()),
  prepHours: z.string(),
  prepMinutes: z.string(),
  cookHours: z.string(),
  cookMinutes: z.string(),
  notes: z.string(),
  // image: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
