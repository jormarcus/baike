import { SafeChat, SafeCollection, SafeMessage, SafeRecipe } from '@/types';
import { Chat, Collection, Message, Recipe } from '@prisma/client';

export function formatSafeRecipe(recipe: Recipe): SafeRecipe {
  return {
    ...recipe,
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

export function formatSafeCollection(collection: Collection): SafeCollection {
  return {
    ...collection,
    createdAt: collection.createdAt?.toISOString() ?? '',
    updatedAt: collection.updatedAt?.toISOString() ?? '',
    image: '',
    recipes: [],
    recipesCount: 0,
  };
}
