import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/EmptyState';
import { SafeRecipe } from '@/types';

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
