import Image from 'next/image';
import Link from 'next/link';
import { Edit, Share, Trash } from 'lucide-react';

import { getRecipeById } from '@/app/_actions/recipe-actions';
import { Button } from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { SafeRecipe } from '@/types';
import AddToCollectionModal from '@/components/modals/AddToCollectionModal';
import AverageRating from '@/components/recipes/AverageRating';
import Rating from '@/components/recipes/Rating';
import CollectionsRow from '@/components/recipes/CollectionsRow';

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

export default async function RecipePage({
  params: { recipeId },
}: RecipePageProps) {
  const recipe: SafeRecipe | null = await getRecipeById(Number(recipeId));

  if (!recipe) {
    return <EmptyState title="Recipe not found" />;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col space-y-8 mt-16 px-12">
      <div className="flex justify-between gap-2 sm:gap-4">
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
          <Link
            href={`/recipe/${recipeId}/edit`}
            className="flex flex-nowrap items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <AddToCollectionModal recipeId={recipe.id} name={recipe.name} />
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
          Share
        </Button>
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
          Favorite
        </Button>
        <Button className="dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900">
          Delete
        </Button>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={recipe?.imageSrc || '/images/placeholder'}
            alt={recipe.name}
            width={400}
            height={400}
            fetchPriority="high"
            priority
            decoding="async"
            className="rounded-md h-full"
          />
          <Rating
            userRating={
              recipe.ratings && recipe.ratings.length > 0
                ? recipe.ratings[0]
                : null
            }
            recipeId={Number(recipeId)}
          />
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <h1 className="font-serif font-extrabold tracking-tight text-3xl lg:text-4xl">
            {recipe.name}
          </h1>
          <AverageRating averageRating={recipe?.averageRating || 0} />
          <CollectionsRow collections={recipe.collections} />
          <p className="leading-7 font-light tracking-wide">
            {recipe.description}
          </p>
          <div className="flex items-center justify-start gap-6">
            <span>Prep Time: {recipe.prepMinutes}</span>
            <span>Cook Time: {recipe.cookMinutes}</span>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium leading-none inline-block whitespace-nowrap">
        Servings Modifier
      </div>
      <div className="grid grid-cols-1 gap-3 print:grid-cols-5 sm:grid-cols-5 sm:gap-10">
        <div className="col-span-1 print:col-span-2 sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xl font-semibold tracking-tight mt-0 flex flex-1 shrink items-center justify-between text-ellipsis">
              Ingredients
            </h4>
          </div>
          <div>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <div>{ingredient}</div>
                {/* <div>{ingredient.quantity}</div>
              <div>{ingredient.unit}</div>
              <div>{ingredient.name}</div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 print:col-span-2 sm:col-span-2">
          {recipe.instructions.map((instruction, index) => (
            <div key={index}>
              <h4 className="text-xl font-semibold tracking-tight mt-0 flex flex-1 shrink items-center justify-between">
                Step {index + 1}
              </h4>
              <div>{instruction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
