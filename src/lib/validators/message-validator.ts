import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
  chatId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
