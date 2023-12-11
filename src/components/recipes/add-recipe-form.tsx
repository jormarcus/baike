'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Input } from '@/components/inputs/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Recipe, RecipeSchema } from '@/lib/validators/recipe-validator';
import { Icons } from '@/components/icons';
import { useRange } from '@/hooks/use-generate-range';
import Textarea from '@/components/inputs/textarea';
import { createRecipe } from '@/app/_actions/recipe-actions';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/image-uploader';
import { Label } from '../ui/label';

const AddRecipeForm: React.FC = () => {
  const servingsRange = useRange(1, 999);
  const hoursRange = useRange(1, 24);
  const minutesRange = useRange(1, 59);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: '',
      url: '',
      description: '',
      servings: 0,
      isPublic: true,
      prepHours: 0,
      prepMinutes: 0,
      cookHours: 0,
      cookMinutes: 0,
      ingredients: [
        {
          name: '',
          quantity: null,
          quantity2: null,
          unitOfMeasure: '',
          unitOfMeasureID: '',
          isGroupHeader: false,
          input: '',
          order: 0,
        },
      ],
      instructions: [''],
      imageSrc: '',
      notes: '',
    },
  });

  const imageSrc = form.watch('imageSrc');
  const ingredients = form.watch('ingredients');
  const instructions = form.watch('instructions');

  function onSubmit(data: Recipe) {
    if (data.ingredients[data.ingredients.length - 1]['input'] === '') {
      data.ingredients.pop();
    }
    if (data.instructions[data.instructions.length - 1] === '') {
      data.instructions.pop();
    }

    // @ts-ignore
    startTransition(async () => {
      try {
        const newRecipe = await createRecipe(data);
        router.push(`/recipe/${newRecipe.id}`);
      } catch (error) {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error('Something went wrong.');
      }
    });
  }

  const handleIngredientChange = (value: string, index: number) => {
    const fieldData = form.getValues('ingredients');
    const newInputs = [...fieldData];

    newInputs[index]['input'] = value;

    // add a new input, if typing into the last input
    if (index === fieldData.length - 1 && value !== '') {
      newInputs.push({
        name: '',
        quantity: null,
        quantity2: null,
        unitOfMeasure: '',
        unitOfMeasureID: '',
        isGroupHeader: false,
        input: '',
        order: index,
      });
    }

    form.setValue('ingredients', newInputs);
  };

  const handleIngredientBlur = (value: string, index: number) => {
    if (index !== 0 && value === '') {
      const fieldData = form.getValues('ingredients');
      const newInputs = [...fieldData];
      newInputs.splice(index, 1);
      form.setValue('ingredients', newInputs);
    }
  };

  const handleInstructionChange = (value: string, index: number) => {
    const fieldData = form.getValues('instructions');
    const newInputs = [...fieldData];

    newInputs[index] = value;

    // add a new input, if typing into the last input
    if (index === fieldData.length - 1 && value !== '') {
      newInputs.push('');
    }

    form.setValue('instructions', newInputs);
  };

  const handleInstructionBlur = (value: string, index: number) => {
    if (index !== 0 && value === '') {
      const fieldData = form.getValues('instructions');
      const newInputs = [...fieldData];
      newInputs.splice(index, 1);
      form.setValue('instructions', newInputs);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="md:p-12 p-4 w-full max-w-3xl flex flex-col dark:bg-neutral-950 rounded-lg shadow-lg shadow-neutral-950/50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center"
          >
            <div className="flex flex-row gap-12 grow w-full">
              <FormItem>
                <FormControl>
                  <ImageUploader
                    handleChange={(value) => form.setValue('imageSrc', value)}
                    value={imageSrc || ''}
                  />
                </FormControl>
              </FormItem>
              <div className="w-full">
                <FormItem>
                  <FormLabel className="text-lg">Name</FormLabel>
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
                  <FormLabel className="text-lg">URL</FormLabel>
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
            <div className="flex w-full gap-12 mt-6">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem className="min-w-[150px]">
                    <FormLabel className="text-lg">Servings</FormLabel>
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
              <div className="w-full">
                <FormItem>
                  <FormLabel className="text-lg">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description..."
                      {...form.register('description')}
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
            <hr className="text-neutral-500 w-full my-6" />
            <div className="flex gap-16 w-full">
              <div className="flex flex-col basis-2/5">
                <Label className="mb-2 text-lg">Prep</Label>
                <div className="flex gap-2 sm:gap-8 w-full">
                  <FormField
                    control={form.control}
                    name="prepHours"
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel>Hours</FormLabel>
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
                      <FormItem className="w-24">
                        <FormLabel>Minutes</FormLabel>
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
              </div>
              <div className="flex flex-col basis-3/5">
                <Label className="mb-2 text-lg">Cook</Label>
                <div className="flex gap-2 sm:gap-8 w-full">
                  <FormField
                    control={form.control}
                    name="cookHours"
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel>Hours</FormLabel>
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
                      <FormItem className="w-24">
                        <FormLabel>Minutes</FormLabel>
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
              </div>
            </div>
            <hr className="text-neutral-500 w-full my-6" />
            <div className="flex flex-row items-baseline gap-16 w-full">
              <div className="flex flex-col flex-1 w-full basis-2/5">
                <Label className="mb-2 text-lg">Ingredients</Label>
                <div className="flex flex-col items-center justify-center gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Input
                      key={index}
                      id={`input-${index}`}
                      value={ingredient.input}
                      placeholder={
                        index === 0
                          ? 'First ingredient...'
                          : 'Add an ingredient...'
                      }
                      onChange={(e) =>
                        handleIngredientChange(e.target.value, index)
                      }
                      onBlur={(e) =>
                        handleIngredientBlur(e.target.value, index)
                      }
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col flex-1 w-full basis-3/5">
                <Label className="mb-2 text-lg">Instructions</Label>
                <div className="flex flex-col items-center justify-center gap-2">
                  {instructions.map((instruction, index) => (
                    <Textarea
                      key={index}
                      id={`input-${index}`}
                      value={instruction}
                      placeholder={
                        index === 0 ? 'First step...' : 'Next step...'
                      }
                      onChange={(e) =>
                        handleInstructionChange(e.target.value, index)
                      }
                      onBlur={(e) =>
                        handleInstructionBlur(e.target.value, index)
                      }
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            <hr className="text-neutral-500 w-full my-6" />
            <div className="w-full">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-lg">Public</FormLabel>
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
            <hr className="text-neutral-500 w-full my-6" />
            <div className="flex items-center justify-center w-full">
              <FormItem className="flex-1">
                <FormLabel className="text-lg">Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a note..."
                    {...form.register('notes')}
                  />
                </FormControl>
              </FormItem>
            </div>
            <div className="flex items-center justify-end w-full mt-12">
              <Button
                type="submit"
                className="w-fit dark:bg-amber-500 dark:text-white font-bold"
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : null}
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

export default AddRecipeForm;
