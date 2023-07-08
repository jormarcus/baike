'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/inputs/Input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/Form';
import { Recipe, RecipeSchema } from '@/lib/validators/recipe-validator';
import Textarea from '@/components/inputs/Textarea';
import { Icons } from '@/components/Icons';

interface AddEditRecipePageProps {
  params: {
    recipeId: string;
  };
}

const AddEditRecipePage: React.FC<AddEditRecipePageProps> = ({ params }) => {
  console.log('params', params);

  const form = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: '',
      url: '',
      // instructions: [],
      // ingredients: [],
      // prepHours: 0,
      // prepMinutes: 0,
      // cookHours: 0,
      // cookMinutes: 0,
      // servings: 1,
      // image: '',
    },
  });

  const onSubmit = (values: Recipe) => {};

  return (
    <div className="flex justify-center items-center">
      <div className="mt-16 md:p-12 p-4 w-full max-w-2xl flex flex-col dark:bg-neutral-950 rounded-lg shadow-lg shadow-neutral-950/50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center"
          >
            <div className="flex flex-row gap-4 grow w-full">
              <div className="flex justify-center items-center dark:bg-neutral-800 rounded-xl aspect-square w-36 h-36 basis-1/4">
                <Icons.imagePlus className="h-12 w-12" />
              </div>
              <div className="basis-3/4">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.name}
                      placeholder="Recipe name"
                      {...form.register('name')}
                    />
                  </FormControl>
                  <UncontrolledFormMessage
                    message={form.formState.errors.name?.message}
                  />
                </FormItem>
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.url}
                      placeholder="URL"
                      {...form.register('url')}
                    />
                  </FormControl>
                  <UncontrolledFormMessage
                    message={form.formState.errors.url?.message}
                  />
                </FormItem>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEditRecipePage;
