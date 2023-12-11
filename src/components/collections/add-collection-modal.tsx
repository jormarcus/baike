'use client';

import toast from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCollection } from '@/app/_actions/collection-actions';
import { Plus } from 'lucide-react';
import { CollectionWithRecipeNames } from '@/types';

interface AddCollectionModalProps {
  onAddCollection?: (collection: CollectionWithRecipeNames) => void;
}

const AddCollectionModal: React.FC<AddCollectionModalProps> = ({
  onAddCollection,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isOnCollectionsPage = useMemo(
    () => !onAddCollection,
    [onAddCollection]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // revalidate collections page after adding a collection
      // if not we are adding a new collection when adding collections to a recipe
      const collection = await createCollection(data.name, isOnCollectionsPage);
      onAddCollection?.(collection);
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
        <Button
          className={`flex max-w-[150px] justify-start gap-1 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800 whitespace-nowrap ${
            isOnCollectionsPage ? '' : 'pl-1'
          }`}
        >
          <Plus />
          Add Collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Collection</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a name for your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <Label htmlFor="name">Collection name</Label>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              className="col-span-3"
              required
              {...register('name', { required: true })}
              disabled={isLoading}
              placeholder='e.g. "Desserts"'
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCollectionModal;
