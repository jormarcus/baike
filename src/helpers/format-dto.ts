import { SafeChat, SafeMessage, SafeRecipe } from '@/types';
import { formatDuration, getTimeInMinutes } from '@/helpers/date-time-helper';
import { Chat, Message, Recipe } from '@prisma/client';

export function formatSafeRecipe(recipe: Recipe): SafeRecipe {
  const { prepTime, cookTime } = recipe;
  return {
    ...recipe,
    prepTimeStr: prepTime ? formatDuration(prepTime.getTime()) : null,
    prepTime: prepTime ? getTimeInMinutes(prepTime.getTime()) : null,
    cookTimeStr: cookTime ? formatDuration(cookTime.getTime()) : null,
    cookTime: cookTime ? getTimeInMinutes(cookTime.getTime()) : null,
    createdAt: recipe.createdAt?.toISOString() ?? '',
    updatedAt: recipe.updatedAt?.toISOString() ?? '',
  };
}

export function formatSafeChat({
  id,
  title,
  createdAt,
  updatedAt,
}: Chat): SafeChat {
  return {
    id,
    title,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export function formatSafeMessage(message: Message): SafeMessage {
  const { createdAt, updatedAt } = message;
  return {
    ...message,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export function formatMessageDTO(message: SafeMessage): Message {
  const { id, isUserMessage, text, chatId, createdAt, updatedAt } = message;
  return {
    id,
    isUserMessage,
    text,
    chatId,
    createdAt: createdAt ? new Date(createdAt) : new Date(),
    updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
  };
}
