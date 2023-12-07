import { getRecipesWithCount } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';
import RecipesList from '@/components/recipes/RecipesList';
import RecipeCompare from '@/components/recipes/RecipeCompare';

interface RecipesPageProps {
  searchParams: {
    search: string;
  };
}

const RecipesPage = async ({ searchParams }: RecipesPageProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const { recipes, totalCount } = await getRecipesWithCount(
    searchParams.search
  );

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <RecipesList initialRecipes={recipes} totalCount={totalCount} />
      <RecipeCompare />
    </div>
  );
};

export default RecipesPage;
