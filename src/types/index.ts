import { Chat, Collection, Message, Recipe, User } from '@prisma/client';

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
  'id' | 'createdAt' | 'updatedAt' | 'authorId'
> & {
  id?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  authorId: number;
};

export type SafeMessage = Omit<Message, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type SafeChat = Omit<Chat, 'createdAt' | 'updatedAt' | 'userId'> & {
  createdAt: string;
  updatedAt: string;
  firstAnswer: string | null;
};

export type Role = 'function' | 'user' | 'system' | 'assistant';

export type ChatGPTMessage = {
  id: string;
  role: Role;
  content: string;
};

export type InputListValues = {
  instructions: string;
  ingredients: string;
};

export type SafeCollection = Omit<
  Collection,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  image: string | null;
  recipes: string[];
  recipesCount: number;
};
