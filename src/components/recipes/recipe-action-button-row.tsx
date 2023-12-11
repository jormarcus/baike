'use client';

import { Edit, Heart, Share } from 'lucide-react';

import { Button } from '../ui/button';
import AddRecipeToCollectionModal from './add-recipe-to-collection-modal';
import { SafeRecipe } from '@/types';
import DeleteRecipeModal from './delete-recipe-modal';
import { useRouter } from 'next/navigation';

interface RecipeActionButtonRowProps {
  recipe: SafeRecipe;
}

const RecipeActionButtonRow: React.FC<RecipeActionButtonRowProps> = ({
  recipe,
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 sm:gap-4">
      <Button
        onClick={() => router.push(`/recipe/${recipe.id}/edit`)}
        className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 flex flex-nowrap items-center"
      >
        <Edit className="mr-0 md:mr-2 h-4 w-4" />
        <span className="hidden md:block">Edit</span>
      </Button>

      <AddRecipeToCollectionModal recipeId={recipe.id} name={recipe.name} />

      <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 md:flex md:items-center md:justify-center">
        <Share className="mr-0 md:mr-2 h-4 w-4" />
        <span className="hidden md:block">Share</span>
      </Button>

      <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
        <Heart className="mr-0 md:mr-2 h-4 w-4" />
        <span className="hidden md:block">Favorite</span>
      </Button>

      <DeleteRecipeModal recipe={recipe} />
    </div>
  );
};

export default RecipeActionButtonRow;
