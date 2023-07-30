import { z } from 'zod';

export const IngredientSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  quantity: z.number().nullable(),
  quantity2: z.number().nullable(),
  unitOfMeasure: z.string().nullable(),
  unitOfMeasureID: z.string().nullable(),
  isGroupHeader: z.boolean().nullable(),
  input: z.string(),
  isUpdated: z.boolean().optional(),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
