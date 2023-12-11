import { getRecipeById } from '@/app/_actions/recipe-actions';
import EmptyState from '@/components/ui/empty-state';
import { SafeRecipe } from '@/types';
import AddRecipeForm from '@/components/recipes/add-recipe-form';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/_actions/user-actions';

interface AddRecipePageProps {
  params: {
    recipeId: string;
  };
}

export default async function AddRecipePage({
  params: { recipeId },
}: AddRecipePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <div>
      <AddRecipeForm />
    </div>
  );
}
