import { getRecipesWithCount } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/empty-state';
import RecipesList from '@/components/recipes/recipes-list';
import RecipeCompare from '@/components/recipes/recipe-compare';

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
