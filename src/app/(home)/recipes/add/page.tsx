import EmptyState from '@/components/ui/empty-state';
import AddRecipeForm from '@/components/recipes/add-recipe-form';
import { getCurrentUser } from '@/app/_actions/user-actions';

export default async function AddRecipePage() {
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
