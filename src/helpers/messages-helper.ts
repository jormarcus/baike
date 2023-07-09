import { SafeMessage } from '@/types';
import { nanoid } from 'nanoid';

export function createTempMessage(
  text: string,
  chatId: number,
  isUserMessage: boolean
): SafeMessage {
  return {
    id: Math.floor(Math.random() * 1000),
    isUserMessage,
    text,
    chatId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
