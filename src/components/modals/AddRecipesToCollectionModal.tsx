'use client';

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Checkbox } from '../ui/Checkbox';
import { useEffect, useState } from 'react';
import { SafeRecipe } from '@/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { getRecipesByUserId } from '@/app/_actions/recipe-actions';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { addRecipesToCollection } from '@/app/_actions/collection-actions';
import { Button } from '../ui/Button';
import { revalidatePath } from 'next/cache';

const AddRecipesToCollectionSchema = z.object({
  recipes: z.array(z.string()),
});

interface AddRecipesToCollectionModalProps {
  collectionId: number;
  name: string;
}

const AddRecipesToCollectionModal: React.FC<
  AddRecipesToCollectionModalProps
> = ({ collectionId, name }: { collectionId: number; name: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState<SafeRecipe[]>([]);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<number[]>([]);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const form = useForm<z.infer<typeof AddRecipesToCollectionSchema>>({
    resolver: zodResolver(AddRecipesToCollectionSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      collections: [],
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    async function getRecipes() {
      try {
        if (!userId) return;
        const recipes = await getRecipesByUserId(parseInt(userId), 1, 15);
        console.log('setting recipes: ', recipes);
        setRecipes(recipes);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    getRecipes();
  }, [isOpen, userId]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log('data: ', selectedRecipeIds);
    // TODO - not actually using form data or form for these fields
    try {
      await addRecipesToCollection(selectedRecipeIds, Number(collectionId));
      revalidatePath(`/collections/${collectionId}`);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleSelectRecipe = (checked: CheckedState, recipeId: number) => {
    if (checked) {
      setSelectedRecipeIds([...selectedRecipeIds, recipeId]);
    } else {
      setSelectedRecipeIds(
        selectedRecipeIds.filter((id: number) => id !== recipeId)
      );
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400">
          Add recipes to collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add recipes to collection</AlertDialogTitle>
          <AlertDialogDescription>
            Select recipes to add to {`${name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <hr />
        <div className="grid gap-4 pt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-3 items-center gap-4 space-y-8"
            >
              <FormField
                control={form.control}
                name="recipes"
                render={() => (
                  <FormItem>
                    {recipes.map((recipe) => (
                      <FormField
                        key={recipe.id}
                        control={form.control}
                        name="recipes"
                        render={() => {
                          return (
                            <FormItem
                              key={recipe.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  id={recipe.id.toString()}
                                  // checked={recipe.}
                                  onCheckedChange={(checked: CheckedState) =>
                                    handleSelectRecipe(checked, recipe.id)
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal whitespace-nowrap">
                                {recipe.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <hr className="mb-2" />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddRecipesToCollectionModal;
