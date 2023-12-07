'use client';

import { useRecipeCompare } from '@/context/RecipeCompareContext';
import { useState } from 'react';
import BottomSheet from '../ui/bottom-sheet';

interface RecipeCompareProps {}

const RecipeCompare: React.FC<RecipeCompareProps> = () => {
  const {
    isRecipeCompareExpanded,
    setIsRecipeCompareExpanded,
    selectedRecipes,
    setSelectedRecipes,
  } = useRecipeCompare();

  return (
    <>
      {selectedRecipes.length === 0 ? null : (
        <BottomSheet>
          {isRecipeCompareExpanded ? (
            <div>
              <button onClick={() => setIsRecipeCompareExpanded(false)}>
                Collapse
              </button>
              <div className="flex gap-2 justify-between px-8 border dark:border border-neutral-600">
                {selectedRecipes.map((selectedRecipe) => (
                  <div key={selectedRecipe.id}>{selectedRecipe.name}</div>
                ))}
              </div>
            </div>
          ) : (
            <div>Compare Recipes</div>
          )}
        </BottomSheet>
      )}
    </>
  );
};

export default RecipeCompare;
