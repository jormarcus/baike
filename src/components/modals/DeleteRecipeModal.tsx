'use client';

import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { deleteRecipe } from '@/app/_actions/recipe-actions';
import { SafeRecipe } from '@/types';
import { Button } from '../ui/Button';

interface DeleteRecipeModalProps {
  recipe: SafeRecipe;
}

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({ recipe }) => {
  const router = useRouter();
  const handleDeleteRecipe = async (recipeId: number) => {
    await deleteRecipe(recipeId);
    router.push('/recipes');
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 flex flex-nowrap items-center">
            <Trash className="mr-0 md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`
                This action cannot be undone. This will permanently delete recipe - ${recipe.name}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => handleDeleteRecipe(recipe.id)}
                className="bg-rose-500 hover:bg-rose-400 text-white"
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteRecipeModal;
