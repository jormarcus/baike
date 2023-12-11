'use client';

import toast from 'react-hot-toast';
import { useState, useTransition } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/inputs/input';
import { Label } from '@/components/ui/label';
import { Import } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { importRecipe } from '@/app/_actions/recipe-actions';

interface ImportRecipeModalProps {}

const ImportRecipeModal: React.FC<ImportRecipeModalProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      url: '',
    },
  });

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
    reset();
  };

  const onImport: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // @ts-ignore
    startTransition(async () => {
      try {
        const newRecipe = await importRecipe(data.url);
        router.push(`/recipe/${newRecipe.id}`);
        setIsOpen(false);
      } catch (error) {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 flex gap-2">
          <Import />
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
              id="url"
              className="col-span-3"
              required
              {...register('url', { required: true })}
              disabled={isLoading || isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
            type="submit"
            disabled={!!errors.root?.message || isLoading || isPending}
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
