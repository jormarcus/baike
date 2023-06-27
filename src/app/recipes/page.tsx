import { getRecipesByUserId } from '../_actions/recipe-actions';
import { getCurrentUser } from '../_actions/user-actions';
import EmptyState from '../../components/ui/EmptyState';

interface RecipesPageProps {}

const RecipesPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const recipes = await getRecipesByUserId(currentUser.id, 1, 10);
  return (
    <div className="mt-16 flex flex-col lg:pl-64">
      <h1>Recipes Page</h1>
    </div>
  );
};

export default RecipesPage;
