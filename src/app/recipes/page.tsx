import { getRecipesByUserId } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeSearch from '@/components/recipes/RecipeSearch';

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
      <RecipeSearch />
      <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
