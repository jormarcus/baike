import { z } from 'zod';

export const MessageSchema = z.object({
  isUserMessage: z.boolean(),
  text: z.string(),
  chatId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
