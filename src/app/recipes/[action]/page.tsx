'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Recipe, RecipeSchema } from '@/lib/validators/recipe-validator';
import { Icons } from '@/components/Icons';
import { useRange } from '@/hooks/useGenerateRange';
import Textarea from '@/components/inputs/Textarea';
import { createRecipe } from '@/app/_actions/recipe-actions';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';

interface AddEditRecipePageProps {
  params: {
    recipeId: string;
  };
}

const AddEditRecipePage: React.FC<AddEditRecipePageProps> = ({ params }) => {
  const servingsRange = useRange(1, 999);
  const hoursRange = useRange(1, 24);
  const minutesRange = useRange(1, 59);
  const [isPending, startTransition] = useTransition();

  const form = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: '',
      url: '',
      servings: 0,
      isPublic: true,
      prepHours: 0,
      prepMinutes: 0,
      cookHours: 0,
      cookMinutes: 0,
      instructions: '',
      ingredients: '',
      image: '',
    },
  });

  const onSubmit = async (data: Recipe) => {
    console.log('data', data);
    startTransition(() => {
      (async () => {
        await createRecipe(data);
        form.reset();
      })();
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-16 md:p-12 p-4 w-full max-w-3xl flex flex-col dark:bg-neutral-950 rounded-lg shadow-lg shadow-neutral-950/50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center"
          >
            <div className="flex flex-row gap-4 grow w-full">
              <div className="mt-1 flex justify-center items-center dark:bg-neutral-800 rounded-xl aspect-square w-36 h-36 basis-1/4">
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
                <FormItem className="mt-1">
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
            <div className="flex flex-row gap-32 justify-start items-end w-full mt-8">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem className="w-36">
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value: string) =>
                          field.onChange(Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {servingsRange.map((option) => (
                            <SelectItem
                              key={option}
                              value={option === '--' ? '0' : option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4 grow w-full whitespace-nowrap mt-8">
              <FormField
                control={form.control}
                name="prepHours"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prep hours</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value: string) =>
                          field.onChange(Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {hoursRange.map((option) => (
                            <SelectItem
                              key={option}
                              value={option === '--' ? '0' : option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prepMinutes"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prep Minutes</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value: string) =>
                          field.onChange(Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {minutesRange.map((option) => (
                            <SelectItem
                              key={option}
                              value={option === '--' ? '0' : option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4 grow w-full whitespace-nowrap mt-4">
              <FormField
                control={form.control}
                name="cookHours"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cook hours</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value: string) =>
                          field.onChange(Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {hoursRange.map((option) => (
                            <SelectItem
                              key={option}
                              value={option === '--' ? '0' : option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cookMinutes"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cook Minutes</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value: string) =>
                          field.onChange(Number(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {minutesRange.map((option) => (
                            <SelectItem
                              key={option}
                              value={option === '--' ? '0' : option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className="text-neutral-500 w-full my-8" />
            <div className="flex flex-row gap-24 w-full pr-12">
              <FormItem className="flex-1">
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First ingredient"
                    {...form.register('ingredients')}
                  />
                </FormControl>
              </FormItem>
              <FormItem className="flex-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First step"
                    {...form.register('instructions')}
                  />
                </FormControl>
              </FormItem>
            </div>
            <hr className="text-neutral-500 w-full my-8" />
            <div className="w-full">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Public</FormLabel>
                      <FormDescription>
                        Allow other users to see your recipe.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <hr className="text-neutral-500 w-full my-8" />

            {/* <div className="flex items-center justify-center w-full">
              <FormItem className="flex-1">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a note..."
                    {...form.register('notes')}
                  />
                </FormControl>
              </FormItem>
            </div> 
            <hr className="text-neutral-500 w-full my-8" />*/}
            <div className="flex items-center justify-end w-full">
              <Button
                type="submit"
                className="w-fit dark:bg-amber-500 dark:text-white font-bold"
                disabled={isPending}
              >
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Add Recipe
                <span className="sr-only">Add Recipe</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEditRecipePage;
