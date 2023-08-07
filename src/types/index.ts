import { Ingredient } from '@/lib/validators/ingredient-validator';
import {
  Chat,
  Collection,
  Message,
  Post,
  Prisma,
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
  belongsToCollection?: boolean;
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

export type SafeCollection = Omit<Collection, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  image: string | null;
  recipes?: SafeRecipe[];
  recipesCount?: number;
  hasRecipe?: boolean;
};

export type SafeIngredient = Omit<Ingredient, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  isChecked?: boolean;
};

export type SafePost = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  image: string | null;
};

const collectionWithRecipes = Prisma.validator<Prisma.CollectionDefaultArgs>()({
  include: { recipes: true },
});

export type CollectionWithRecipes = Prisma.CollectionGetPayload<
  typeof collectionWithRecipes
>;

const collectionWithRecipeNames =
  Prisma.validator<Prisma.CollectionDefaultArgs>()({
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

export type CollectionWithRecipeNames = Prisma.CollectionGetPayload<
  typeof collectionWithRecipeNames
>;

const collectionWithRecipeNamesAndImage =
  Prisma.validator<Prisma.CollectionDefaultArgs>()({
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
          imageSrc: true,
        },
      },
    },
  });

export type CollectionWithRecipeNamesAndImage = Prisma.CollectionGetPayload<
  typeof collectionWithRecipeNamesAndImage
>;
