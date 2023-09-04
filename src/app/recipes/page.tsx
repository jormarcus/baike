import { getRecipesByUserId, searchRecipes } from '../_actions/recipe-actions';
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

  const recipes = await searchRecipes(searchParams.search);

  return (
    <div className="mt-16 flex flex-col justify-center px-12">
      <RecipePageHeader />
      <div className="pt-8">
        <Searchbox />
      </div>
      <RecipesList initialRecipes={recipes} />
    </div>
  );
};

export default RecipesPage;
