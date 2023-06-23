import { getRecipesByUserId } from '../actions/recipe-actions';
import { getCurrentUser } from '../actions/user-actions';
import EmptyState from '../components/ui/EmptyState';

interface RecipesPageProps {}

const RecipesPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const recipes = await getRecipesByUserId(currentUser.id, 1, 10);
  console.log('recipes: ', recipes);
  return (
    <div className="mt-16 flex flex-col lg:pl-64">
      <h1>Recipes Page</h1>
    </div>
  );
};

export default RecipesPage;
