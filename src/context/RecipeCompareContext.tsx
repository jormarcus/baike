'use client';

import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
import { SafeRecipe } from '@/types';

interface RecipeCompareContextStore {
  isRecipeCompareExpanded: boolean;
  setIsRecipeCompareExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipes: SafeRecipe[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<SafeRecipe[]>>;
}

export const RecipeCompareContextProvider =
  createContext<RecipeCompareContextStore>({
    isRecipeCompareExpanded: false,
    setIsRecipeCompareExpanded: throwContextNotInitializedError,
    selectedRecipes: [],
    setSelectedRecipes: throwContextNotInitializedError,
  });

export const RecipeCompareProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<SafeRecipe[]>([]);
  const [isRecipeCompareExpanded, setIsRecipeCompareExpanded] = useState(false);

  return (
    <RecipeCompareContextProvider.Provider
      value={{
        isRecipeCompareExpanded,
        setIsRecipeCompareExpanded,
        selectedRecipes,
        setSelectedRecipes,
      }}
    >
      {children}
    </RecipeCompareContextProvider.Provider>
  );
};

export const useRecipeCompare = () => useContext(RecipeCompareContextProvider);
