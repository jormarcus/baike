import { z } from 'zod';
import { IngredientSchema } from './ingredient-validator';

export const RecipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  imageSrc: z.string().optional(),
  url: z.string(),
  description: z.string().optional(),
  servings: z.number(),
  isPublic: z.boolean(),
  prepHours: z.number(),
  prepMinutes: z.number(),
  cookHours: z.number(),
  cookMinutes: z.number(),
  instructions: z.array(z.string()),
  ingredients: z.array(IngredientSchema),
  notes: z.string(),
  authorId: z.number().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
