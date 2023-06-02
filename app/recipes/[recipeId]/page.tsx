import { getRecipeById } from '@/app/actions/recipe-actions';
import EmptyState from '@/app/components/ui/EmptyState';
import { SafeRecipe } from '@/app/types';

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

export default async function RecipePage({
  params: { recipeId },
}: RecipePageProps) {
  const recipe: SafeRecipe | null = await getRecipeById(recipeId);
  console.log(recipe);

  if (!recipe) {
    return <EmptyState title="Recipe not found" />;
  }

  return (
    <div>
      <h1>Recipe Page</h1>
      <div>{recipe.title}</div>
    </div>
  );
}
