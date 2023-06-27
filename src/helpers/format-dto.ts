import { SafeMessage, SafeRecipe } from '@/types';
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

export function formatSafeChat(chat: Chat) {
  return {
    ...chat,
    createdAt: chat.createdAt?.toISOString() ?? '',
    updatedAt: chat.updatedAt?.toISOString() ?? '',
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
