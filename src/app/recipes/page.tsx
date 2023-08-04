import { getRecipesByUserId } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import RecipesList from '@/components/recipes/RecipesList';

interface RecipesPageProps {}

const RecipesPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const recipes = await getRecipesByUserId(currentUser.id, 1, 10);

  return (
    <div className="mt-16 flex flex-col justify-center px-12">
      <RecipePageHeader />
      <RecipesList serverRecipes={recipes} />
    </div>
  );
};

export default RecipesPage;
