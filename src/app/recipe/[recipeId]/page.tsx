import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/EmptyState';
import { SafeRecipe } from '@/types';
import AverageRating from '@/components/recipes/AverageRating';
import Rating from '@/components/recipes/Rating';
import CollectionsRow from '@/components/recipes/CollectionsRow';
import RecipeImage from '@/components/recipes/RecipeImage';
import RecipeActionButtonRow from '@/components/recipes/RecipeActionButtonRow';
import RecipeCookTime from '@/components/recipes/RecipeCookTime';
import ServingsModifier from '@/components/recipes/ServingsModifier';
import IngredientsList from '@/components/recipes/IngredientsList';
import { Label } from '@/components/ui/Label';

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
      <RecipeActionButtonRow recipe={recipe} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-8">
        <RecipeImage
          image={recipe.imageSrc}
          alt={recipe.name}
          width={400}
          height={400}
        />
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="font-serif font-extrabold tracking-tight text-3xl lg:text-4xl">
            {recipe.name}
          </h1>
          <AverageRating averageRating={recipe?.averageRating || 0} />
          <CollectionsRow collections={recipe.collections} />
          {recipe.description && (
            <p className="leading-7 font-light tracking-wide">
              {recipe.description}
            </p>
          )}
          <div className="flex min-[700px]:gap-6 flex-wrap">
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
        <div className="col-span-2 w-1/2 flex flex-wrap gap-4 items-center justify-center">
          <Rating
            userRating={
              recipe.ratings && recipe.ratings.length > 0
                ? recipe.ratings[0]
                : null
            }
            recipeId={Number(recipeId)}
          />
          <ServingsModifier servings={recipe.servings} />
        </div>
        <div className="sm:col-span-1 col-span-2">
          <IngredientsList ingredients={recipe.ingredients} />
        </div>
        <div className="sm:col-span-1 col-span-2">
          <Label className="text-xl mb-2">Instructions</Label>
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
