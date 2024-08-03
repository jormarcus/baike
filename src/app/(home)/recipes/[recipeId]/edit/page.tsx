import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/empty-state';
import { SafeRecipe } from '@/types';
import EditRecipeForm from '@/components/recipes/edit-recipe-form';

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

  return (
    <div>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}
