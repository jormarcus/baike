import { getRecipesWithCount } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';
import RecipesList from '@/components/recipes/RecipesList';

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
    <>
      <RecipesList initialRecipes={recipes} totalCount={totalCount} />
    </>
  );
};

export default RecipesPage;
