'use client';

import { SafeRecipe } from '@/types';
import Searchbox from '../ui/Searchbox';
import RecipeCard from './RecipeCard';
import EmptyState from '../ui/EmptyState';
import { useEffect, useState } from 'react';
import { searchRecipes } from '@/app/_actions/recipe-actions';

interface RecipesListProps {
  serverRecipes: SafeRecipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ serverRecipes }) => {
  const [recipes, setRecipes] = useState<SafeRecipe[]>([]);

  useEffect(() => {
    setRecipes(serverRecipes);
  }, [serverRecipes]);

  const handleSearch = async (query: string) => {
    const recipes = await searchRecipes(query);

    setRecipes(recipes);
  };
  return (
    <div>
      {recipes && recipes.length > 0 ? (
        <div className="pt-8">
          <Searchbox handleSearch={handleSearch} />
          <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-auto-rows-auto">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
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
