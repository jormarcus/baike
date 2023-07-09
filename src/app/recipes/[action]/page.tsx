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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Recipe, RecipeSchema } from '@/lib/validators/recipe-validator';
import { Icons } from '@/components/Icons';
import { useRange } from '@/hooks/useGenerateRange';
import Textarea from '@/components/inputs/Textarea';

interface AddEditRecipePageProps {
  params: {
    recipeId: string;
  };
}

const AddEditRecipePage: React.FC<AddEditRecipePageProps> = ({ params }) => {
  console.log('params', params);
  const servingsRange = useRange(1, 999);
  const hoursRange = useRange(1, 24);
  const minutesRange = useRange(1, 59);

  const form = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: '',
      url: '',
      servings: '',
      instructions: [],
      ingredients: [],
      prepHours: '',
      prepMinutes: '',
      cookHours: '',
      cookMinutes: '',
      notes: '',
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
            <div className="flex flex-row gap-4 grow w-full whitespace-nowrap mt-8">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectGroup> */}
                          {servingsRange.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                          {/* </SelectGroup> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prepHours"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prep hours</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectGroup> */}
                          {hoursRange.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                          {/* </SelectGroup> */}
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
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectGroup> */}
                          {minutesRange.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                          {/* </SelectGroup> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cookHours"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cook hours</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectGroup> */}
                          {hoursRange.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                          {/* </SelectGroup> */}
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
                        value={field.value}
                        onValueChange={(value: typeof field.value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectGroup> */}
                          {minutesRange.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                          {/* </SelectGroup> */}
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
            <div className="flex items-center justify-center w-full">
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEditRecipePage;
