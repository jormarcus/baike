import { z } from 'zod';

export const ChatTitleSchema = z.object({
  title: z.string().min(3).max(100),
});

export type ChatTitleSchemaType = z.infer<typeof ChatTitleSchema>;
