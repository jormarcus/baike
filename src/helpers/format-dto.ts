import {
  ChatGPTMessage,
  CollectionWithRecipes,
  Role,
  SafeChat,
  SafeCollection,
  SafeIngredient,
  SafeMessage,
  SafePost,
  SafeRecipe,
} from '@/types';
import {
  Chat,
  Collection,
  Ingredient,
  Message,
  Post,
  Recipe,
} from '@prisma/client';

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

export function formatSafeCollection(collection: Collection): SafeCollection {
  return {
    ...collection,
    createdAt: collection.createdAt?.toISOString() ?? '',
    updatedAt: collection.updatedAt?.toISOString() ?? '',
  };
}

export function formatSafeCollectionWithRecipes(
  collection: CollectionWithRecipes
): SafeCollection {
  const safeRecipes = collection.recipes.map((recipe) =>
    formatSafeRecipe(recipe)
  );
  return {
    ...collection,
    createdAt: collection.createdAt?.toISOString() ?? '',
    updatedAt: collection.updatedAt?.toISOString() ?? '',
    recipes: safeRecipes,
    recipesCount: safeRecipes.length,
    hasRecipe: safeRecipes.length > 0,
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

export function formatSafePost(post: Post): SafePost {
  return {
    ...post,
    createdAt: post.createdAt?.toISOString() ?? '',
    updatedAt: post.updatedAt?.toISOString() ?? '',
  };
}

export function formatIngredient(ingredient: SafeIngredient): Ingredient {
  const { createdAt, updatedAt } = ingredient;
  return {
    ...ingredient,
    id: ingredient?.id || 0,
    createdAt: createdAt ? new Date(createdAt) : new Date(),
    updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
    isGroupHeader: ingredient?.isGroupHeader || false,
  };
}
