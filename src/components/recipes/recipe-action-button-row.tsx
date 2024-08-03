'use client';

import { Edit, Heart, Share } from 'lucide-react';

import { Button } from '../ui/button';
import AddRecipeToCollectionModal from './add-recipe-to-collection-modal';
import { SafeRecipe } from '@/types';
import DeleteRecipeModal from './delete-recipe-modal';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type RecipeActionButtonRowProps = {
  recipe: SafeRecipe;
};

const EditButton: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => router.push(`/recipes/${recipeId}/edit`)}
            className="flex flex-nowrap items-center text-foreground font-medium p-0 bg-card"
          >
            <Edit className="mr-0 md:mr-2" size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ShareButton: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="md:flex md:items-center md:justify-center text-foreground font-medium bg-card p-0">
            <Share className="mr-0 md:mr-2" size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LikeButton: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="text-foreground font-medium bg-card p-0">
            <Heart className="mr-0 md:mr-2" size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Like</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const RecipeActionButtonRow: React.FC<RecipeActionButtonRowProps> = ({
  recipe,
}) => {
  return (
    <div className="flex gap-2 max-w-48">
      <EditButton recipeId={recipe.id} />
      <AddRecipeToCollectionModal recipeId={recipe.id} name={recipe.name} />
      <ShareButton />
      <LikeButton />
      <DeleteRecipeModal recipe={recipe} />
    </div>
  );
};

export default RecipeActionButtonRow;
