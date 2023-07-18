import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/EmptyState';
import { SafeRecipe } from '@/types';
import EditRecipeForm from '@/components/recipes/EditRecipeForm';

interface EditRecipePageProps {
  params: {
    recipeId: string;
  };
}

export default async function EditRecipePage({
  params: { recipeId },
}: EditRecipePageProps) {
  const recipe: SafeRecipe | null = await getRecipeById(Number(recipeId));

  if (!recipe) {
    return <EmptyState title="Recipe not found" />;
  }

  console.log(recipe);
  return (
    <div>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}
