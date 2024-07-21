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
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteRecipe } from '@/app/_actions/recipe-actions';
import { SafeRecipe } from '@/types';
import { Button } from '../ui/button';

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="bg-card p-0 text-foreground font-medium flex flex-nowrap items-center">
                  <Trash className="mr-0 md:mr-2" size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
