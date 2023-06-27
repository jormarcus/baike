import { SafeMessage } from '@/types';
import { Message } from '@prisma/client';
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

export function formatDBMessage(message: SafeMessage): Message {
  const { createdAt, updatedAt } = message;
  return {
    id: nanoid(),
    isUserMessage: message.isUserMessage,
    text: message.text,
    chatId: message?.chatId || '',
    createdAt: createdAt ? new Date(createdAt) : new Date(),
    updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
  };
}
