import {
  ChatGPTMessage,
  Role,
  SafeChat,
  SafeCollection,
  SafeMessage,
  SafeRecipe,
} from '@/types';
import { Chat, Collection, Ingredient, Message, Recipe } from '@prisma/client';

export function formatSafeRecipe(recipe: any): SafeRecipe {
  return {
    ...recipe,
    createdAt: recipe.createdAt?.toISOString() ?? '',
    updatedAt: recipe.updatedAt?.toISOString() ?? '',
    rating: recipe?.rating || null,
  };
}

export function formatSafeChat(
  { id, title, createdAt, updatedAt, userMessagesCount }: Chat,
  firstAnswer = ''
): SafeChat {
  return {
    id,
    title,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    userMessagesCount,
    firstAnswer,
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

export function formatChatGPTMessage(safeMessage: SafeMessage): ChatGPTMessage {
  return {
    id: safeMessage.id.toString(),
    content: safeMessage.text,
    role: safeMessage.isUserMessage ? ('user' as Role) : ('system' as Role),
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

export function formatSafeCollection(
  collection: Collection,
  hasRecipe = false,
  recipes: { name: string; imageSrc: string | null }[] = []
): SafeCollection {
  return {
    ...collection,
    createdAt: collection.createdAt?.toISOString() ?? '',
    updatedAt: collection.updatedAt?.toISOString() ?? '',
    image: '',
    recipes,
    recipesCount: 0,
    hasRecipe,
  };
}

export function formatSafeIngredient(ingredient: Ingredient) {
  return {
    ...ingredient,
    createdAt: ingredient.createdAt?.toISOString() ?? '',
    updatedAt: ingredient.updatedAt?.toISOString() ?? '',
    isChecked: false,
  };
}
