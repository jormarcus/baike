'use client';

import toast from 'react-hot-toast';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/inputs/Input';
import { Label } from '@/components/ui/Label';
import { importRecipe } from '@/app/_actions/recipe-actions';
import { createCollection } from '@/app/_actions/collection-actions';

const AddCollectionModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });

  console.log('errors: ', errors);

  const onCreateCollection: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log('data: ', data);
    try {
      await createCollection(data.name);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
          Add collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Collection</DialogTitle>
          <DialogDescription>
            Enter a name for your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              className="col-span-3"
              required
              {...register('name', { required: true })}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
            type="submit"
            disabled={!!errors.root?.message || isLoading}
            onClick={handleSubmit(onCreateCollection)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollectionModal;
