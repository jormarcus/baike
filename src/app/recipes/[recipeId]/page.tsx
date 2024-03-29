import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/empty-state';
import { SafeRecipe } from '@/types';
import AverageRating from '@/components/recipes/average-rating';
import Rating from '@/components/recipes/rating';
import CollectionsRow from '@/components/recipes/collections-row';
import RecipeImage from '@/components/recipes/recipe-image';
import RecipeActionButtonRow from '@/components/recipes/recipe-action-button-row';
import RecipeCookTime from '@/components/recipes/recipe-cook-time';
import ServingsModifier from '@/components/recipes/servings-modifier';
import IngredientsList from '@/components/recipes/ingredients-list';
import { Label } from '@/components/ui/label';

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
    <div className="mx-auto flex max-w-4xl flex-col items-center sm:items-start space-y-4 py-16 px-4 sm:px-0">
      <RecipeActionButtonRow recipe={recipe} />

      <div className="flex flex-col gap-8 sm:gap-16">
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-16">
          <div className="flex flex-col gap-4 basis-1/3 items-center">
            <h1 className="sm:hidden font-serif font-extrabold tracking-tight text-3xl lg:text-4xl whitespace-nowrap">
              {recipe.name}
            </h1>
            <div className="px-16 sm:p-0">
              <RecipeImage image={recipe.imageSrc} alt={recipe.name} />
            </div>
            <div className="flex justify-center">
              <Rating
                userRating={
                  recipe.ratings && recipe.ratings.length > 0
                    ? recipe.ratings[0]
                    : null
                }
                recipeId={Number(recipeId)}
              />
            </div>
            <div className="flex justify-center">
              <ServingsModifier servings={recipe.servings} />
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center sm:items-start basis-2/3">
            <h1 className="hidden sm:block font-serif font-extrabold tracking-tight text-3xl lg:text-4xl">
              {recipe.name}
            </h1>
            <AverageRating averageRating={recipe?.averageRating || 0} />
            <CollectionsRow collections={recipe.collections} />
            {recipe.description ? (
              <p className="leading-7 font-light tracking-wide text-center sm:text-justify">
                {recipe.description}
              </p>
            ) : null}
            <div className="flex flex-col items-center md:self-start gap-2 pt-2">
              <RecipeCookTime
                label="Prep"
                hours={recipe.prepHours}
                minutes={recipe.prepMinutes}
              />
              <RecipeCookTime
                label="Cook"
                hours={recipe.cookHours}
                minutes={recipe.cookMinutes}
              />
            </div>
          </div>
        </div>
        <hr className="block sm:hidden border-neutral-500 border-1" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <IngredientsList ingredients={recipe.ingredients} />
          <hr className="block sm:hidden border-neutral-500 border-1" />
          <div className="basis-2/3 flex flex-col items-center sm:items-start">
            <Label className="text-xl font-semibold tracking-tight">
              Instructions
            </Label>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="my-4">
                <h4 className="text-lg font-semibold tracking-tight mt-0 flex flex-1 shrink items-center justify-between mb-1">
                  Step {index + 1}
                </h4>
                <div>{instruction}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
