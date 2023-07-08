import { z } from 'zod';

export const RecipeSchema = z.object({
  name: z.string(),
  url: z.string(),
  // instructions: z.array(z.string()),
  // ingredients: z.array(z.string()),
  // prepHours: z.number(),
  // prepMinutes: z.number(),
  // cookHours: z.number(),
  // cookMinutes: z.number(),
  // servings: z.number(),
  // image: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
