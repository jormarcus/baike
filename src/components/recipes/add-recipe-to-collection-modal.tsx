'use client';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
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
import { CollectionWithRecipeNames } from '@/types';
import AddCollectionModal from '../collections/add-collection-modal';
import { addCollectionsToRecipe } from '@/app/_actions/recipe-actions';
import { Checkbox } from '../ui/checkbox';
import { getCollectionsWithRecipeNameByRecipeId } from '@/app/_actions/collection-actions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const AddRecipeToCollectionSchema = z.object({
  collections: z.array(z.string()),
});

function AddRecipeToCollectionModal({
  recipeId,
  name,
}: {
  recipeId: number;
  name: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState<CollectionWithRecipeNames[]>(
    []
  );

  const form = useForm<z.infer<typeof AddRecipeToCollectionSchema>>({
    resolver: zodResolver(AddRecipeToCollectionSchema),
  });

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
    form.reset();
  };

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
    async function getCollections() {
      try {
        const collections =
          await getCollectionsWithRecipeNameByRecipeId(recipeId);
        setCollections(collections);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    getCollections();
  }, [isOpen, recipeId]);

  const onAddNewCollection = (collection: CollectionWithRecipeNames) => {
    setCollections((prev) => [...prev, collection]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // TODO - not actually using form data or form for these fields
    try {
      await addCollectionsToRecipe(collections, Number(recipeId));
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="p-0 bg-card text-foreground font-medium flex flex-nowrap items-center">
                <AiOutlineAppstoreAdd size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Add to collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Select collections</AlertDialogTitle>
          <AlertDialogDescription>{`for ${name}`}</AlertDialogDescription>
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
                name="collections"
                render={() => (
                  <FormItem>
                    {collections.map((collection) => (
                      <FormField
                        key={collection.id}
                        control={form.control}
                        name="collections"
                        render={() => {
                          return (
                            <FormItem
                              key={collection.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  id={collection.id.toString()}
                                  checked={collection.recipes.length > 0}
                                  onCheckedChange={() => {
                                    setCollections((prev) =>
                                      prev.map((c) =>
                                        c.id === collection.id
                                          ? {
                                              ...c,
                                            }
                                          : c
                                      )
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {collection.name}
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
          <AddCollectionModal onAddCollection={onAddNewCollection} />
        </div>
        <hr className="mb-2" />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
          >
            Save changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddRecipeToCollectionModal;
