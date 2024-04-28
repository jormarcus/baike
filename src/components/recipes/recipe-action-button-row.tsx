'use client';

import { Edit, Heart, Share } from 'lucide-react';

import { Button } from '../ui/button';
import AddRecipeToCollectionModal from './add-recipe-to-collection-modal';
import { SafeRecipe } from '@/types';
import DeleteRecipeModal from './delete-recipe-modal';
import { useRouter } from 'next/navigation';

type RecipeActionButtonRowProps = {
  recipe: SafeRecipe;
};

const EditButton: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`/recipes/${recipeId}/edit`)}
      className="flex flex-nowrap items-center text-foreground font-medium bg-background-tilted-base"
    >
      <Edit className="mr-0 md:mr-2 h-4 w-4" />
      <span className="hidden md:block">Edit</span>
    </Button>
  );
};

const ShareButton: React.FC = () => {
  return (
    <Button className="md:flex md:items-center md:justify-center text-foreground font-medium bg-background-tilted-base">
      <Share className="mr-0 md:mr-2 h-4 w-4" />
      <span className="hidden md:block">Share</span>
    </Button>
  );
};

const FavoriteButton: React.FC = () => {
  return (
    <Button className="text-foreground font-medium bg-background-tilted-base">
      <Heart className="mr-0 md:mr-2 h-4 w-4" />
      <span className="hidden md:block">Favorite</span>
    </Button>
  );
};

const RecipeActionButtonRow: React.FC<RecipeActionButtonRowProps> = ({
  recipe,
}) => {
  return (
    <div className="flex gap-12 w-full">
      <EditButton recipeId={recipe.id} />
      <AddRecipeToCollectionModal recipeId={recipe.id} name={recipe.name} />
      <ShareButton />
      <FavoriteButton />
      <DeleteRecipeModal recipe={recipe} />
    </div>
  );
};

export default RecipeActionButtonRow;
