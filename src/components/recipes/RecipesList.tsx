import { SafeRecipe } from '@/types';
import RecipeCard from './RecipeCard';
import EmptyState from '../ui/EmptyState';

interface RecipesListProps {
  recipes: SafeRecipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div>
      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="mt-32">
          <EmptyState
            title="No recipes available"
            subtitle="Add or import a recipe"
          />
        </div>
      )}
    </div>
  );
};

export default RecipesList;
