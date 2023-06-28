import { Chat, Message, Recipe, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeRecipe = Omit<
  Recipe,
  'createdAt' | 'updatedAt' | 'prepTime' | 'cookTime'
> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  prepTimeStr?: string | null;
  prepTime?: number | null;
  cookTimeStr?: string | null;
  cookTime?: number | null;
  isPrivate: boolean | null;
  likesCount: number | null;
  averageRating: number | null;
  ratingsCount: number | null;
};

export type SafeMessage = Omit<Message, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type SafeChat = Omit<Chat, 'createdAt' | 'updatedAt' | 'userId'> & {
  createdAt: string;
  updatedAt: string;
};
