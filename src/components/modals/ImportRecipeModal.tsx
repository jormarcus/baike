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

interface ImportRecipeModalProps {}

const ImportRecipeModal: React.FC<ImportRecipeModalProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      url: '',
    },
  });

  console.log('errors: ', errors);

  const onImport: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log('data: ', data);
    try {
      await importRecipe(data.url);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-850">
          Import recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import recipe</DialogTitle>
          <DialogDescription>
            Paste the URL of the recipe you would like to import.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Recipe URL
            </Label>
            <Input
              id="importUrl"
              className="col-span-3"
              required
              {...register('importUrl', { required: true })}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!!errors.root?.message || isLoading}
            onClick={handleSubmit(onImport)}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRecipeModal;
