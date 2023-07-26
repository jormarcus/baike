import Link from 'next/link';
import { Button } from '../ui/Button';
import { Edit, Heart, Share, Trash } from 'lucide-react';
import AddToCollectionModal from '../modals/AddToCollectionModal';
import { SafeRecipe } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

interface RecipeActionButtonRowProps {
  recipe: SafeRecipe;
}

const RecipeActionButtonRow: React.FC<RecipeActionButtonRowProps> = ({
  recipe,
}) => {
  return (
    <div className="flex gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
              <Link
                href={`/recipe/${recipe.id}/edit`}
                className="flex flex-nowrap items-center"
              >
                <Edit className="mr-0 md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Edit</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AddToCollectionModal recipeId={recipe.id} name={recipe.name} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 md:flex md:items-center md:justify-center">
              <Share className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
              <Heart className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Favorite</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Favorite</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
              <Trash className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default RecipeActionButtonRow;
