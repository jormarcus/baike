import { SafeMessage } from '@/types';
import { nanoid } from 'nanoid';

export function createEmptyMessage(): SafeMessage {
  return {
    id: nanoid(),
    isUserMessage: false,
    text: '',
    chatId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createSafeMessage(
  text: string,
  chatId: string,
  isUserMessage: boolean
): SafeMessage {
  return {
    id: nanoid(),
    isUserMessage,
    text,
    chatId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
