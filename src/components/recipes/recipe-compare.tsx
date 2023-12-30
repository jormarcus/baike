'use client';

import { useRecipeCompare } from '@/context/recipe-compare-context';
import { useEffect, useState } from 'react';
// import BottomSheet from '../ui/bottom-sheet';
import { SafeRecipe } from '@/types';
import RecipeCompareTable from './recipe-compare-table';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';

interface RecipeCompareProps {}

const RecipeCompare: React.FC<RecipeCompareProps> = () => {
  const {
    isRecipeCompareExpanded,
    setIsRecipeCompareExpanded,
    selectedRecipes,
  } = useRecipeCompare();

  const [recipes, setRecipes] = useState<SafeRecipe[]>(selectedRecipes);

  useEffect(() => {
    setRecipes(selectedRecipes);
  }, [selectedRecipes]);

  const handleOpenBottomSheet = () => {
    setIsRecipeCompareExpanded(true);
  };

  return (
    <>
      {recipes.length === 0 ? null : (
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent className="overflow-scroll max-h-[82%]">
            <DrawerHeader>
              <RecipeCompareTable recipes={recipes} />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default RecipeCompare;

{
  /* <BottomSheet onOpen={handleOpenBottomSheet}>
          {isRecipeCompareExpanded ? (
            <div>
              <button onClick={() => setIsRecipeCompareExpanded(false)}>
                Collapse
              </button>
              <RecipeCompareTable recipes={recipes} />
            </div>
          ) : (
            <div>Compare Recipes</div>
          )}
        </BottomSheet> */
}
