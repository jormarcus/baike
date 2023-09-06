import { getRecipesWithCount } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import RecipesList from '@/components/recipes/RecipesList';
import Searchbox from '@/components/ui/Searchbox';

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
    <div className="flex flex-col justify-center">
      <RecipePageHeader />
      <div className="pt-8">
        <Searchbox />
      </div>
      <RecipesList initialRecipes={recipes} totalCount={totalCount} />
    </div>
  );
};

export default RecipesPage;
