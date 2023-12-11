'use client';

import { createContext, useContext, useState } from 'react';

import { throwContextNotInitializedError } from '@/lib/utils';
import { SafeIngredient, SafeRecipe } from '@/types';
import { toast } from 'react-hot-toast';
import { sqltag } from '@prisma/client/runtime/library';
import { getIngredientsByRecipeId } from '@/app/_actions/recipe-actions';
import { set } from 'date-fns';

interface RecipeCompareContextStore {
  isRecipeCompareExpanded: boolean;
  setIsRecipeCompareExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipes: SafeRecipe[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<SafeRecipe[]>>;
  handleRecipeSelect: (
    recipe: SafeRecipe
  ) => void | Promise<SafeIngredient[] | undefined>;
}

export const RecipeCompareContextProvider =
  createContext<RecipeCompareContextStore>({
    isRecipeCompareExpanded: false,
    setIsRecipeCompareExpanded: throwContextNotInitializedError,
    selectedRecipes: [],
    setSelectedRecipes: throwContextNotInitializedError,
    handleRecipeSelect: throwContextNotInitializedError,
  });

export const RecipeCompareProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<SafeRecipe[]>([]);
  const [isRecipeCompareExpanded, setIsRecipeCompareExpanded] = useState(false);

  const getIngredients = async (recipeId: number) => {
    try {
      const safeIngredients: SafeIngredient[] = await getIngredientsByRecipeId(
        recipeId
      );
      return safeIngredients;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecipeSelect = async (recipe: SafeRecipe) => {
    const isSelected = selectedRecipes.some((r) => r.id === recipe.id);

    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter((r) => r !== recipe));
    } else {
      if (selectedRecipes.length < 4) {
        try {
          const ingredients = await getIngredients(recipe.id);

          const updatedRecipe = { ...recipe, ingredients: ingredients || [] };

          const index = selectedRecipes.findIndex((sr) => sr.id === recipe.id);

          if (index === -1) {
            setSelectedRecipes((prevRecipes) => [
              ...prevRecipes,
              updatedRecipe,
            ]);
            return;
          }

          setSelectedRecipes((prevRecipes) => [
            ...prevRecipes.slice(0, index),
            updatedRecipe,
            ...prevRecipes.slice(index + 1),
          ]);
        } catch (error) {
          toast.error('There was an error getting the ingredients.');
          return [];
        }
      } else {
        toast.error('You can only compare up to 4 recipes at a time.');
      }
    }
  };

  return (
    <RecipeCompareContextProvider.Provider
      value={{
        isRecipeCompareExpanded,
        setIsRecipeCompareExpanded,
        selectedRecipes,
        setSelectedRecipes,
        handleRecipeSelect,
      }}
    >
      {children}
    </RecipeCompareContextProvider.Provider>
  );
};

export const useRecipeCompare = () => useContext(RecipeCompareContextProvider);
