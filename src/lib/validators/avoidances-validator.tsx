import { z } from 'zod';

export const AvoidanceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const AvoidanceArraySchema = z.array(AvoidanceSchema);

export type Avoidance = z.infer<typeof AvoidanceSchema>;
