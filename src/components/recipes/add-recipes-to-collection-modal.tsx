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
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { useEffect, useState } from 'react';
import { SafeRecipe } from '@/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import {
  getRecipesWithCollectionsByUserId,
  getRecipesWithCount,
} from '@/app/_actions/recipe-actions';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { addRecipesToCollection } from '@/app/_actions/collection-actions';
import { Button } from '../ui/button';
import Searchbox from '../ui/searchbox';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const AddRecipesToCollectionSchema = z.object({
  recipes: z.array(z.string()),
});

interface AddRecipesToCollectionModalProps {
  collectionId: number;
  name: string;
  label: string;
  buttonStyle: string;
  hasIcon: boolean | false;
}

const AddRecipesToCollectionModal: React.FC<
  AddRecipesToCollectionModalProps
> = ({ collectionId, name, label, buttonStyle, hasIcon }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setRecipes] = useState<SafeRecipe[]>([]);
  const [newlySelectedRecipeIds, setNewlySelectedRecipeIds] = useState<
    number[]
  >([]);
  const [unSelectedRecipeIds, setUnSelectedRecipeIds] = useState<number[]>([]);

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

    // modal is always rendered, need to reset state when it's opened
    setNewlySelectedRecipeIds([]);
    setUnSelectedRecipeIds([]);

    async function getRecipes() {
      try {
        if (!userId) return;
        const recipes = await getRecipesWithCollectionsByUserId(
          parseInt(userId),
          1,
          15
        );

        recipes.forEach((recipe) => {
          if (recipe.collections?.find((c) => c.id === collectionId)) {
            recipe.belongsToCollection = true;
          }
        });

        setRecipes(recipes);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    getRecipes();
  }, [collectionId, isOpen, userId]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // TODO - not actually using form data or form for these fields
    try {
      await addRecipesToCollection(
        newlySelectedRecipeIds,
        unSelectedRecipeIds,
        Number(collectionId)
      );
      setIsOpen(false);
    } catch (error) {
      console.log('error: ', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipe = (checked: CheckedState, recipe: SafeRecipe) => {
    if (checked) {
      // if reselecting a recipe that already belongs to the collection, remove it from the unselected list
      if (recipe.hasOwnProperty('belongsToCollection')) {
        recipe.belongsToCollection = true;
        setRecipes((prevRecipes) =>
          prevRecipes.map((prevRecipe) =>
            prevRecipe.id === recipe.id ? recipe : prevRecipe
          )
        );

        setUnSelectedRecipeIds(
          unSelectedRecipeIds.filter((id: number) => id !== recipe.id)
        );
      } else {
        // add to selected
        setNewlySelectedRecipeIds([...newlySelectedRecipeIds, recipe.id]);
      }
    } else {
      // if unselecting a recipe that already belongs to the collection, add it to the unselected list
      if (recipe.belongsToCollection) {
        recipe.belongsToCollection = false;
        setRecipes((prevRecipes) =>
          prevRecipes.map((prevRecipe) =>
            prevRecipe.id === recipe.id ? recipe : prevRecipe
          )
        );

        setUnSelectedRecipeIds([...unSelectedRecipeIds, recipe.id]);
      } else {
        setNewlySelectedRecipeIds(
          newlySelectedRecipeIds.filter((id: number) => id !== recipe.id)
        );
      }
    }
  };

  const handleSearch = async (query: string) => {
    // TODO - handle pagination
    const { recipes, totalCount } = await getRecipesWithCount(
      query,
      'collections'
    );

    totalCount > 0 &&
      recipes.forEach((recipe) => {
        if (recipe.collections?.find((c) => c.id === collectionId)) {
          recipe.belongsToCollection = true;
        }
      });
    setRecipes(recipes);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className={cn(buttonStyle)}>
          {hasIcon ? <Plus size={24} /> : null} <span>{label}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{`${name}`} collection</AlertDialogTitle>
          <AlertDialogDescription>
            Select recipes to add to {`${name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <hr />

        <div>
          <Searchbox
            handleSearch={handleSearch}
            placeholder="Search your recipes..."
          />
        </div>

        <div className="pt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 overflow-y-scroll"
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
                                  checked={recipe.belongsToCollection}
                                  onCheckedChange={(checked: CheckedState) =>
                                    handleSelectRecipe(checked, recipe)
                                  }
                                  className="border-white border-2"
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
