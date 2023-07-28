import { Ingredient } from '@/lib/validators/ingredient-validator';
import {
  Chat,
  Collection,
  Message,
  Rating,
  Recipe,
  User,
} from '@prisma/client';

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
  id: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  authorId: number;
  ratings: Rating[] | null;
  collections: Collection[];
  ingredients: Ingredient[];
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

export type SafeCollection = Omit<Collection, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  image: string | null;
  recipes: { name: string; imageSrc: string | null }[];
  recipesCount: number;
  hasRecipe: boolean;
};

export type SafeIngredient = Omit<Ingredient, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  isChecked?: boolean;
};
